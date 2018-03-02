import React, { Component } from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Media from "react-media";
import Lottie from "react-lottie";

import * as LogoExplosion from "../../animations/logo/intro.json";

import AuthContainer from "../../utils/AuthContainer";

import Guest from "./Guest";
import LoggedIn from "./LoggedIn";
import MobileMenu from "./MobileMenu";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: LogoExplosion,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class Nav extends Component {
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Navbar>
            <Link className="nav-logo-link" to="/">
              <Logo>
                <Lottie options={defaultOptions} width={400} />
              </Logo>
            </Link>
            <Menu>
              <Media query="(max-width: 790px)">
                {matches =>
                  matches ? (
                    auth.state.authenticated && auth.state.current ? (
                      <MobileMenu>
                        <LoggedIn
                          username={auth.state.current.username}
                          gravatar_hash={auth.state.current.gravatar_hash}
                          buttcoins={auth.state.buttcoins}
                        />
                      </MobileMenu>
                    ) : (
                      <MobileMenu>
                        <Guest />
                      </MobileMenu>
                    )
                  ) : auth.state.authenticated && auth.state.current ? (
                    <LoggedIn
                      username={auth.state.current.username}
                      gravatar_hash={auth.state.current.gravatar_hash}
                      buttcoins={auth.state.buttcoins}
                    />
                  ) : (
                    <Guest />
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

  .nav-logo-link {
    display: inline-block;
    height: var(--nav-height);
    width: 240px;
    position: relative;
  }

  [aria-current="true"] {
    color: white;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: -10.75rem;
  left: -5rem;
  pointer-events: none;
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
