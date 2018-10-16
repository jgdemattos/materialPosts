import { combineReducers } from "redux";
import categories from "./categories";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  authedUser,
  categories,
  loadingBar: loadingBarReducer
});
