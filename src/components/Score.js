import React, { Component } from "react";
import { connect } from "react-redux";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
import { handleVote } from "../actions/vote";
import PropTypes from "prop-types";

class Score extends Component {
  handleVoteUI = e => {
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
        <IconButton
          value="upVote"
          aria-label="Like"
          onClick={this.handleVoteUI}
        >
          <ThumbUpAlt />
        </IconButton>
        {scoreHolder.voteScore}
        <IconButton
          value="downVote"
          aria-label="Dislike"
          onClick={this.handleVoteUI}
        >
          <ThumbDownAlt />
        </IconButton>
      </div>
    );
  }
}

Score.propTypes = {
  id: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  scoreHolder: PropTypes.object.isRequired
};

function mapStateToProps({ posts, comments }, { id, contentType }) {
  let scoreHolder = contentType === "posts" ? posts[id] : comments[id];

  return {
    scoreHolder
  };
}

export default connect(mapStateToProps)(Score);
