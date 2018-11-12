import * as actions from "../../../actions/categories";
import mockStore from "../../../utils/mockStore";

describe("actions", () => {
  it("should correctly create RECEIVE_CATEGORIES action", () => {
    const action = { ...mockStore.categories };

    const expectedAction = {
      type: actions.RECEIVE_CATEGORIES,
      categories: { ...mockStore.categories }
    };
    expect(actions.receiveCategories(action)).toEqual(expectedAction);
  });
});
