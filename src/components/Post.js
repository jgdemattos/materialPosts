import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class Post extends Component {
  render() {
    const { post } = this.props;
    return <div className="post">{post.id}</div>;
  }
}

function mapStateToProps({ posts }, { id }) {
  const key = Object.keys(posts).filter(p => posts[p].id == id);
  let post = posts[key];
  return {
    post
  };
}

export default connect(mapStateToProps)(Post);
