import {
  getComments,
  saveComment,
  deleteComment,
  updateComment
} from "../utils/API";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}
export function removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    id
  };
}

export function handleRemoveComment({ id }) {
  return dispatch => {
    dispatch(showLoading());
    return deleteComment(id)
      .then(comment => {
        dispatch(removeComment(comment.id));
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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
export function handleCreateComment({ parentId, body }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const timestamp = Date.now();
    var id = guid();
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
      })
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
      .then(() => dispatch(hideLoading()));
  };
}
