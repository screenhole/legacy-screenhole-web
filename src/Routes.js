import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GrabStream from './views/GrabStream/GrabStream';
import GrabSingle from './views/GrabSingle/GrabSingle';
import UserStream from './views/UserStream/UserStream';
import Manual from './views/Manual/Manual';
import NotFound from './views/NotFound/NotFound';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Settings from './views/Settings/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={GrabStream} />
        <Route exact path="/manual" component={Manual} />
        <Route exact path="/wtf" component={Manual} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/:username" component={UserStream} />
        <Route exact path="/:username/:id" component={GrabSingle} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
