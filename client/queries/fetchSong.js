import gql from "graphql-tag";
export default gql`
  query fetchSong($id: ID!) {
    song(id: $id) {
      title
      id
      lyrics {
        content
        id
        likes
      }
    }
  }
`;
