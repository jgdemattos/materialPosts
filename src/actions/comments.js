import {
  getComments,
  saveComment,
  deleteComment,
  updateComment
} from "../utils/API";
import { guid } from "../utils/helper";

import { showLoading, hideLoading } from "react-redux-loading";
import { updateCommentCount } from "./posts";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const SET_PARENT_DELETED = "SET_PARENT_DELETED";
export const SORT_COMMENTS = "SORT_COMMENTS";

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}
export function sortComments(order) {
  return {
    type: SORT_COMMENTS,
    order
  };
}
export function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  };
}
export function setParentDeleted(post) {
  return {
    type: SET_PARENT_DELETED,
    post
  };
}
export function handleRemoveComment({ id }) {
  return dispatch => {
    dispatch(showLoading());
    return deleteComment(id)
      .then(comment => {
        dispatch(removeComment(comment));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function handleEditComment({ id, body }) {
  return dispatch => {
    dispatch(showLoading());
    const timestamp = Date.now();
    return updateComment({ id, body, timestamp })
      .then(comment => {
        dispatch(editComment(comment));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment
  };
}

export function handleCreateComment({ parentId, body }) {
  return (dispatch, getState) => {
    const { authedUser, posts } = getState();
    const timestamp = Date.now();
    let id = guid();
    let post = posts[parentId];
    dispatch(showLoading());
    return saveComment({
      parentId,
      timestamp,
      body,
      author: authedUser,
      id
    })
      .then(comment => {
        dispatch(createComment(comment));
        dispatch(updateCommentCount(post));
      })
      .then(() => dispatch(sortComments("voteScore")))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleReceiveComments(postId) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return getComments(postId)
      .then(comments => {
        dispatch(receiveComments(comments));
      })
      .then(() => dispatch(sortComments("voteScore")))
      .then(() => dispatch(hideLoading()));
  };
}
