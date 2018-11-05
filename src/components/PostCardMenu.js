import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
  cardHeaderLink: {
    textDecoration: "none"
  }
};
class PostCardMenu extends React.Component {
  toggleEdit = () => {
    this.props.handleCloseMenu();
    this.props.handleToggleEdit();
  };
  handleRemove = () => {
    this.props.handleCloseMenu();
    this.props.handleRemovePostUI();
  };
  render() {
    const {
      anchorEl,
      handleCloseMenu,
      classes,
      postCategory,
      postId,
      ownPost
    } = this.props;

    return (
      <div className="postCardMenu">
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {ownPost && (
            <div>
              <MenuItem onClick={this.handleRemove}>Remove</MenuItem>
              <Link
                className={classes.cardHeaderLink}
                to={`/form/${postCategory}/${postId}`}
              >
                <MenuItem>Edit</MenuItem>
              </Link>
            </div>
          )}
          <Link
            className={classes.cardHeaderLink}
            to={`/detail/${postCategory}/${postId}`}
          >
            <MenuItem>View</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

PostCardMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  handleCloseMenu: PropTypes.func.isRequired,
  postCategory: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  ownPost: PropTypes.bool.isRequired,
  handleToggleEdit: PropTypes.func.isRequired,
  handleRemovePostUI: PropTypes.func.isRequired
};

export default withStyles(styles)(PostCardMenu);
