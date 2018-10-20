import { getInitialData } from "../utils/API";
import { receiveCategories } from "./categories";
import { receivePosts } from "./posts";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "joao";

//dispatch(receiveComments(comments));

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ categories, posts, comments }) => {
      dispatch(receiveCategories(categories));
      dispatch(receivePosts(posts));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
