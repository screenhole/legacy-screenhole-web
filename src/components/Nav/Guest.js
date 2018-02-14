import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Guest = () => (
  <Fragment>
    <a
      href="https://news.screenhole.net"
      target="_blank"
      rel="noopener noreferrer"
    >
      news
    </a>
    <a
      href="https://twitter.com/screenhole"
      target="_blank"
      rel="noopener noreferrer"
    >
      twitter
    </a>
    <NavLink to="/wtf">wtf</NavLink>
    <NavLink to="/login">log in</NavLink>
  </Fragment>
);

export default Guest;
