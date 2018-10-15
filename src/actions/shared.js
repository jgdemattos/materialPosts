import { getInitialData } from "../utils/API";
import { receiveCategories } from "./categories";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = "joao";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ categories }) => {
      dispatch(receiveCategories(categories));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}
