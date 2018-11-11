import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mockStore from "../../../utils/mockStore";

import chai, { expect } from "chai";
import chaiRedux from "chai-redux";

import thunk from "redux-thunk";
import reducer from "../../../reducers/posts";
import { handleVote } from "../../../actions/vote";

chai.use(chaiRedux);

configure({ adapter: new Adapter() });

const connectedStore = chai.createReduxStore({
  reducer,
  middleware: [thunk],
  initialState: mockStore
});

describe("integration connected component mount", () => {
  it("should increment score value when upVote clicked", () => {
    connectedStore.dispatch(
      handleVote({
        id: "894tuq4ut84ut8v4t8wun89g",
        vote: "upVote",
        contentType: "comments"
      })
    );

    expect(connectedStore)
      .to.eventually.have.dispatched({ type: "COMMENT_VOTE" })
      .then.dispatched("SORT_COMMENTS")
      .notify();
  });
});
