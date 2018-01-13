import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';
import Buttcoin from '../Buttcoin/Buttcoin';

class Nav extends Component {
  render() {
    return (
      <Navbar>
        <Link to="/">
          <Logo src="/img/screenhole-logo.svg" alt="SCREENHOLE!" />
        </Link>
        <Menu>
          <Buttcoin amount="6969" />
          <a href="https://twitter.com/screenhole" target="_blank">
            twitter
          </a>
          <NavLink to="/manual">manual</NavLink>
          <Avatar
            src="https://www.gravatar.com/avatar/02c2fdca0586515379d9f6ea895f7bee?size=100&d=https%3A%2F%2Fscreenhole.net%2Fstatic%2Fimg%2Fdefault-avatar.dbeaf7a.png"
            username="Mr. Hole"
          />
        </Menu>
      </Navbar>
    );
  }
}

export default Nav;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: var(--app-padding);
  background-color: var(--nav-bg-color);
  border-bottom: var(--divider);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: Nav;

  a {
    flex-shrink: 0;
  }

  [aria-current='true'] {
    color: white;
  }
`;

const Logo = styled.img`
  width: 200px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;

  a {
    margin-left: 3rem;
  }
`;
