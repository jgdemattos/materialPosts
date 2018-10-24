import { RECEIVE_POSTS, CREATE_POST } from "../actions/posts";

import { POST_VOTE } from "../actions/vote";

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      };
    case POST_VOTE:
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
    case CREATE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    default:
      return state;
  }
}
