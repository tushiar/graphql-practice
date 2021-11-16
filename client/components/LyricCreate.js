import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import fetchSongs from "../queries/fetchSongs";
class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { content: this.state.content, id: this.props.lyricID },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => this.setState({ content: "" }));
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}
const mutation = gql`
  mutation AddLyric($content: String, $id: ID) {
    addLyricToSong(content: $content, songId: $id) {
      id
      lyrics {
        content
        id
        likes
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);
