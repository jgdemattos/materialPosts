import reducer from "../../../reducers/categories";
import * as types from "../../../actions/categories";

describe("reducer", () => {
  it("should return empty object", () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it("should reduce RECEIVE_CATEGORIES", () => {
    expect(
      reducer(
        {},
        {
          type: types.RECEIVE_CATEGORIES,
          categories: {
            "0": {
              name: "react",
              path: "react"
            },
            "1": {
              name: "redux",
              path: "redux"
            },
            "2": {
              name: "udacity",
              path: "udacity"
            }
          }
        }
      )
    ).toEqual({
      "0": {
        name: "react",
        path: "react"
      },
      "1": {
        name: "redux",
        path: "redux"
      },
      "2": {
        name: "udacity",
        path: "udacity"
      }
    });
  });
});
