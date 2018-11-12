import * as actions from "../../../actions/posts";
import mockStore from "../../../utils/mockStore";

describe("actions", () => {
  it("should correctly create SORT_POSTS action", () => {
    const action = "timestamp";

    const expectedAction = {
      type: actions.SORT_POSTS,
      order: "timestamp"
    };
    expect(actions.sortPostsBy(action)).toEqual(expectedAction);
  });

  it("should correctly create RECEIVE_POSTS action", () => {
    const action = {
      ...mockStore.posts
    };

    const expectedAction = {
      type: actions.RECEIVE_POSTS,
      posts: { ...mockStore.posts }
    };
    expect(actions.receivePosts(action)).toEqual(expectedAction);
  });

  it("should correctly create CREATE_POST action", () => {
    const action = {
      body: "post body",
      title: "post title",
      category: "redux"
    };

    const expectedAction = {
      type: actions.CREATE_POST,
      post: { body: "post body", title: "post title", category: "redux" }
    };
    expect(actions.createPost(action)).toEqual(expectedAction);
  });

  it("should correctly create EDIT_POST action", () => {
    const action = {
      id: "someId",
      title: "post title",
      body: "post body"
    };

    const expectedAction = {
      type: actions.EDIT_POST,
      post: { body: "post body", title: "post title", id: "someId" }
    };
    expect(actions.editPost(action)).toEqual(expectedAction);
  });

  it("should correctly create UPDATE_COMMENT_COUNT action", () => {
    const action = {
      id: "someId"
    };

    const expectedAction = {
      type: actions.UPDATE_COMMENT_COUNT,
      post: { id: "someId" }
    };
    expect(actions.updateCommentCount(action)).toEqual(expectedAction);
  });

  it("should correctly create REMOVE_POST action", () => {
    const action = {
      id: "someId"
    };

    const expectedAction = {
      type: actions.REMOVE_POST,
      post: { id: "someId" }
    };
    expect(actions.removePost(action)).toEqual(expectedAction);
  });
});
