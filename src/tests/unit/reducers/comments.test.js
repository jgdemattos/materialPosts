import reducer from "../../../reducers/comments";
import * as types from "../../../actions/comments";
import { COMMENT_VOTE } from "../../../actions/vote";
import mockStore from "../../../utils/mockStore";

describe("reducer", () => {
  it("should return empty object", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should reduce CREATE_COMMENT", () => {
    expect(
      reducer(
        {},
        {
          type: types.CREATE_COMMENT,
          comment: {
            id: "ididid",
            timestamp: "datenow",
            body: "new body",
            author: "joao",
            parentId: "8xf0y6ziyjabvozdd253nd"
          }
        }
      )
    ).toEqual({
      ididid: {
        id: "ididid",
        timestamp: "datenow",
        body: "new body",
        author: "joao",
        parentId: "8xf0y6ziyjabvozdd253nd"
      }
    });
  });

  it("should reduce RECEIVE_COMMENTS", () => {
    expect(
      reducer(
        {},
        {
          type: types.RECEIVE_COMMENTS,
          comments: {
            ididid: {
              id: "ididid",
              timestamp: "datenow",
              body: "new body",
              author: "joao",
              parentId: "8xf0y6ziyjabvozdd253nd"
            }
          }
        }
      )
    ).toEqual({
      ididid: {
        id: "ididid",
        timestamp: "datenow",
        body: "new body",
        author: "joao",
        parentId: "8xf0y6ziyjabvozdd253nd"
      }
    });
  });

  it("should reduce COMMENT_VOTE", () => {
    expect(
      reducer(
        { ...mockStore.comments },
        {
          type: COMMENT_VOTE,
          id: "894tuq4ut84ut8v4t8wun89g",
          vote: "upVote"
        }
      )
    ).toEqual({
      ...mockStore.comments,
      "894tuq4ut84ut8v4t8wun89g": {
        ...mockStore.comments["894tuq4ut84ut8v4t8wun89g"],
        voteScore: 4
      }
    });
  });

  it("should reduce EDIT_COMMENT", () => {
    expect(
      reducer(
        { ...mockStore.comments },
        {
          type: types.EDIT_COMMENT,
          comment: {
            id: "894tuq4ut84ut8v4t8wun89g",
            body: "edited body",
            timestamp: "updated timestamp"
          }
        }
      )
    ).toEqual({
      ...mockStore.comments,
      "894tuq4ut84ut8v4t8wun89g": {
        ...mockStore.comments["894tuq4ut84ut8v4t8wun89g"],
        timestamp: "updated timestamp",
        body: "edited body"
      }
    });
  });

  it("should reduce SET_PARENT_DELETED", () => {
    expect(
      reducer(
        { ...mockStore.comments },
        {
          type: types.SET_PARENT_DELETED,
          post: {
            id: "8xf0y6ziyjabvozdd253nd"
          }
        }
      )
    ).toEqual({
      ...mockStore.comments,
      "894tuq4ut84ut8v4t8wun89g": {
        ...mockStore.comments["894tuq4ut84ut8v4t8wun89g"],
        parentDeleted: true
      }
    });
  });

  it("should reduce SORT_COMMENTS", () => {
    expect(
      reducer(
        { ...mockStore.comments },
        {
          type: types.SORT_COMMENTS,
          post: "voteScore"
        }
      )
    ).toEqual({
      ...mockStore.comments
    });
  });
});
