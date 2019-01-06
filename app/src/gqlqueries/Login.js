import gql from 'graphql-tag';

export default gql`
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
