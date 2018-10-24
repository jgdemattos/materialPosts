import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Send from "@material-ui/icons/Send";
import { handleCreatePost } from "../actions/posts";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CategorySelect from "./CategorySelect";
const styles = {
  cardPostCreate: {
    padding: 20
  },
  sendButton: {
    marginTop: "40px"
  },
  textField: {
    width: "270px"
  }
};
class PostCreate extends Component {
  state = {
    postBody: "",
    postTitle: "",
    selectedCategory: ""
  };
  handleChange = event => {
    this.setState({ selectedCategory: event.target.value });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { postId, dispatch, commentId, toggleEditComment } = this.props;

    /*     if (commentId) {
      return dispatch(
        handleEditComment({
          id: commentId,
          body: this.state.value
        })
      ).then(toggleEditComment());
    } */

    return dispatch(
      handleCreatePost({
        body: this.state.postBody,
        title: this.state.postTitle,
        category: this.state.selectedCategory
      })
    ).then(this.setState({ body: "" }));
  };
  render() {
    const { post, classes, categories } = this.props;
    return (
      <div className="postCreate">
        <Card className={classes.cardPostCreate} elevation={5}>
          <Typography component="p">{"What's on your mind?"}</Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={0} direction={"column"}>
              <Grid item>
                <TextField
                  id="standard-with-placeholder"
                  label="Title"
                  placeholder="Think of something nice"
                  className={classes.title}
                  name="postTitle"
                  margin="normal"
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <CategorySelect
                  handleChange={this.handleChange}
                  selectedCategory={this.state.selectedCategory}
                  categories={categories}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction={"row"}>
              <Grid item>
                <TextField
                  id="outlined-multiline-flexible"
                  label="New post"
                  multiline
                  name="postBody"
                  rows="3"
                  rowsMax="7"
                  //value={this.state.multiline}
                  onChange={this.handleInputChange}
                  //defaultValue={postBody}
                  className={classes.textField}
                  margin="normal"
                  helperText=""
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Send"
                  fontSize="small"
                  type="submit"
                  //form={postId}
                  value="Submit"
                  className={classes.sendButton}
                >
                  <Send />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.values(categories).map(category => category)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostCreate));
