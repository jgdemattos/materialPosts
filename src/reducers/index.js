import { combineReducers } from "redux";
import categories from "./categories";
import authedUser from "./authedUser";

export default combineReducers({
  authedUser,
  categories
});
