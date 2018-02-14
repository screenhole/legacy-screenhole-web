import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import api from './api';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    api.authenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default PrivateRoute;
