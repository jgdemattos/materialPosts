import { RECEIVE_COMMENTS } from "../actions/comments";

import { COMMENT_VOTE } from "../actions/vote";

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case COMMENT_VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore:
            action.vote === "upVote"
              ? (state[action.id].voteScore = state[action.id].voteScore + 1)
              : (state[action.id].voteScore = state[action.id].voteScore - 1)
        }
      };
    default:
      return state;
  }
}
