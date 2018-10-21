import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Score from "./Score";

const styles = {
  commentBody: {
    margin: 0,
    border: "solid 1px #CCC",
    padding: "20px",
    borderRadius: "4px",
    minWidth: "270px",
    fontSize: 14
  },
  authorName: {
    backgroundColor: "white",
    marginTop: "-31px",
    width: "fit-content"
  },
  score: {
    marginBottom: "-43px",
    marginLeft: "165px",
    backgroundColor: "white",
    border: "solid 1px #EEE",
    borderRadius: "4px"
  },
  comment: {
    marginTop: "15px"
  }
};
class Comment extends Component {
  render() {
    const { comment, classes } = this.props;
    return (
      <div className="comment">
        <div className={classes.commentBody}>
          <Typography className={classes.authorName}>
            {comment.author}
          </Typography>
          <div className={classes.comment}>{comment.body}</div>
          <div className={classes.score}>
            <Score contentType="comments" id={comment.id} />
          </div>
        </div>
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
