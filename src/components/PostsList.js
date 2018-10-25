import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PostP from "./PostP";
import PostCreate from "./PostCreate";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
const styles = {
  cardPostCreate: {
    padding: 20
  },
  sendButton: {
    marginTop: "40px"
  },
  textField: {
    width: "270px"
  }
};
class PostsList extends Component {
  render() {
    const { postIds, classes } = this.props;
    return (
      <div className="postsList">
        <Grid
          style={{
            margin: 0,
            width: "100%"
          }}
          container
          spacing={40}
          direction={"column"}
          justify={"center"}
        >
          <Grid item>
            <Card elevation={5} className={classes.cardPostCreate}>
              <Typography component="p">{"What's on your mind?"}</Typography>
              <PostCreate />
            </Card>
          </Grid>
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

export default connect(mapStateToProps)(withStyles(styles)(PostsList));
