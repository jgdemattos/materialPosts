import { combineReducers } from "redux";
import categories from "./categories";
import posts from "./posts";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  authedUser,
  categories,
  posts,
  loadingBar: loadingBarReducer
});
