import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { handleCreateComment } from "../actions/comments";
import { connect } from "react-redux";
const styles = theme => ({
  textField: {
    marginTop: "30px",
    width: "270px",
    padding: 0
  },
  sendButton: {
    marginTop: "-59px",
    width: "fit-content",

    marginLeft: "220px",
    padding: 0
  }
});

class CommentCreate extends Component {
  state = {
    value: ""
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { postId, dispatch } = this.props;

    return dispatch(
      handleCreateComment({
        parentId: postId,
        body: this.state.value
      })
    ).then(() => this.setState({ value: "" }));
  };
  render() {
    const { postId, classes } = this.props;
    return (
      <div className="commentCreate">
        <form onSubmit={this.handleSubmit} id={postId}>
          <div className={classes.commentField}>
            <TextField
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              rows="2"
              defaultValue=""
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

export default connect()(withStyles(styles)(CommentCreate));
