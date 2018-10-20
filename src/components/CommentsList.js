import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Comment from "./Comment";

class CommentsList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="commentsList">
        <Grid container spacing={40} direction={"row"} justify={"center"}>
          {comments.map(comment => (
            <Grid item key={comment.id}>
              <Comment id={comment.id} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ comments }, { postId }) {
  return {
    comments: Object.values(comments).filter(
      comment => comment.parentId === postId
    )
  };
}

export default connect(mapStateToProps)(CommentsList);
