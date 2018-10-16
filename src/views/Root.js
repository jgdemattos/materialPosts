import React, { Component } from "react";
import CategoriesList from "../components/CategoriesList";
import Grid from "@material-ui/core/Grid";

class Root extends Component {
  render() {
    return (
      <div className="root">
        <Grid container justify={"center"} spacing={0}>
          <Grid container spacing={0} direction={"row"} justify={"center"}>
            <CategoriesList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Root;
