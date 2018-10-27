import React, { Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {ownPost && (
            <Fragment>
              <MenuItem onClick={this.toggleEdit}>Editar</MenuItem>
              <MenuItem onClick={this.handleRemove}>Excluir</MenuItem>
              <MenuItem>edit</MenuItem>
            </Fragment>
          )}
          <Link
            className={classes.cardHeaderLink}
            to={`/${postCategory}/${postId}`}
          >
            <MenuItem>view</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(PostCardMenu);
