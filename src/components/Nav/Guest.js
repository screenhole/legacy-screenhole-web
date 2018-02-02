import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

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
    <a
      href="https://twitter.com/pasql/status/928638640368037888"
      target="_blank"
      rel="noopener noreferrer"
    >
      get invite
    </a>
    <NavLink to="/login">log in</NavLink>
  </Fragment>
);

export default Guest;
