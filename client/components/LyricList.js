import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
class LyricList extends Component {
  constructor(props) {
    super(props);
  }
  onLikeHandler(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ content, id, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i
            className="material-icons"
            onClick={() => this.onLikeHandler(id, likes)}
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }
  render() {
    console.log(this.props);
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}
const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      content
      id
      likes
    }
  }
`;
export default graphql(mutation)(LyricList);
