import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from 'react-media';

import Guest from './Guest';
import LoggedIn from './LoggedIn';
import MobileMenu from './MobileMenu';

class Nav extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <Navbar>
        <Link to="/">
          <Logo src="/img/screenhole-logo.svg" alt="SCREENHOLE!" />
        </Link>
        <Menu>
          <Media query="(max-width: 790px)">
            {matches =>
              matches ? (
                authenticated ? (
                  <MobileMenu>
                    <LoggedIn username="pasquale" />
                  </MobileMenu>
                ) : (
                  <MobileMenu>
                    <Guest />
                  </MobileMenu>
                )
              ) : authenticated ? (
                <LoggedIn username="pasquale" />
              ) : (
                <Guest />
              )
            }
          </Media>
        </Menu>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Nav);

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

  [aria-current='true'] {
    color: white;
  }
`;

const Logo = styled.img`
  width: 232px;
  position: relative;
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
