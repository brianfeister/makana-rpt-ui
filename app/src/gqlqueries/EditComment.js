import gql from 'graphql-tag';

export default gql`
mutation editComment($id: ID!, $message: String!, $isPublic: Boolean!){
  editComment (id: $id, message: $message, isPublic: $isPublic) {
    id
    message
    isPublic
  }
}
`;
