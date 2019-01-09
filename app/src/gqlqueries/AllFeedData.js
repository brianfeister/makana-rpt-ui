import gql from 'graphql-tag';

export default gql`
  query feed {
    feed {
      id
      isPublic
      message
      createdAt
      author { id }
    }
  }
`;
