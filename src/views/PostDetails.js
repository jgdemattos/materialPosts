import React from "react";
import Grid from "@material-ui/core/Grid";
import PostP from "../components/PostP";
import PropTypes from "prop-types";

function PostDetails(props) {
  const id = props.match.params.postId;
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

PostDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string.isRequired
    })
  })
};

export default PostDetails;
