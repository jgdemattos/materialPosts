import React from "react";
import PostsList from "../components/PostsList";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CategoryDisplay from "../components/CategoryDisplay";
import PropTypes from "prop-types";
const styles = {
  categoriesList: {
    marginTop: 50
  },
  postsList: {
    marginTop: 50
  }
};

function Category(props) {
  const category = props.match.params.category;
  const { classes } = props;
  return (
    <div className="category">
      <Grid container justify={"center"} spacing={0}>
        <CategoryDisplay
          className={classes.categories}
          currentCategory={category}
        />
        <Grid container spacing={0} direction={"row"} justify={"center"}>
          <div className={classes.postsList}>
            <PostsList category={category} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired
    })
  })
};

export default withStyles(styles)(Category);
