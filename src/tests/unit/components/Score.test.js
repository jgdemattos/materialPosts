import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Score } from "../../../components/Score";
import mockStore from "../../../utils/mockStore";

import chai, { expect } from "chai";
import chaiRedux from "chai-redux";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(chaiRedux);
chai.use(sinonChai);

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

let mockHandleVote = sinon.spy();
function setup() {
  const enzymeWrapper = shallow(
    <Score
      {...props}
      store={mockStore}
      dispatch={() => {
        let info = {
          id: "6ni6ok3ym7mf1p33lnez",
          vote: "upVote",
          contentType: "posts"
        };
        mockHandleVote(info);
      }}
    />
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("unit shallow component", () => {
  describe("voteScore", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(".score").hasClass("score")).to.equal(true);

      const upVoteButton = enzymeWrapper.find(".upVote").props();
      expect(upVoteButton.value).equal("upVote");
    });

    it("should call action creator when upVote clicked", () => {
      const { enzymeWrapper } = setup();
      const upVoteButton = enzymeWrapper.find(".upVote");
      upVoteButton.simulate("click", {
        preventDefault() {},
        currentTarget: { value: "upVote" }
      });

      expect(mockHandleVote).to.have.been.calledWith({
        id: "6ni6ok3ym7mf1p33lnez",
        vote: "upVote",
        contentType: "posts"
      });
    });
  });
});
