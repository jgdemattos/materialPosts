import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT
} from "../actions/comments";

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
    case CREATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          body: action.comment.body,
          timestamp: action.comment.timestamp
        }
      };

    default:
      return state;
  }
}
