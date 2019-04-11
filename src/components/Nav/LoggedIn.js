import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "../Tooltip/Tooltip";
import { Subscribe } from "unstated";

import AuthContainer from "../../utils/AuthContainer";

import Avatar from "../User/Avatar";
import Buttcoin from "../Buttcoin/Buttcoin";
import ActivityBadge from "../Activity/ActivityBadge";

class LoggedIn extends Component {
  render() {
    const { buttcoins, username, gravatar_hash } = this.props;

    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Fragment>
            <NavLink to="/wtf">wtf</NavLink>
            <NavLink to="/apps">apps</NavLink>
            <NavLink to="/peeps">peeps</NavLink>
            {auth.state.rules.webUpload && (
              <Tooltip title="Upload a grab" position="bottom">
                <UploadButton onClick={() => auth.toggleUploader("on")}>
                  {uploadIcon}
                </UploadButton>
              </Tooltip>
            )}
            <ActivityBadge />
            <Link to="/sup">
              <Buttcoin amount={buttcoins} username={username} />
            </Link>
            <Menu className="nav-dropdown">
              <Avatar gravatar={gravatar_hash} username={username} />
              <Dropdown className="user-nav-dropdown">
                <Link to={`/${username}`}>@{username}</Link>
                <NavLink to="/invite">invite</NavLink>
                <NavLink to="/settings">settings</NavLink>
                <Link to="/logout">log out</Link>
              </Dropdown>
            </Menu>
          </Fragment>
        )}
      </Subscribe>
    );
  }
}

export default LoggedIn;

const Menu = styled.div`
  position: relative;
  padding-left: 2rem;
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
    content: "";
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

    @media (pointer: fine) {
      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const UploadButton = styled.button`
  border: none;
  box-shadow: none;
  background: none;
  color: white;
  margin-left: 2rem;
  outline: none;
  transition: 0.15s ease all;

  svg {
    position: relative;
    top: 0.2rem;
  }

  @media (pointer: fine) {
    &:hover,
    &:focus {
      color: var(--secondary-color);
      cursor: pointer;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const uploadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
    <path d="M16 16l-4-4-4 4" />
  </svg>
);
