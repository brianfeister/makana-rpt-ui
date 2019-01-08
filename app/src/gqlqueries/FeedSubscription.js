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
      }
      previousValues {
        id
        message
      }
    }
  }
`;
