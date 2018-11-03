import { combineReducers } from "redux";
import categories from "./categories";
import posts from "./posts";
import comments from "./comments";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading";
import notifyReducer from "react-redux-notify";

export default combineReducers({
  authedUser,
  categories,
  posts,
  comments,
  loadingBar: loadingBarReducer,
  notifications: notifyReducer
});
