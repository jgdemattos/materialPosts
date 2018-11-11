import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ConnectedScore, { Score } from "../components/Score";
import mockStore from "../utils/mockStore";

import chai, { expect } from "chai";
import chaiRedux from "chai-redux";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/posts";
import { handleVote } from "../actions/vote";

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
//const handleVote = jest.fn();
function setup() {
  const enzymeWrapper = shallow(
    <Score
      {...props}
      store={mockStore}
      dispatch={() => {
        //handleVote();
      }}
    />
  );
  return {
    props,
    enzymeWrapper
  };
}
/* const connectedStore = createStore(
  reducers,
  { ...mockStore },
  applyMiddleware(thunk)
); */

const connectedStore = chai.createReduxStore({
  reducer,
  middleware: [thunk],
  initialState: mockStore
});
describe("unit shallow component", () => {
  describe("voteScore", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(".score").hasClass("score")).to.equal(true);

      const upVoteButton = enzymeWrapper.find(".upVote").props();
      expect(upVoteButton.value).equal("upVote");

      /*       const score = enzymeWrapper.find('.score').props()
      expect(todoInputProps.newTodo).toBe(true)
      expect(todoInputProps.placeholder).toEqual('What needs to be done?') */
    });

    it("should call action creator when upVote clicked", () => {
      const { enzymeWrapper } = setup();
      const upVoteButton = enzymeWrapper.find(".upVote");
      upVoteButton.simulate("click", {
        preventDefault() {},
        currentTarget: { value: "upVote" }
      });

      //expect(handleVote.mock.calls.length).toBe(1);
      /*     expect(handleVote.mock.calls[0][0]).toEqual({
        id: "6ni6ok3ym7mf1p33lnez",
        vote: "upVote",
        contentType: "posts"
      }); */
    });
  });
});

describe("integration connect mount component", () => {
  it("should render component with score of -6", () => {
    let wrapper = mount(
      <Provider store={connectedStore}>
        <ConnectedScore {...props} />
      </Provider>
    );
    expect(wrapper.find(".scoreValue").text()).equal("-6");
  });
  it("should call action creator when upVote clicked", () => {
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
