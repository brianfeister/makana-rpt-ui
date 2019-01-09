import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'react-apollo';

import Comment from '../components/Comment';
import NewCommentQuery from '../gqlqueries/NewComment';
import EditCommentQuery from '../gqlqueries/EditComment';
import DeleteCommentQuery from '../gqlqueries/DeleteComment';

const CommentMutation = props => {
  const {
    id,

    newCommentAction,
    editCommentAction,
    deleteCommentAction,
  } = props;

  const handleEdit = data => {
    if(data['variables']) {
      return editCommentAction({
        variables: data.variables
      })
      .then(res => {
        console.log('Comment edit response!', res)
      })
      .catch( e => {
        console.log('ERROR!', e)
      });
    }
  };

  const handleSave = data => {
    if(data['variables']) {
      return newCommentAction({
        variables: data.variables
      })
      .then(res => {
        console.log('Comment edit response!', res)
      })
      .catch( e => {
        console.log('ERROR!', e)
      });
    }
  };

  const handleDeleteClick = () => {
    return deleteCommentAction({
      id: id
    })
    .then(res => {
      console.log('res from delete!', res)
    })
    .catch(e => {
      console.log('ERROR!', e)
    })
  };

  return (
    <Comment
      {...props}
      onDeleteClick={handleDeleteClick}
      onCommentSave={handleSave}
      onCommentEdit={handleEdit}
    />
  );
};

export default compose(
  graphql(NewCommentQuery, { name: 'newCommentAction' }),
  graphql(EditCommentQuery, { name: 'editCommentAction' }),
  graphql(DeleteCommentQuery, { name: 'deleteCommentAction' }),
)(CommentMutation);
