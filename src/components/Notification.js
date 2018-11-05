import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({
  notificationPaper: {
    backgroundColor: "#313131",
    color: "#FFF",
    paddingLeft: "20px",

    marginTop: "10px"
  },
  message: {
    color: "#FFF",
    marginTop: "4px"
  },
  removeBtutton: {
    color: "#FFF"
  }
});

class Notification extends React.Component {
  timeOut;
  remove = e => {
    e.preventDefault();

    const { handleDismiss, id } = this.props;

    return handleDismiss(id);
  };
  componentDidMount() {
    const { handleDismiss, id } = this.props;
    this.timeOut = setTimeout(() => handleDismiss(id), 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  render() {
    const {
      classes,
      message,
      type,
      canDismiss,
      acceptBtn,
      denyBtn,
      icon,
      customStyles,
      id,
      isFirst,
      handleDismiss,
      handleDismissAll
    } = this.props;
    return (
      <div className="notification">
        <Paper className={classes.notificationPaper}>
          <Grid container spacing={8} direction={"row"} justify={"center"}>
            <Grid item>
              {" "}
              <Typography
                className={classes.message}
                variant="overline"
                gutterBottom
              >
                {message}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                className={classes.button}
                onClick={this.remove}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(Notification));
