import React, { Component } from "react";
import { connect } from "react-redux";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
class Score extends Component {
  render() {
    const { scoreHolder } = this.props;
    return (
      <div className="score">
        <IconButton aria-label="Like">
          <ThumbUpAlt />
        </IconButton>
        {scoreHolder.voteScore}
        <IconButton aria-label="Dislike">
          <ThumbDownAlt />
        </IconButton>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { id, type }) {
  const key =
    type == "post"
      ? Object.keys(posts).filter(p => posts[p].id == id)
      : Object.keys(comments).filter(c => comments[c].id == id);

  let scoreHolder = type == "post" ? posts[key] : comments[key];
  return {
    scoreHolder
  };
}

export default connect(mapStateToProps)(Score);
