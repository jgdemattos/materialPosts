import {
  RECEIVE_POSTS,
  CREATE_POST,
  EDIT_POST,
  REMOVE_POST,
  UPDATE_COMMENT_COUNT
} from "../actions/posts";

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
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          body: action.post.body,
          title: action.post.title
        }
      };
    case REMOVE_POST: {
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          deleted: true
        }
      };
    }
    case UPDATE_COMMENT_COUNT:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          commentCount: state[action.post.id].commentCount + 1
        }
      };
    default:
      return state;
  }
}
