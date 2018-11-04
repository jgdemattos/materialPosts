import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { sortPostsBy } from "./actions/posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "./views/Root";
import PostDetails from "./views/PostDetails";
import TopBar from "./components/TopBar";
import PostForm from "./views/PostForm";
import "./App.css";
import Category from "./views/Category";
import FourOFour from "./components/FourOFour";
import { Notify } from "react-redux-notify";
import "react-redux-notify/dist/ReactReduxNotify.css";
import Notification from "./components/Notification";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData()).then(() =>
      dispatch(sortPostsBy("voteScore"))
    );
  }

  render() {
    return (
      //some styling are just for fixing materialUi's weird and unaddressed grid behaviour
      <div style={{ margin: 0 }}>
        <Router>
          <Fragment>
            <TopBar />
            {this.props.loading === true ? null : (
              <div>
                <Switch>
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
                  <Route
                    path="/category/:category/"
                    exact
                    component={Category}
                  />
                  <Route component={FourOFour} />
                </Switch>
              </div>
            )}
            <Notify
              notificationComponent={Notification}
              position={"BottomLeft"}
            />
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
