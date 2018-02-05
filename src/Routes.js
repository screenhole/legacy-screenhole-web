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
import Register from './views/Register/Register';
import Settings from './views/Settings/Settings';

import RequireAuth from './utils/RequireAuth';
import RequireNoAuth from './utils/RequireNoAuth';

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
        <Route exact path="/settings" component={RequireAuth(Settings)} />

        <Route exact path="/:username" component={UserStream} />
        <Route exact path="/:username/:id" component={GrabSingle} />

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
