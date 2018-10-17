import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="postsList">
        <Grid container spacing={40} direction={"column"} justify={"center"}>
          {posts.map(post => (
            <Grid item key={post.id}>
              {post.body}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: Object.keys(posts).map(post => posts[post])
  };
}

export default connect(mapStateToProps)(PostsList);
