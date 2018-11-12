import { showLoading, hideLoading } from "react-redux-loading";
import { savePost, updatePost, deletePost } from "../utils/API";
import { guid } from "../utils/helper";
import { setParentDeleted } from "./comments";
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS
} from "react-redux-notify";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CREATE_POST = "CREATE_POST";
export const EDIT_POST = "EDIT_POST";
export const REMOVE_POST = "REMOVE_POST";
export const UPDATE_COMMENT_COUNT = "UPDATE_COMMENT_COUNT";
export const SORT_POSTS = "SORT_POSTS";

export function sortPostsBy(order) {
  return {
    type: SORT_POSTS,
    order
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function createPost(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function handleCreatePost({ body, title, category }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const timestamp = Date.now();
    var id = guid();
    dispatch(showLoading());
    return savePost({
      body,
      title,
      timestamp,
      category,
      author: authedUser,
      id
    })
      .then(post => {
        dispatch(createPost(post));
      })
      .then(() => dispatch(sortPostsBy("voteScore")))
      .then(() =>
        dispatch(
          createNotification({
            message: "You created a new post",
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 2000,
            canDismiss: true,
            transitionDurations: { enter: 160, leave: 400 }
          })
        )
      )
      .then(() => dispatch(hideLoading()));
  };
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  };
}

export function updateCommentCount({ post, operation }) {
  return {
    type: UPDATE_COMMENT_COUNT,
    post,
    operation
  };
}

export function handleEditPost({ id, body, title }) {
  return dispatch => {
    dispatch(showLoading());
    return updatePost({
      body,
      title,
      id
    })
      .then(post => {
        dispatch(editPost(post));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function removePost(post) {
  return {
    type: REMOVE_POST,
    post
  };
}

export function handleRemovePost({ id }) {
  return dispatch => {
    dispatch(showLoading());
    return deletePost(id)
      .then(post => {
        dispatch(removePost(post));
        dispatch(setParentDeleted(post));
      })
      .then(() => dispatch(hideLoading()));
  };
}
