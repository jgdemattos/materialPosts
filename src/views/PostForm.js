import React from "react";
import PostCreate from "../components/PostCreate";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";

const styles = {
  cardPostCreate: {
    padding: "20px"
  }
};

function PostForm(props) {
  const { classes } = props;
  const id = props.match.params.postId;

  return (
    <div className="postForm">
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
          <Card elevation={5} className={classes.cardPostCreate}>
            <PostCreate postId={id} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

PostForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string.isRequired
    })
  })
};

export default withStyles(styles)(PostForm);
