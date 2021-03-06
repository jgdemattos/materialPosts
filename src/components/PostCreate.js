import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Send from "@material-ui/icons/Send";
import { handleCreatePost, handleEditPost } from "../actions/posts";
import CategorySelect from "./CategorySelect";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

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
    selectedCategory: "",
    submitted: false,
    toHome: false
  };
  componentDidMount() {
    if (this.props.post) {
      this.setState({
        postBody: this.props.post.body,
        postTitle: this.props.post.title
      });
    }
  }

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

    const { post, dispatch, handleToggleEdit } = this.props;

    if (post) {
      return dispatch(
        handleEditPost({
          id: post.id,
          body: this.state.postBody,
          title: this.state.postTitle
        })
      ).then(
        handleToggleEdit ? handleToggleEdit() : this.setState({ toHome: true })
      );
    }

    return dispatch(
      handleCreatePost({
        body: this.state.postBody,
        title: this.state.postTitle,
        category: this.state.selectedCategory || "react"
      })
    ).then(() =>
      this.setState({ postBody: "", submitted: !this.state.submitted }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ submitted: false });
        }, 1000);
      })
    );
  };
  render() {
    const { post, classes, categories } = this.props;
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    if (this.state.submitted) {
      return (
        <Grid container direction={"row"} justify={"center"}>
          <ReactLoading type={"bars"} color="#f4b042" />
        </Grid>
      );
    }
    return (
      <div className="postCreate">
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
                defaultValue={post ? post.title : ""}
                onChange={this.handleInputChange}
              />
            </Grid>
            {!post && (
              <Grid item>
                <CategorySelect
                  handleChange={this.handleChange}
                  selectedCategory={
                    post ? post.category : this.state.selectedCategory
                  }
                  categories={categories}
                />
              </Grid>
            )}
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
                defaultValue={post ? post.body : ""}
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
      </div>
    );
  }
}
PostCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object,
  postId: PropTypes.string,
  handleToggleEdit: PropTypes.func
};

function mapStateToProps({ categories, posts }, { postId }) {
  const post = posts[postId];
  return {
    categories: Object.values(categories).map(category => category),
    post
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostCreate));
