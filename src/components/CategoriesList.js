import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class CategoriesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="categoriesList">
        <Grid container spacing={40} direction={"row"} justify={"center"}>
          {categories.map(category => (
            <Grid item key={category.name}>
              <Button key={category.name} variant="outlined" color="primary">
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(category => categories[category])
  };
}

export default connect(mapStateToProps)(CategoriesList);
