import * as actions from "../../../actions/vote";

describe("actions", () => {
  it("should correctly create vote action", () => {
    const action = {
      id: "8xf0y6ziyjabvozdd253nd",
      vote: "upVote",
      contentType: "posts"
    };

    const expectedAction = {
      type: actions.POST_VOTE,
      id: "8xf0y6ziyjabvozdd253nd",
      vote: "upVote",
      contentType: "posts"
    };
    expect(actions.vote(action)).toEqual(expectedAction);
  });
});
