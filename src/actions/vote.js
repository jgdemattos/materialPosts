import { saveVote } from "../utils/API";
import { sortPostsBy } from "./posts";
import { sortComments } from "./comments";

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
      .catch(e => {
        console.warn("error in handleVote:", e);
        alert("there was an error voting");
      });
  };
}
