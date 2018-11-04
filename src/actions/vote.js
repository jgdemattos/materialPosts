import { saveVote } from "../utils/API";
import { sortComments } from "./comments";
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS
} from "react-redux-notify";
export const COMMENT_VOTE = "COMMENT_VOTE ";
export const POST_VOTE = "POST_VOTE";

function vote({ id, vote, contentType }) {
  return {
    type: contentType === "posts" ? POST_VOTE : COMMENT_VOTE,
    id,
    vote,
    contentType
  };
}

function createMessage(info, getState) {
  const { id, contentType } = info;
  const { posts, comments } = getState();
  let message = "";
  if (contentType === "posts") {
    message = posts[id].author + "'s post";
  } else {
    message = comments[id].author + "'s comment";
  }
  return (
    "You " + (info.vote === "upVote" ? "Liked" : "Disliked") + " " + message
  );
}

export function handleVote(info) {
  return (dispatch, getState) => {
    return saveVote(info)
      .then(() => dispatch(vote(info)))
      .then(
        () =>
          info.contentType === "comments" &&
          //? dispatch(sortPostsBy("voteScore"))
          dispatch(sortComments("voteScore"))
      )
      .then(() =>
        dispatch(
          createNotification({
            message: createMessage(info, getState),
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 2000,
            canDismiss: true,
            transitionDurations: { enter: 160, leave: 400 }
          })
        )
      )
      .catch(e => {
        console.warn("error in handleVote:", e);
        alert("there was an error voting");
      });
  };
}
