import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  commentBody: {
    margin: 0,
    border: "solid 1px #CCC",
    padding: "20px",
    borderRadius: "50px"
  }
};
class Comment extends Component {
  render() {
    const { comment, classes } = this.props;
    return (
      <div className="comment">
        <div className={classes.commentBody}>{comment.body}</div>
      </div>
    );
  }
}

function mapStateToProps({ comments }, { id }) {
  const key = Object.keys(comments).filter(c => comments[c].id == id);
  let comment = comments[key];

  return {
    comment
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Comment));
