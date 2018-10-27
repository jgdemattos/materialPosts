import React, { Component } from "react";
import { connect } from "react-redux";
import { handleRemovePost } from "../actions/posts";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PostCardMenu from "./PostCardMenu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const styles = {
  avatar: {
    backgroundColor: red[500]
  },

  cardHeaderLink: {
    textDecoration: "none"
  }
};
class PostHeader extends Component {
  state = {
    expanded: false,
    anchorEl: null,
    toggleEdit: false
  };
  handleOpenMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  handleRemovePostUI = () => {
    const { post, dispatch } = this.props;

    return dispatch(
      handleRemovePost({
        id: post.id
      })
    );
  };
  render() {
    const { post, handleToggleEdit, authedUser, classes } = this.props;
    return (
      <div className="postHeader">
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.author[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-owns={this.state.anchorEl ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={this.handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post.timestamp + " - by " + post.author}
        />

        <PostCardMenu
          anchorEl={this.state.anchorEl}
          handleCloseMenu={this.handleCloseMenu}
          handleToggleEdit={handleToggleEdit}
          handleRemovePostUI={this.handleRemovePostUI}
          postCategory={post.category}
          postId={post.id}
          ownPost={authedUser === post.author}
        />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(PostHeader));
