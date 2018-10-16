import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from "./views/Root";
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? null : (
            <div>
              <Route path="/" exact component={Root} />
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
