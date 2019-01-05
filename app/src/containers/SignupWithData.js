import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Signup from '../components/Signup';
import { compose } from 'react-apollo';

const SIGN_UP = gql`
    mutation signup($name: String!, $email: String!, $password: String!){
      signup(name: $name email: $email password: $password) {
        user {
          id
          name
          email
        }
      }
    }
`;

const LOGIN = gql`
    mutation login($email: String!, $password: String!){
      login(email: $email, password: $password){
        token
        user {
          id
          name
          email
        }

      }
      setAuth (isAuthenticated: true) @client {
        authStatus {
          isAuthenticated
        }
      }

    }
`;

const SignupMutation = (props) => {
  const { signupAction, loginAction } = props;
  const handleSubmit = (data) => {
    if(data['variables']) {
      return signupAction({
        variables: data.variables
      })
      .then(res => (res.data))
      .then(data => (data.signup))
      .then(auth => {
        loginAction({
          variables: data.variables
        })
        .then(res => (res.data))
        .then(data => (data.login))
        .then(auth => {
          sessionStorage.setItem('userToken', auth.token);
        })
        .catch((e)=>{
          return {error: 'invalid user credentials'};
        });
        props.onSubmit(true);
        return auth.user;
      })
      .catch( error => {
        console.log('TODO: handle graphql errors')
      });
    }
  };

  return (
    <Mutation mutation={SIGN_UP}>
      {() => (
        <Signup {...props} onSubmit={handleSubmit} />
      )}
    </Mutation>
  );
};


export default compose(
  graphql(SIGN_UP, { name: 'signupAction' }),
  graphql(LOGIN, { name: 'loginAction' })
)(SignupMutation);
