import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PostP from "./PostP";
import PostCreate from "./PostCreate";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import OrderSelect from "./OrderSelect";
import { sortPostsBy } from "../actions/posts";
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
class PostsList extends Component {
  state = {};
  orderBy = order => {
    const { dispatch } = this.props;

    dispatch(sortPostsBy(order));
  };
  render() {
    const { posts, classes, category } = this.props;
    return (
      <div className="postsList">
        <Grid
          style={{
            margin: 0,
            width: "100%"
          }}
          container
          spacing={40}
          direction={"column"}
          justify={"center"}
        >
          <Grid item>
            <Card elevation={5} className={classes.cardPostCreate}>
              <Typography component="p">{"What's on your mind?"}</Typography>
              <PostCreate />
            </Card>
          </Grid>
          <OrderSelect orderBy={this.orderBy} order={this.state.order} />
          {posts.map(
            post =>
              !post.deleted && (
                <Grid item key={post.id}>
                  <PostP id={post.id} />
                </Grid>
              )
          )}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { category }) {
  return {
    posts: Object.values(posts).filter(
      post => (category ? category === post.category : true)
    )
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PostsList));
