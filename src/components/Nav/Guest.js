import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Guest = () => (
  <Fragment>
    <NavLink to="/wtf">wtf</NavLink>
    <NavLink to="/apps">apps</NavLink>
    <NavLink to="/register">register</NavLink>
    <NavLink to="/login">log in</NavLink>
  </Fragment>
);

export default Guest;
