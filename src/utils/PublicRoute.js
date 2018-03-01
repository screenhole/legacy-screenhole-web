import React from "react";
import { Route, Redirect } from "react-router-dom";

import api from "./api";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      api.authenticated === true ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;
