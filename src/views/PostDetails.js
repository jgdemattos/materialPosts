import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PostP from "../components/PostP";
class PostDetails extends Component {
  render() {
    const id = this.props.match.params.postId;
    return (
      <div className="postDetails">
        <Grid
          style={{
            margin: 0,
            width: "100%",
            marginTop: "100px"
          }}
          container
          spacing={40}
          direction={"row"}
          justify={"center"}
        >
          <Grid item key={id}>
            <PostP id={id} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PostDetails;
