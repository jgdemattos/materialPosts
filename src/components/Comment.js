import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Score from "./Score";
import Paper from "@material-ui/core/Paper";
const styles = {
  commentBody: {
    margin: 0,
    border: "solid 1px #CCC",
    paddingTop: "20px",
    borderRadius: "4px",
    minWidth: "270px",
    fontSize: 14,
    paddingBottom: "50px"
  },
  authorName: {
    backgroundColor: "white",
    marginTop: "-15px",
    marginLeft: "10px",
    width: "fit-content",
    fontSize: 16,
    color: "#7a7b7c"
  },
  score: {
    width: "fit-content",
    float: "right",
    marginRight: "-1px"
  },
  comment: {
    marginTop: "15px",
    marginLeft: "10px"
  }
};
class Comment extends Component {
  render() {
    const { comment, classes } = this.props;
    return (
      <div className="comment">
        <Paper className={classes.commentBody} elevation={1}>
          <Typography className={classes.authorName}>
            {comment.author}
          </Typography>
          <div className={classes.comment}>{comment.body}</div>
          <div className={classes.score}>
            <Score contentType="comments" id={comment.id} />
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ comments }, { id }) {
  let comment = comments[id];

  return {
    comment
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Comment));
