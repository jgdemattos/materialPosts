import * as actions from "../../../actions/authedUser";
import mockStore from "../../../utils/mockStore";

describe("actions", () => {
  it("should correctly create SET_AUTHED_USER action", () => {
    const action = "someId";

    const expectedAction = {
      type: actions.SET_AUTHED_USER,
      id: "someId"
    };
    expect(actions.setAuthedUser(action)).toEqual(expectedAction);
  });
});
