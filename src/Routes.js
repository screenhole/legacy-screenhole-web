import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Media from 'react-media';

import PrivateRoute from './utils/PrivateRoute'; // require auth
import PublicRoute from './utils/PublicRoute'; // require NO auth

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

// Remember that route order matters for proper matching!

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={GrabStream} />
        <Route exact path="/manual" component={Manual} />
        <Route exact path="/wtf" component={Manual} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/settings" component={Settings} />

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
