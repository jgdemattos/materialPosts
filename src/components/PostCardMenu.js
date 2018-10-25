import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class PostCardMenu extends React.Component {
  toggleEdit = () => {
    this.props.handleCloseMenu();
    this.props.handleToggleEdit();
  };
  render() {
    const { anchorEl, handleCloseMenu, handleToggleEdit } = this.props;

    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={this.toggleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Excluir</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default PostCardMenu;
