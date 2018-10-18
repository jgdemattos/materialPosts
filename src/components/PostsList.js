import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostP from "./PostP";

class PostsList extends Component {
  render() {
    const { postIds } = this.props;
    return (
      <div className="postsList">
        <Grid container spacing={40} direction={"column"} justify={"center"}>
          {postIds.map(id => (
            <Grid item key={id}>
              <PostP id={id} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    postIds: Object.keys(posts).map(p => posts[p].id)
  };
}

export default connect(mapStateToProps)(PostsList);
