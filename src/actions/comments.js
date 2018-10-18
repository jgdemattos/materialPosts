import { getComments } from "../utils/API";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
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
