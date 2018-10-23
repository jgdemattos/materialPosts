import React from "react";
import CommentsList from "./CommentsList";
import CommentCreate from "./CommentCreate";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  commentCreate: {
    marginTop: "30px"
  }
};
function PostFooter(props) {
  const { postId, expanded, classes } = props;
  return (
    <div className="postFooter">
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsList postId={postId} />
          <Grid spacing={0} container justify={"center"}>
            <div className={classes.commentCreate}>
              <CommentCreate postId={postId} />
            </div>
          </Grid>
        </CardContent>
      </Collapse>
    </div>
  );
}

export default withStyles(styles)(PostFooter);
