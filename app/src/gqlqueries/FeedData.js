import gql from 'graphql-tag';

export default gql`
  query feed {
    feed {
      id
      isPublic
      message
      createdAt
      children {
        id
        isPublic
        message
        createdAt
        author {
          id
          email
          name
        }
        parent {
          id
        }
      }
      parent {
        id
      }
      author {
        id
        email
        name
      }
    }
  }
`;
