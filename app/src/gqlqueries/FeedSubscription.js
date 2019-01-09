import gql from 'graphql-tag';

export default gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
        author {
          id
          email
          name
        }
        isPublic
        createdAt
        message
        updatedAt
        parent {
          id
        }
      }
      previousValues {
        id
        message
      }
    }
  }
`;
