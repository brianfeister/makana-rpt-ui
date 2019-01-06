import gql from 'graphql-tag';

export default gql`
  mutation setAuth($isAuthenticated: Bool!){
    setAuth (isAuthenticated: $isAuthenticated) @client {
      auth {
        isAuthenticated
      }
    }
  }
`;
