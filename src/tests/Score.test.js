import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Score } from "../components/Score";

configure({ adapter: new Adapter() });

const store = {
  authedUser: "joao",
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
  },
  posts: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1468479767190,
      title: "Learn Redux in 10 minutes!",
      body: "Just kidding. It takes more than 10 minutes to learn technology.",
      author: "thingone",
      category: "redux",
      voteScore: -6,
      deleted: false,
      commentCount: 0
    }
  },
  comments: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: "894tuq4ut84ut8v4t8wun89g",
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: "Hi there! I am a COMMENT.",
      author: "thingtwo",
      voteScore: 3,
      deleted: false,
      parentDeleted: false
    },
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
  },
  loadingBar: {
    default: 0
  },
  notifications: []
};

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
function setup() {
  const props = {
    id: "6ni6ok3ym7mf1p33lnez",
    contentType: "posts",
    scoreHolder: scoreHolder
  };

  const enzymeWrapper = shallow(<Score {...props} store={store} />);
  return {
    props,
    enzymeWrapper
  };
}
const props = {
  //addTodo: jest.fn(),
  id: "6ni6ok3ym7mf1p33lnez",
  contentType: "posts",
  scoreHolder: scoreHolder
};
describe("components", () => {
  describe("Header", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(".score").hasClass("score")).toBe(true);

      const upVoteButton = enzymeWrapper.find(".upVote").props();
      expect(upVoteButton.value).toEqual("upVote");
    });
  });
});
