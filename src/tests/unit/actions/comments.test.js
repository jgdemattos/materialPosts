import * as actions from "../../../actions/comments";
import mockStore from "../../../utils/mockStore";

describe("actions", () => {
  it("should correctly create RECEIVE_COMMENTS action", () => {
    const action = {
      ...mockStore.comments
    };

    const expectedAction = {
      type: actions.RECEIVE_COMMENTS,
      comments: { ...mockStore.comments }
    };
    expect(actions.receiveComments(action)).toEqual(expectedAction);
  });

  it("should correctly create SORT_COMMENTS action", () => {
    const action = "timestamp";

    const expectedAction = {
      type: actions.SORT_COMMENTS,
      order: "timestamp"
    };
    expect(actions.sortComments(action)).toEqual(expectedAction);
  });

  it("should correctly create REMOVE_COMMENT action", () => {
    const action = "someId";

    const expectedAction = {
      type: actions.REMOVE_COMMENT,
      comment: "someId"
    };
    expect(actions.removeComment(action)).toEqual(expectedAction);
  });

  it("should correctly create SET_PARENT_DELETED action", () => {
    const action = "someId";

    const expectedAction = {
      type: actions.SET_PARENT_DELETED,
      post: "someId"
    };
    expect(actions.setParentDeleted(action)).toEqual(expectedAction);
  });

  it("should correctly create EDIT_COMMENT action", () => {
    const action = {
      id: "someId",
      timestamp: "new timestamp",
      body: "post body"
    };

    const expectedAction = {
      type: actions.EDIT_COMMENT,
      comment: { id: "someId", timestamp: "new timestamp", body: "post body" }
    };
    expect(actions.editComment(action)).toEqual(expectedAction);
  });

  it("should correctly create CREATE_COMMENT action", () => {
    const action = {
      parentId: "somePost",
      timestamp: "someTimestamp",
      body: "someBody",
      author: "authedUser",
      id: "someId"
    };

    const expectedAction = {
      type: actions.CREATE_COMMENT,
      comment: {
        parentId: "somePost",
        timestamp: "someTimestamp",
        body: "someBody",
        author: "authedUser",
        id: "someId"
      }
    };
    expect(actions.createComment(action)).toEqual(expectedAction);
  });
});
