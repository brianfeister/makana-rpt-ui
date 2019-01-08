import gql from 'graphql-tag';

export default gql`
  mutation setAuth($isAuthenticated: Boolean!, $user: Object!){
    setAuth (isAuthenticated: $isAuthenticated, user: $user) @client {
      auth {
        isAuthenticated
        user
      }
    }
  }
`;
