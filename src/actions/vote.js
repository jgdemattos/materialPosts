import { saveVote } from "../utils/API";
import { sortPostsBy } from "./posts";
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

export function handleVote(info) {
  return dispatch => {
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
            message:
              "You " +
              (info.vote === "upVote" ? "Liked" : "Disliked") +
              " sucessfully",
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
