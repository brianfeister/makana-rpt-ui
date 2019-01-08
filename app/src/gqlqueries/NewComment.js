import gql from 'graphql-tag';

export default gql`
mutation createComment($message: String!, $isPublic: Boolean!){
  createComment(message: $message, isPublic: $isPublic){
    id
    message
    createdAt
    isPublic
    children {
      id
      author {
        id
      }
      message
      createdAt
    }
    parent {
      id
      message
      createdAt
    }
    author {
      id
    }
  }
}
`;
