import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import Comment from '../components/Comment';
import EditCommentQuery from '../gqlqueries/EditComment';
import DeleteCommentQuery from '../gqlqueries/DeleteComment';

const CommentMutation = props => {
  const {
    id,

    editCommentAction,
    deleteCommentAction,
  } = props;

  const handleSubmit = data => {
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
    <Mutation mutation={EditCommentQuery}>
      {() => (
        <Comment
          {...props}
          onDeleteClick={handleDeleteClick}
          onCommentSave={handleSubmit}
        />
      )}
    </Mutation>
  );
};

export default compose(
  graphql(EditCommentQuery, { name: 'editCommentAction' }),
  graphql(DeleteCommentQuery, { name: 'deleteCommentAction' }),
)(CommentMutation);
