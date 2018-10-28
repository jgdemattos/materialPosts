import React, { Component } from "react";
import PostCreate from "../components/PostCreate";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const styles = {
  cardPostCreate: {
    padding: "20px"
  }
};

class Root extends Component {
  render() {
    const { classes } = this.props;
    const id = this.props.match.params.postId;

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
}

export default withStyles(styles)(Root);
