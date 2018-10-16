import { getInitialData } from "../utils/API";
import { receiveCategories } from "./categories";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "joao";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ categories }) => {
      dispatch(receiveCategories(categories));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
