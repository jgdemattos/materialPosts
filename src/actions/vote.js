import { saveVote } from "../utils/API";

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
    dispatch(vote(info));
    return saveVote(info).catch(e => {
      console.warn("error in handleVote:", e);
      dispatch(vote(info));
      alert("there was an error voting");
    });
  };
}
