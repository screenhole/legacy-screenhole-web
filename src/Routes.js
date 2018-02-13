import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Media from 'react-media';

import ChommentStream from './views/ChommentStream/ChommentStream';
import GrabStream from './views/GrabStream/GrabStream';
import GrabSingle from './views/GrabSingle/GrabSingle';
import UserStream from './views/UserStream/UserStream';
import Manual from './views/Manual/Manual';
import NotFound from './views/NotFound/NotFound';
import Login from './views/Login/Login';
import Logout from './views/Login/Logout';
import Register from './views/Register/Register';
import Settings from './views/Settings/Settings';

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({})

const RequireAuth = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.auth.authenticated,
  // A nice display name for this check
  wrapperDisplayName: 'RequireAuth'
});

const RequireNoAuth = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // If selector is true, wrapper will not redirect
  // So if there is no user data, then we show the page
  authenticatedSelector: state => ! state.auth.authenticated,
  // A nice display name for this check
  wrapperDisplayName: 'RequireNoAuth'
});

// Remember that route order matters for proper matching!

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={GrabStream} />
        <Route exact path="/manual" component={Manual} />
        <Route exact path="/wtf" component={Manual} />
        <Route exact path="/login" component={RequireNoAuth(Login)} />
        <Route exact path="/register" component={RequireNoAuth(Register)} />
        <Route exact path="/logout" component={RequireAuth(Logout)} />
        <Route exact path="/settings" component={RequireAuth(Settings)} />

        <Route exact path="/:username" component={UserStream} />
        <Route exact path="/:username/~:id" component={GrabSingle} />

        {/* Special mobile routes to work with NavTabs */}
        <Route exact path="/view/mobile/feed" component={GrabStream} />
        <Media query="(min-width: 791px)">
          {matches =>
            matches ? (
              <Route
                // Load the {GrabStream} when window matches desktop
                exact
                path="/view/mobile/chomments"
                component={GrabStream}
              />
            ) : (
              <Route
                // Load just the {ChommentStream} when window matches mobile
                exact
                path="/view/mobile/chomments"
                component={ChommentStream}
              />
            )
          }
        </Media>

        {/*
          This won’t work with the current implementation.
          /:username and {UserStream} is taking over priority.

          Either change the routes to /grab/:id and /user/:username
          or redirect to {NotFound} if no user is found in {UserStream}
        */}
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
