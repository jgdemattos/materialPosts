import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { sortPostsBy } from "./actions/posts";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from "./views/Root";
import PostDetails from "./views/PostDetails";
import AppBar from "./components/AppBar";
import PostForm from "./views/PostForm";

import "./App.css";
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData()).then(() =>
      dispatch(sortPostsBy("voteScore"))
    );
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <Router>
          <Fragment>
            <AppBar />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Root} />
                <Route
                  path="/detail/:category/:postId"
                  exact
                  component={PostDetails}
                />
                <Route
                  path="/form/:category/:postId"
                  exact
                  component={PostForm}
                />
                <Route path="/form/:category/" exact component={PostForm} />
              </div>
            )}
          </Fragment>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
