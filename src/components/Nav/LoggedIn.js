import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';
import Buttcoin from '../Buttcoin/Buttcoin';

class LoggedIn extends Component {
  render() {
    const { buttcoins, username, gravatar_hash } = this.props;

    return (
      <Fragment>
        <Buttcoin amount={buttcoins} />
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
        <Menu className="nav-dropdown">
          <Avatar
            gravatar={gravatar_hash}
            username={username}
          />
          <Dropdown className="user-nav-dropdown">
            <Link to={`/${username}`}>@{username}</Link>
            <NavLink to="/settings">settings</NavLink>
            <Link to="/logout">log out</Link>
          </Dropdown>
        </Menu>
      </Fragment>
    );
  }
}

export default LoggedIn;

const Menu = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-bottom: 1rem;
  top: 0.5rem;

  &:hover {
    .user-nav-dropdown {
      animation: jellyReveal 0.65s linear both;
    }
  }
`;

const Dropdown = styled.div`
  z-index: 3000;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #6a40ee;
  border-radius: 5px;
  margin-top: 2.75rem;
  padding: 0.25rem 0;
  box-shadow: 0 10px 35px 0 rgba(0, 0, 0, 0.35);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  transform-origin: 80% -20%;

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7.5px 10px;
    border-color: transparent transparent #6a40ee;
  }

  a {
    color: #fff;
    display: block;
    padding: 0.5rem 1rem;
  }
`;
