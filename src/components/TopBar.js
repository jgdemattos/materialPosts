import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LoadingBar from "react-redux-loading";
import { Link } from "react-router-dom";
const styles = {
  topBar: {
    flexGrow: 1,
    margin: 0,
    top: 0,
    width: "100%",
    position: "fixed",
    zIndex: 999
  },
  cardHeaderLink: {
    textDecoration: "none",
    color: "white"
  },
  appBar: {
    backgroundColor: "#313131"
  }
};

function TopBar(props) {
  const { classes } = props;

  return (
    <div className={classes.topBar}>
      <LoadingBar />
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link className={classes.cardHeaderLink} to={`/`}>
            <Typography component="h2" variant="h3" color="inherit">
              Material posts
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(TopBar);
