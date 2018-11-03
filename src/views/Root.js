import React, { Component } from "react";
import PostsList from "../components/PostsList";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CategoryDisplay from "../components/CategoryDisplay";

const styles = {
  categoriesList: {
    marginTop: 50
  },
  postsList: {
    marginTop: 10
  }
};

class Root extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="root">
        <Grid container justify={"center"} spacing={0}>
          <CategoryDisplay className={classes.categories} />
          {/*          <Grid container spacing={0} direction={"row"} justify={"center"}>
            <div className={classes.categoriesList}>
              <CategoriesList />
            </div>
          </Grid> */}
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
