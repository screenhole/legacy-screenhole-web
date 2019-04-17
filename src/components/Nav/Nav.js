import React, { Component, Fragment } from "react";
import { Subscribe } from "unstated";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Media from "react-media";

import AuthContainer from "../../utils/AuthContainer";

import HolePicker from "./HolePicker";
import Guest from "./Guest";
import LoggedIn from "./LoggedIn";
import Buttcoin from "../Buttcoin/Buttcoin";

import screenholeLogo from "../../images/screenhole-logo.svg";

class Nav extends Component {
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Navbar>
            <HolePicker auth={auth} {...this.props} />
            <Menu>
              <Media query="(min-width: 920px)">
                {matches =>
                  matches ? (
                    <Fragment>
                      {auth.state.authenticated && auth.state.current ? (
                        <LoggedIn
                          username={auth.state.current.username}
                          gravatar_hash={auth.state.current.gravatar_hash}
                          buttcoins={auth.state.buttcoins}
                          webUpload={this.props.webUpload}
                        />
                      ) : (
                        <Guest />
                      )}
                    </Fragment>
                  ) : (
                    <Link to="/sup">
                      {auth.state.authenticated &&
                        auth.state.current &&
                        !this.props.holeName && (
                          <Buttcoin
                            amount={auth.state.current.stats.buttcoins}
                            username={auth.state.current.username}
                          />
                        )}
                    </Link>
                  )
                }
              </Media>
            </Menu>
          </Navbar>
        )}
      </Subscribe>
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
  z-index: 100;
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

  [aria-current="true"] {
    color: white;
  }

  .activity-badge-nav {
    @media (max-width: 790px) {
      display: none !important;
    }
  }
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;

  > a {
    margin-left: 3rem;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  padding: 1rem;
  padding-left: 0;
  top: 0.35rem;
  min-width: 180px;

  &:hover {
    .multihole-nav-dropdown {
      animation: jellyReveal 0.65s linear both;
    }
  }
`;

const Dropdown = styled.div`
  z-index: 3000;
  position: absolute;
  top: 0;
  left: -9px;
  min-width: 160px;
  background-color: #6a40ee;
  border-radius: 5px;
  margin-top: 2.75rem;
  padding: 0.25rem 0;
  box-shadow: 0 10px 35px 0 rgba(0, 0, 0, 0.35);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  transform-origin: 20% -20%;

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7.5px 10px;
    border-color: transparent transparent #6a40ee;
  }

  a {
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;

    @media (pointer: fine) {
      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    svg {
      flex-shrink: 0;
      margin-right: 0.35em;
      position: relative;
      top: -1px;
    }
  }

  p {
    padding: 0.5rem 1rem;
    margin: 0;
    color: var(--nav-bg-color);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  hr {
    border-color: rgba(0, 0, 0, 0.15);
  }
`;
