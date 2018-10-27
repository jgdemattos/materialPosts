import React from "react";
import { connect } from "react-redux";
import { handleReceiveComments } from "../actions/comments";

import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Score from "./Score";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PostFooter from "./PostFooter";

import PostCreate from "./PostCreate";
import PostHeader from "./PostHeader";

const styles = theme => ({
  commentTag: {
    width: "fit-content"
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },

  editPost: {
    padding: "20px"
  }
});

class Post extends React.Component {
  state = {
    expanded: false
  };

  componentDidMount() {
    this.props.dispatch(handleReceiveComments(this.props.id));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleToggleEdit = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  render() {
    const { classes, post, authedUser } = this.props;
    return (
      <Card className={classes.card} elevation={5}>
        <PostHeader
          post={post}
          handleToggleEdit={this.handleToggleEdit}
          authedUser={authedUser}
        />
        {/*     <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title={post.title}
        /> */}
        {this.state.toggleEdit ? (
          <div className={classes.editPost}>
            <PostCreate
              postId={post.id}
              handleToggleEdit={this.handleToggleEdit}
            />
          </div>
        ) : (
          <div>
            <CardContent>
              <Typography component="p">{post.body}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Score contentType={"posts"} id={post.id} />

              <Typography className={classes.commentTag}>
                {post.commentCount} comments
              </Typography>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <PostFooter postId={post.id} expanded={this.state.expanded} />
          </div>
        )}
      </Card>
    );
  }
}

function mapStateToProps({ posts, authedUser }, { id }) {
  let post = posts[id];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var date = new Date(post.timestamp);

  var formattedTime =
    monthNames[date.getMonth()] +
    " " +
    date.getDay() +
    ", " +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    ("0" + date.getMinutes()).substr(-2);

  post.timestamp = formattedTime;

  return {
    post,
    authedUser
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Post));
