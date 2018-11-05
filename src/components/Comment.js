import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Score from "./Score";
import Paper from "@material-ui/core/Paper";
import DeleteForever from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { handleRemoveComment } from "../actions/comments";
import CommentCreate from "./CommentCreate";
import PropTypes from "prop-types";

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
  },
  commentTools: {
    marginTop: "-60px",
    width: "fit-content",
    float: "right",
    marginRight: "-105px",
    padding: 0,
    display: "flex"
  },
  editingLabel: {
    fontSize: "14px",
    color: "#CCC"
  }
};
class Comment extends Component {
  state = {
    editComment: false
  };
  handleRemoveCommentUI = e => {
    e.preventDefault();

    const { dispatch, comment } = this.props;

    return dispatch(
      handleRemoveComment({
        id: comment.id
      })
    );
  };
  toggleEditComment() {
    this.setState(state => ({ editComment: !state.editComment }));
  }
  handleToggleEditComment = e => {
    e.preventDefault();

    this.toggleEditComment();
  };

  render() {
    const { comment, classes, ownComment } = this.props;
    if (ownComment && this.state.editComment) {
      return (
        <div className={classes.editComment}>
          <Typography className={classes.editingLabel} />
          <CommentCreate
            commentBody={comment.body}
            commentId={comment.id}
            toggleEditComment={() => {
              this.toggleEditComment();
            }}
          />
        </div>
      );
    }
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
          {ownComment && (
            <div className={classes.commentTools}>
              <div className={classes.deleteButton}>
                <IconButton
                  aria-label="Delete"
                  fontSize="small"
                  onClick={this.handleRemoveCommentUI}
                >
                  <DeleteForever />
                </IconButton>
              </div>
              <div className={classes.editButton}>
                <IconButton
                  aria-label="Edit"
                  fontSize="small"
                  onClick={this.handleToggleEditComment}
                >
                  <Edit />
                </IconButton>
              </div>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  id: PropTypes.string,
  ownComment: PropTypes.bool
};

function mapStateToProps({ comments, authedUser }, { id }) {
  let comment = comments[id];
  let ownComment = comment.author === authedUser ? true : false;

  return {
    comment,
    ownComment
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Comment));
