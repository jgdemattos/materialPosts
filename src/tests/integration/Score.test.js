import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ConnectedScore from "../../components/Score";
import mockStore from "../../utils/mockStore";

import chai, { expect } from "chai";
import chaiRedux from "chai-redux";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "../../reducers/posts";
import { handleVote } from "../../actions/vote";

chai.use(chaiRedux);

configure({ adapter: new Adapter() });

const scoreHolder = {
  "8tu4bsun805n8un48ve89": {
    id: "8tu4bsun805n8un48ve89",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: "Comments. Are. Cool.",
    author: "thingone",
    voteScore: -9,
    deleted: false,
    parentDeleted: false
  }
};
const props = {
  id: "6ni6ok3ym7mf1p33lnez",
  contentType: "posts",
  scoreHolder: scoreHolder
};

const connectedStore = chai.createReduxStore({
  reducer,
  middleware: [thunk],
  initialState: mockStore
});

describe("integration connected component mount", () => {
  it("should render component with score of -6", () => {
    let wrapper = mount(
      <Provider store={connectedStore}>
        <ConnectedScore {...props} />
      </Provider>
    );
    expect(wrapper.find(".scoreValue").text()).equal("-6");
  });
  it("should increment score value when upVote clicked", () => {
    let wrapper = mount(
      <Provider store={connectedStore}>
        <ConnectedScore {...props} />
      </Provider>
    );
    const upVoteButton = wrapper.find(".upVote").at(0);

    upVoteButton.simulate("click", {
      preventDefault() {},
      currentTarget: { value: "upVote" }
    });
    connectedStore.dispatch(
      handleVote({
        id: "6ni6ok3ym7mf1p33lnez",
        vote: "upVote",
        contentType: "posts"
      })
    );
    expect(connectedStore)
      .to.eventually.have.dispatched("POST_VOTE")
      .notify(() => expect(wrapper.find(".scoreValue").text()).equal("-5"));
  });
});
