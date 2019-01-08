import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import Compose from '../components/Compose';
import NewCommentQuery from '../gqlqueries/NewComment';
import DeleteCommentQuery from '../gqlqueries/DeleteComment';

const NewMessageMutation = props => {
  const {
    id,
    author,
    editing,

    newCommentAction,
    deleteCommentAction,
    refetch,
  } = props;

  const handleSubmit = data => {
    if(data['variables']) {
      return newCommentAction({
        variables: data.variables
      })
      .then(res => {
        console.log('Comment edit res!!!', res)
        refetch();
      })
      .catch( e => {

      });
    }
  };

  return (
    <Mutation mutation={NewCommentQuery}>
      {() => (
        <Compose
          onCommentSave={handleSubmit}
          author={author}
        />
      )}
    </Mutation>
  );
};

export default compose(
  graphql(NewCommentQuery, { name: 'newCommentAction' }),
)(NewMessageMutation);
