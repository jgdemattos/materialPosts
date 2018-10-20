import React, { Component } from "react";
import { connect } from "react-redux";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
import { handleVote } from "../actions/vote";

class Score extends Component {
  handleLike = e => {
    e.preventDefault();

    const { dispatch, id, contentType } = this.props;

    //type = post or comment

    return dispatch(
      handleVote({
        id: id,
        vote: e.currentTarget.value,
        contentType
      })
    );
  };

  render() {
    const { scoreHolder } = this.props;
    return (
      <div className="score">
        <IconButton value="upVote" aria-label="Like" onClick={this.handleLike}>
          <ThumbUpAlt />
        </IconButton>
        {scoreHolder.voteScore}
        <IconButton
          value="downVote"
          aria-label="Dislike"
          onClick={this.handleLike}
        >
          <ThumbDownAlt />
        </IconButton>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, authedUser }, { id, contentType }) {
  let scoreHolder = contentType === "posts" ? posts[id] : comments[id];

  return {
    scoreHolder,
    authedUser
  };
}

export default connect(mapStateToProps)(Score);
