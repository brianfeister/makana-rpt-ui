import gql from 'graphql-tag';

export default gql`
mutation createComment($message: String!, $isPublic: Boolean!, $parentCommentId: ID){
    createComment(message: $message, isPublic: $isPublic, parentCommentId: $parentCommentId){
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
