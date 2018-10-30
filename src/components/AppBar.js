import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LoadingBar from "react-redux-loading";
const styles = {
  root: {
    flexGrow: 1,
    margin: 0,
    top: 0,
    width: "100%",
    position: "fixed",
    zIndex: 999
  }
};

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <LoadingBar />
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">Material posts</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(SimpleAppBar);
