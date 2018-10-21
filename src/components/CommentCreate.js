import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
const styles = theme => ({
  textField: {
    marginTop: "30px",
    width: "320px"
  },
  sendButton: {
    marginTop: "-30px",
    width: "fit-content",
    backgroundColor: "white",
    border: "solid 1px #EEE",
    borderRadius: "4px",
    align: "right"
  }
});

class CommentCreate extends Component {
  render() {
    const { postId, classes } = this.props;
    return (
      <div className="post">
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
        />
        <div className={classes.sendButton}>
          <IconButton
            value="downVote"
            aria-label="Dislike"
            onClick={this.handleLike}
          >
            <ThumbDownAlt />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommentCreate);
