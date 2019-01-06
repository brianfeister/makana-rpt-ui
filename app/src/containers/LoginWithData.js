import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import Login from '../components/Login';
import LoginQuery from '../gqlqueries/Login';

// @TODO - due to time constraints unlikely to figure out
// GraphQL custom error classes server side
const addErrorType = err => {
  switch(err.message) {
    case 'Invalid password':
      return ['password', err.message];
    case 'No user with that email address':
      return ['email', err.message];
    default:
      return ['unknown', 'An unknown error has occurred'];
  }
};

const parseResponseError = errors => {
  let allErrors = [];
  for(let error of errors) {
    allErrors.push(addErrorType(error));
  }
  return allErrors;
};

const LoginMutation = props => {
  const { loginAction } = props;
  const handleSubmit = data => {
    if(data['variables']) {
      return loginAction({
        variables: data.variables
      })
      .then(res => {
        sessionStorage.setItem('userToken', res.data.login.token);
        props.history.push('/');
      })
      .catch( e => {
        return { errors: parseResponseError(e.graphQLErrors) };
      });
    }
  };

  return (
    <Mutation
      mutation={LoginQuery}
      onCompleted={() => this.props.history.push('/')}
    >
      {() => (
        <Login {...props} onSubmit={handleSubmit} />
      )}
    </Mutation>
  );
};

export default compose(
  graphql(LoginQuery, { name: 'loginAction' })
)(LoginMutation);
