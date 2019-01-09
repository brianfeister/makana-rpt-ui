import gql from 'graphql-tag';

export default gql`
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
