import reducer from "../../../reducers/authedUser";
import * as types from "../../../actions/authedUser";

describe("reducer", () => {
  it("should return empty object", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should reduce SET_AUTHED_USER", () => {
    expect(
      reducer(
        {},
        {
          type: types.SET_AUTHED_USER,
          id: "joao"
        }
      )
    ).toEqual("joao");
  });
});
