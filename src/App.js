import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from "./views/Root";
import PostDetails from "./views/PostDetails";
import LoadingBar from "react-redux-loading";
import AppBar from "./components/AppBar";
import "./App.css";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <Router>
          <Fragment>
            <LoadingBar />
            <AppBar />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Root} />
                <Route
                  path="/:category/:postId"
                  exact
                  component={PostDetails}
                />
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
