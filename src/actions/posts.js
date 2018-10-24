import { showLoading, hideLoading } from "react-redux-loading";
import { savePost } from "../utils/API";
import { guid } from "../utils/helper";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CREATE_POST = "CREATE_POST";

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
      .then(() => dispatch(hideLoading()));
  };
}
