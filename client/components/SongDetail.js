import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";
class SongDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props.data;
    if (this.props.data.loading) return <div>Loading...</div>;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate lyricID={this.props.params.id} />
        <LyricList lyrics={song.lyrics} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
