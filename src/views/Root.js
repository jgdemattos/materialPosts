import React, { Component } from "react";
import CategoriesList from "../components/CategoriesList";
import PostsList from "../components/PostsList";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  categoriesList: {
    marginTop: 50
  },
  postsList: {
    marginTop: 50
  }
};

class Root extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="root">
        <Grid container justify={"center"} spacing={0}>
          <Grid container spacing={0} direction={"row"} justify={"center"}>
            <div className={classes.categoriesList}>
              <CategoriesList />
            </div>
          </Grid>
          <Grid container spacing={0} direction={"row"} justify={"center"}>
            <div className={classes.postsList}>
              <PostsList />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Root);
