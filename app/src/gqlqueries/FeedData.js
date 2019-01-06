import gql from 'graphql-tag';

export default gql`
  query feed {
    feed {
      id
      message
      createdAt
    }
  }
`;
