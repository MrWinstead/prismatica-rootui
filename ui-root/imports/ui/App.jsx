import React, { Component } from 'react';
import { Router, Route, hashHistory  } from 'react-router';
import Layout from './containers/Layout';

export const RootPath = "/";

export default class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path={RootPath} component={Layout}>
          <IndexRoute component={Layout} />
        </Route>
      </Router>
    );
  }
}
