import React from "react";
import CommentsList from "./CommentsList";
import CommentCreate from "./CommentCreate";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
function PostFooter(props) {
  const { postId, expanded } = props;
  return (
    <div className="postFooter">
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsList postId={postId} />
          <Grid spacing={0} container justify={"center"}>
            <CommentCreate postId={postId} />
          </Grid>
        </CardContent>
      </Collapse>
    </div>
  );
}

export default PostFooter;
