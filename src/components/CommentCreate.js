import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { handleCreateComment, handleEditComment } from "../actions/comments";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const styles = {
  textField: {
    width: "270px",
    padding: 0
  },
  sendButton: {
    marginTop: "-59px",
    width: "fit-content",

    marginLeft: "220px",
    padding: 0
  }
};

export class CommentCreate extends Component {
  state = {
    value: "",
    submitted: false
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { postId, dispatch, commentId, toggleEditComment } = this.props;

    if (commentId) {
      return dispatch(
        handleEditComment({
          id: commentId,
          body: this.state.value
        })
      ).then(toggleEditComment());
    }

    return dispatch(
      handleCreateComment({
        parentId: postId,
        body: this.state.value
      })
    ).then(() =>
      this.setState({ postBody: "", submitted: !this.state.submitted }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ submitted: false });
        }, 3000);
      })
    );
  };
  render() {
    const { postId, classes, commentBody, commentId } = this.props;
    if (this.state.submitted) {
      return (
        <Grid container direction={"row"} justify={"center"}>
          {"Comment registered"}
        </Grid>
      );
    }
    return (
      <div className="commentCreate">
        <form onSubmit={this.handleSubmit} id={postId}>
          <div className={classes.commentField}>
            <TextField
              id="outlined-multiline-flexible"
              label={commentId ? "Edit comment" : "Create comment"}
              multiline
              rows="2"
              rowsMax="7"
              defaultValue={commentBody}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            />
          </div>
          <div className={classes.sendButton}>
            <IconButton
              aria-label="Send"
              fontSize="small"
              type="submit"
              form={postId}
              value="Submit"
            >
              <Send />
            </IconButton>
          </div>
        </form>
      </div>
    );
  }
}

CommentCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string,
  commentBody: PropTypes.string,
  commentId: PropTypes.string,
  toggleEditComment: PropTypes.func
};

export default connect()(withStyles(styles)(CommentCreate));
