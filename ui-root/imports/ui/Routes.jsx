import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, } from 'react-router';

import Dashboard from './containers/Dashboard';
import Layout from './containers/Layout';
import ReportTool from './containers/ReportTool';
import TemplateManager from './containers/reports/TemplateManager'
import {SigninFormPath, SigninupForm, SignupFormPath, SigninupFormStates} from
        "./containers/account/SigninupForm";

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Layout>
                <Route path="/" exact component={Dashboard} />
                <Route path={SigninFormPath} component={() =>
                    <SigninupForm />} />
                <Route path={SignupFormPath} component={ () =>
                    <SigninupForm />} />
                <Route path="/ReportTool" component={ReportTool} />
                <Route path="/reports/TemplateManager" component={TemplateManager} />
            </Layout>
        </Switch>
    </Router>
);
