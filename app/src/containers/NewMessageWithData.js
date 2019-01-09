import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import Compose from '../components/Compose';
import NewCommentQuery from '../gqlqueries/NewComment';

const NewMessageMutation = props => {
  const {
    author,
    noReplyToggle,

    newCommentAction,
  } = props;

  const handleSubmit = data => {
    if(data['variables']) {
      return newCommentAction({
        variables: data.variables
      })
      .then(res => {
        console.log('Comment edit res', res);
      })
      .catch( e => {
        console.log('ERR!', e);
      });
    }
  };

  return (
    <Mutation mutation={NewCommentQuery}>
      {() => (
        <Compose
          onCommentSave={handleSubmit}
          author={author}
          noReplyToggle={noReplyToggle}
          rows={3}
          label={'Post a Comment'}
          postNewComment={true}
        />
      )}
    </Mutation>
  );
};

export default compose(
  graphql(NewCommentQuery, { name: 'newCommentAction' }),
)(NewMessageMutation);
