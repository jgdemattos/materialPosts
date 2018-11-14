import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  SET_PARENT_DELETED,
  SORT_COMMENTS
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
              ? state[action.id].voteScore + 1
              : state[action.id].voteScore - 1
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
        [action.comment.id]: {
          ...state[action.comment.id],
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
    case SET_PARENT_DELETED:
      let toSet = Object.values(state).filter(comment => {
        return comment.parentId === action.post.id;
      });

      //aplies id as the key
      let parentLessComments = {};
      toSet.forEach(element => {
        element.parentDeleted = true;
        parentLessComments[element.id] = element;
      });

      return {
        ...state,
        ...parentLessComments
      };
    case SORT_COMMENTS:
      let order = action.order;

      //sorts only the values
      let sortedValues = Object.values(state).sort((a, b) => {
        return b[order] - a[order];
      });
      //aplies id as the key
      let sortedComments = {};
      sortedValues.forEach(element => {
        sortedComments[element.id] = element;
      });
      return {
        ...sortedComments
      };
    default:
      return state;
  }
}
