import reducer from "../../../reducers/posts";
import * as types from "../../../actions/posts";
import { POST_VOTE } from "../../../actions/vote";
import mockStore from "../../../utils/mockStore";

describe("reducer", () => {
  it("should return empty object", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should reduce CREATE_POST", () => {
    expect(
      reducer(
        {},
        {
          type: types.CREATE_POST,
          post: {
            id: "ididid",
            timestamp: "datenow",
            body: "new body",
            title: "new title",
            category: "react",
            author: "joao"
          }
        }
      )
    ).toEqual({
      ididid: {
        id: "ididid",
        timestamp: "datenow",
        body: "new body",
        title: "new title",
        category: "react",
        author: "joao"
      }
    });
  });

  it("should reduce RECEIVE_POSTS", () => {
    expect(
      reducer(
        {},
        {
          type: types.RECEIVE_POSTS,
          posts: {
            ididid: {
              id: "ididid",
              timestamp: "datenow",
              body: "new body",
              title: "new title",
              category: "react",
              author: "joao"
            }
          }
        }
      )
    ).toEqual({
      ididid: {
        id: "ididid",
        timestamp: "datenow",
        body: "new body",
        title: "new title",
        category: "react",
        author: "joao"
      }
    });
  });

  it("should reduce POST_VOTE", () => {
    expect(
      reducer(
        { ...mockStore.posts },
        {
          type: POST_VOTE,
          id: "8xf0y6ziyjabvozdd253nd",
          vote: "upVote"
        }
      )
    ).toEqual({
      ...mockStore.posts,
      "8xf0y6ziyjabvozdd253nd": {
        ...mockStore.posts["8xf0y6ziyjabvozdd253nd"],
        voteScore: 7
      }
    });
  });

  it("should reduce EDIT_POST", () => {
    expect(
      reducer(
        { ...mockStore.posts },
        {
          type: types.EDIT_POST,
          post: {
            id: "8xf0y6ziyjabvozdd253nd",
            body: "edited body",
            title: "edited title"
          }
        }
      )
    ).toEqual({
      ...mockStore.posts,
      "8xf0y6ziyjabvozdd253nd": {
        ...mockStore.posts["8xf0y6ziyjabvozdd253nd"],
        title: "edited title",
        body: "edited body"
      }
    });
  });

  it("should reduce REMOVE_POST", () => {
    expect(
      reducer(
        { ...mockStore.posts },
        {
          type: types.REMOVE_POST,
          post: {
            id: "8xf0y6ziyjabvozdd253nd"
          }
        }
      )
    ).toEqual({
      ...mockStore.posts,
      "8xf0y6ziyjabvozdd253nd": {
        ...mockStore.posts["8xf0y6ziyjabvozdd253nd"],
        deleted: true
      }
    });
  });

  it("should reduce UPDATE_COMMENT_COUNT", () => {
    expect(
      reducer(
        { ...mockStore.posts },
        {
          type: types.UPDATE_COMMENT_COUNT,
          post: {
            id: "8xf0y6ziyjabvozdd253nd"
          },
          operation: "increase"
        }
      )
    ).toEqual({
      ...mockStore.posts,
      "8xf0y6ziyjabvozdd253nd": {
        ...mockStore.posts["8xf0y6ziyjabvozdd253nd"],
        commentCount: 3
      }
    });
  });

  it("should reduce SORT_POSTS", () => {
    expect(
      reducer(
        { ...mockStore.posts },
        {
          type: types.SORT_POSTS,
          post: "voteScore"
        }
      )
    ).toEqual({
      ...mockStore.posts
    });
  });
});
