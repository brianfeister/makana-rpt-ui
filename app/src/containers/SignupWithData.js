import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { compose } from 'react-apollo';

import Signup from '../components/Signup';
import SignupQuery from '../gqlqueries/Signup';
import LoginQuery from '../gqlqueries/Login';

// @TODO - due to time constraints unlikely to figure out
// GraphQL custom error classes server side
const addErrorType = err => {
  switch(err.code) {
    case 3010:
      return ['email', 'A user with that email address already exists']
    default:
  }
  switch(err.message) {
    case 'A user with that email is already registered' :
      return ['email', err.message];
    case 'Password must be at least 8 characters':
      return ['password', err.message];
    case 'Password cannot be empty':
      return ['password', err.message];
    case 'Email address is required':
      return ['email', err.message];
    case 'Not a valid email address':
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

const SignupMutation = props => {
  const { signupAction, loginAction } = props;
  const handleSubmit = data => {
    if(data['variables']) {
      return signupAction({
        variables: data.variables
      })
      .then(res => res.data.signup)
      .then(auth => {
        loginAction({
          variables: data.variables
        })
        .then(res => {
          sessionStorage.setItem('userToken', res.data.login.token);
          props.history.push('/');
        })
        .catch( e => {
          return {error: 'invalid user credentials'};
        });
        props.onSubmit(true);
        return auth.user;
      })
      .catch( e => {
        return { errors: parseResponseError(e.graphQLErrors) };
      });
    }
  };

  return (
    <Mutation mutation={SignupQuery}>
      {() => (
        <Signup {...props} onSubmit={handleSubmit} />
      )}
    </Mutation>
  );
};

export default compose(
  graphql(SignupQuery, { name: 'signupAction' }),
  graphql(LoginQuery, { name: 'loginAction' })
)(SignupMutation);
