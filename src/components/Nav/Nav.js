import React, { Component, Fragment } from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Media from "react-media";

import AuthContainer from "../../utils/AuthContainer";

import HolePicker from "./HolePicker";
import Guest from "./Guest";
import LoggedIn from "./LoggedIn";
import Buttcoin from "../Buttcoin/Buttcoin";

class Nav extends Component {
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Navbar>
            <HolePicker auth={auth} {...this.props} />
            <Menu>
              <Media query="(min-width: 820px)">
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
    @media (max-width: 819px) {
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
