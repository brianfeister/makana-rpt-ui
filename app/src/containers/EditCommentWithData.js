import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import EditComment from '../components/EditComment';

import DeleteCommentQuery from '../gqlqueries/DeleteComment';

const EditCommentMutation = props => {
  const {
    deleteCommentAction,
    setEditing,
  } = props;

  const handleSaveClick = () => {
    setEditing(false);
  };

  const handleDeleteClick = () => {
    return deleteCommentAction({
      id: props.id
    })
    .then(res => {
      console.log('res from delete!', res)
    })
    .catch(e => {
      console.log('ERROR!', e)
    })
  };

  return (
    <EditComment
      {...props}
      onDeleteClick={handleDeleteClick}
      onSaveClick={handleSaveClick}
    />
  );
};

export default compose(
  graphql(DeleteCommentQuery, { name: 'deleteCommentAction' }),
)(EditCommentMutation);
