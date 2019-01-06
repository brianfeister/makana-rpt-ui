import gql from 'graphql-tag';

export default gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
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
