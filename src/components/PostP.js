import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveComments } from "../actions/comments";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import { receiveComments } from "../actions/comments";
const styles = theme => ({
  commentTag: {
    marginLeft: "auto"
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
  avatar: {
    backgroundColor: red[500]
  }
});

class Post extends React.Component {
  state = { expanded: false };

  componentDidMount() {
    this.props.dispatch(handleReceiveComments(this.props.id));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, post } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post.timestamp}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title={post.title}
        />
        <CardContent>
          <Typography component="p">{post.body}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Like">
            <ThumbUpAlt />
          </IconButton>
          <IconButton aria-label="Dislike">
            <ThumbDownAlt />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <Typography className={classes.commentTag}>Comments</Typography>
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
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography>comments are avaliable by props</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

function mapStateToProps({ posts }, { id }) {
  const key = Object.keys(posts).filter(p => posts[p].id === id);
  let post = posts[key];

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
    post
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Post));
