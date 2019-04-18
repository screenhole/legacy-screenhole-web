import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { Subscribe } from "unstated";

import AuthContainer from "../../utils/AuthContainer";

import { hot } from "react-hot-loader";

import Buttcoin from "../Buttcoin/Buttcoin";
import Avatar from "../User/Avatar";

class MobileNav extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  dismissMenu = () => {
    this.setState({
      menuOpen: false,
    });
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Container>
            <NavLink to="/cgi-bin/mobile/feed" onClick={this.dismissMenu}>
              {feedIcon}
            </NavLink>
            {this.props.chat && (
              <NavLink to="/cgi-bin/mobile/chat" onClick={this.dismissMenu}>
                {chommentIcon}
              </NavLink>
            )}
            {this.props.webUpload && (
              <UploaderButton
                onClick={() => {
                  auth.toggleUploader("on");
                  this.dismissMenu();
                }}
              >
                {addIcon}
              </UploaderButton>
            )}
            <NavLink to="/sup" onClick={this.dismissMenu}>
              {supIcon}
            </NavLink>
            <Hamburger
              className={this.state.menuOpen ? "active" : ""}
              onClick={this.toggleMenu}
            >
              {this.state.menuOpen ? closeIcon : hamgburgerIcon}
            </Hamburger>
            {this.state.menuOpen && (
              <Menu>
                {auth.state.current && (
                  <>
                    <DynamicMenuWrapper>
                      <TopMenu>
                        <Link to="/wtf" onClick={this.dismissMenu}>
                          <span>wtf is screenhole?</span>
                        </Link>
                      </TopMenu>
                      <HoleManagement>
                        <h2>Switch holes</h2>
                        <Link
                          to="/cgi-bin/hole/join"
                          onClick={this.dismissMenu}
                        >
                          {unlockIcon}
                          Join another hole
                        </Link>
                      </HoleManagement>
                      <HoleSwitcher>
                        {/* Loop through holes here */}
                        <Hole
                          href="https://screenhole.com"
                          onClick={this.dismissMenu}
                        >
                          <Title>Screenhole</Title>
                          <URL>screenhole.com</URL>
                        </Hole>
                        {auth.state.current.holes.map(hole => (
                          <Hole
                            href={`https://${hole.subdomain}.screenhole.com`}
                            onClick={this.dismissMenu}
                            key={hole.subdomain}
                          >
                            <Title>{hole.name}</Title>
                            <URL>{hole.subdomain}.screenhole.com</URL>
                          </Hole>
                        ))}

                        <div />
                      </HoleSwitcher>
                      <HoleAdmin>
                        <Link
                          to="/cgi-bin/hole/rules"
                          onClick={this.dismissMenu}
                        >
                          <span>
                            {rulesIcon}
                            Rules
                          </span>
                        </Link>
                        <Link
                          to="/cgi-bin/hole/invites"
                          onClick={this.dismissMenu}
                        >
                          <span>
                            {invitesIcon}
                            Invites
                          </span>
                        </Link>
                        <Link to="/cgi-bin/hole/new" onClick={this.dismissMenu}>
                          <span>
                            {newHoleIcon}
                            Create a new hole
                          </span>
                        </Link>
                      </HoleAdmin>
                    </DynamicMenuWrapper>
                    <UserInfo>
                      <Avatar
                        gravatar={auth.state.current.gravatar_hash}
                        username={auth.state.current.username}
                      />
                      <Info>
                        <Link
                          to={`${auth.state.current.username}`}
                          className="mobile-nav-username"
                          onClick={this.dismissMenu}
                        >
                          @{auth.state.current.username}
                        </Link>
                        <Stats>
                          <Stat>
                            <Buttcoin
                              amount={auth.state.current.stats.buttcoins}
                            />
                          </Stat>
                          <Stat>
                            {auth.state.current.stats.grabs.toLocaleString(
                              "en-US",
                            )}{" "}
                            Grabs
                          </Stat>
                        </Stats>
                        <Link
                          to="/settings"
                          className="mobile-nav-settings"
                          onClick={this.dismissMenu}
                        >
                          {settingsIcon}
                        </Link>
                      </Info>
                    </UserInfo>
                  </>
                )}

                {!auth.state.authenticated && (
                  <LogInButton>
                    <Link to="/login" onClick={this.dismissMenu}>
                      Log in
                    </Link>
                  </LogInButton>
                )}
              </Menu>
            )}
          </Container>
        )}
      </Subscribe>
    );
  }
}

export default hot(module)(MobileNav);

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--nav-height) + 0.75rem);
  background: #1c1c1c;
  box-shadow: 0 -1px 0 0 #262626;
  z-index: 999;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s ease all;

    &:active {
      transform: scale(0.92);
    }
  }

  svg {
    color: #666;
  }

  .active svg {
    color: var(--primary-color);
  }
`;

const Hamburger = styled.button`
  border: none;
  box-shadow: none;
  background: none;
  outline: none;
  transition: 0.15s ease all;

  &:active {
    transform: scale(0.92);
  }

  &.active svg {
    color: white;
  }
`;

const UploaderButton = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  transition: 0.15s ease all;
  outline: 0;

  &:active {
    transform: scale(0.98);
  }
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7rem;
  align-items: end;
  width: 100vw;
  height: calc(100vh - calc(var(--nav-height) + 0.75rem));
  background: #111;
  @supports (-webkit-backdrop-filter: blur(0)) {
    -webkit-backdrop-filter: blur(35px) saturate(170%) contrast(160%);
    background-color: rgba(0, 0, 0, 0.75);
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;

  .mobile-nav-settings {
    position: absolute;
    right: 1.25rem;
    transform: translateY(-125%);

    svg {
      color: var(--primary-color);
    }

    &:active {
      transform: scale(0.98) translateY(-125%);
    }
  }

  h2 {
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: normal;
    color: #666;
  }
`;

const TopMenu = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: none;
    color: var(--primary-color);
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }
`;

const DynamicMenuWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-gap: 1rem;
  position: relative;
  background: rgba(255, 255, 255, 0.035);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  img {
    width: 60px;
    height: 60px;
  }
`;

const Info = styled.div`
  .mobile-nav-username {
    font-size: 1.5rem;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;

  .buttcoin {
    margin-left: -0.25rem;
  }
`;

const Stat = styled.span`
  display: inline-block;
  font-size: 0.825rem;
  text-transform: uppercase;
  margin-right: 1.5rem;
  color: #666;
`;

const HoleManagement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1.5rem;
  margin-top: 0.25rem;

  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.25em;
      color: #666;
    }
  }
`;

const HoleSwitcher = styled.div`
  padding: 1rem 1.5rem;
  display: grid;
  grid-gap: 1rem;
  overflow: auto;
  grid: auto / auto-flow max-content;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

const Hole = styled.a`
  display: inline-block;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 1rem;

  &:first-child {
    box-shadow: 0 0 0 3px var(--primary-color);
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.span`
  display: block;
  color: white;
  font-weight: 600;
`;

const URL = styled.span`
  display: block;
  color: var(--primary-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const HoleAdmin = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3rem 3rem;
  padding: 1.25rem 1.5rem;
  margin-top: 0.75rem;
  grid-gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: none;
    color: var(--primary-color);
    font-size: 1rem;

    &:last-child {
      grid-column: 1 / -1;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      margin-right: 0.25em;
      color: #666;
    }
  }
`;

const LogInButton = styled.div`
  padding: 0 4rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    padding: 2rem;
    border: none;
    color: var(--primary-color);
    font-size: 1rem;

    &:last-child {
      grid-column: 1 / -1;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      margin-right: 0.25em;
      color: #666;
    }
  }
`;

const hamgburgerIcon = (
  <svg width={28} height={21} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      d="M1.5 1.5L26.5 1.5M1.5 10.367L26.5 10.367M1.5 19.233L26.5 19.233"
    />
  </svg>
);

const supIcon = (
  <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.0615 26.7226C16.835 27.1169 16.5099 27.4443 16.1188 27.6718C15.7277 27.8994 15.2843 28.0191 14.8329 28.0191C14.3816 28.0191 13.9381 27.8994 13.547 27.6718C13.1559 27.4443 12.8309 27.1169 12.6044 26.7226M27.7147 21.5178H1.95117C2.97611 21.5178 3.95906 21.1065 4.6838 20.3745C5.40854 19.6424 5.8157 18.6495 5.8157 17.6142V11.1083C5.8157 8.69264 6.76572 6.3759 8.45678 4.66776C10.1478 2.95962 12.4414 2 14.8329 2C17.2244 2 19.518 2.95962 21.2091 4.66776C22.9001 6.3759 23.8501 8.69264 23.8501 11.1083V17.6142C23.8501 18.6495 24.2573 19.6424 24.982 20.3745C25.7068 21.1065 26.6897 21.5178 27.7147 21.5178Z"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const feedIcon = (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3753 2.21913L14.4383 1.04783L15.3753 2.21913ZM16.6247 2.21913L17.5617 1.04783L16.6247 2.21913ZM29.6247 12.6191L28.6877 13.7904L29.6247 12.6191ZM2.3753 12.6191L3.31235 13.7904L2.3753 12.6191ZM28.5 13.4V28.7194H31.5V13.4H28.5ZM29 28.2194H3V31.2194H29V28.2194ZM3.5 28.7194V13.4H0.5V28.7194H3.5ZM3.31235 13.7904L16.3123 3.39043L14.4383 1.04783L1.43826 11.4478L3.31235 13.7904ZM15.6877 3.39043L28.6877 13.7904L30.5617 11.4478L17.5617 1.04783L15.6877 3.39043ZM16.3123 3.39043C16.1297 3.53652 15.8703 3.53652 15.6877 3.39043L17.5617 1.04783C16.6487 0.317393 15.3513 0.317389 14.4383 1.04783L16.3123 3.39043ZM3 28.2194C3.27614 28.2194 3.5 28.4432 3.5 28.7194H0.5C0.5 30.1001 1.61929 31.2194 3 31.2194V28.2194ZM28.5 28.7194C28.5 28.4432 28.7239 28.2194 29 28.2194V31.2194C30.3807 31.2194 31.5 30.1001 31.5 28.7194H28.5ZM31.5 13.4C31.5 12.6405 31.1548 11.9223 30.5617 11.4478L28.6877 13.7904C28.569 13.6955 28.5 13.5519 28.5 13.4H31.5ZM3.5 13.4C3.5 13.5519 3.43096 13.6955 3.31235 13.7904L1.43826 11.4478C0.845223 11.9223 0.5 12.6405 0.5 13.4H3.5Z"
      fill="currentColor"
    />
    <circle
      cx="11.625"
      cy="17.469"
      r="1.5"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth=".5"
    />
    <circle
      cx="20.375"
      cy="17.469"
      r="1.5"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth=".5"
    />
    <path
      d="M14.3353 20.6919C13.6989 20.1616 12.753 20.2475 12.2227 20.884C11.6923 21.5204 11.7783 22.4662 12.4147 22.9966L14.3353 20.6919ZM19.5853 22.9966C20.2217 22.4662 20.3077 21.5204 19.7773 20.884C19.247 20.2475 18.3011 20.1616 17.6647 20.6919L19.5853 22.9966ZM12.4147 22.9966L12.479 23.0501L14.3995 20.7455L14.3353 20.6919L12.4147 22.9966ZM19.521 23.0501L19.5853 22.9966L17.6647 20.6919L17.6005 20.7455L19.521 23.0501ZM12.479 23.0501C14.5186 24.7498 17.4814 24.7498 19.521 23.0501L17.6005 20.7455C16.6733 21.5181 15.3267 21.5181 14.3995 20.7455L12.479 23.0501Z"
      fill="currentColor"
    />
    <path
      d="M26.9375 3.90674L26.9375 9.15674"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);

const chommentIcon = (
  <svg width={36} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.713 22L19.9868 21.208C19.7131 20.7677 19.2314 20.5 18.713 20.5V22ZM21.2 26L19.9262 26.792C20.1999 27.2323 20.6816 27.5 21.2 27.5C21.7184 27.5 22.2001 27.2323 22.4738 26.792L21.2 26ZM23.687 22V20.5C23.1686 20.5 22.6869 20.7677 22.4132 21.208L23.687 22ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V0.5C5.64873 0.5 0.5 5.64873 0.5 12H3.5ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H0.5C0.5 18.3513 5.64873 23.5 12 23.5V20.5ZM18.713 20.5H12V23.5H18.713V20.5ZM22.4738 25.208L19.9868 21.208L17.4391 22.792L19.9262 26.792L22.4738 25.208ZM22.4132 21.208L19.9262 25.208L22.4738 26.792L24.9609 22.792L22.4132 21.208ZM24 20.5H23.687V23.5H24V20.5ZM32.5 12C32.5 16.6944 28.6944 20.5 24 20.5V23.5C30.3513 23.5 35.5 18.3513 35.5 12H32.5ZM24 3.5C28.6944 3.5 32.5 7.30558 32.5 12H35.5C35.5 5.64873 30.3513 0.5 24 0.5V3.5ZM12 3.5H24V0.5H12V3.5Z"
      fill="currentColor"
    />
  </svg>
);

const addIcon = (
  <svg width={54} height={54} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx={27} cy={27} r={25} stroke="currentColor" strokeWidth={3} />
    <rect
      x="22.5"
      y="13.5"
      width={9}
      height={27}
      rx="4.5"
      stroke="currentColor"
      strokeWidth={3}
    />
    <rect
      x="40.5"
      y="22.5"
      width={9}
      height={27}
      rx="4.5"
      transform="rotate(90 40.5 22.5)"
      stroke="currentColor"
      strokeWidth={3}
    />
  </svg>
);

const settingsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx={12} cy={12} r={3} />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const unlockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const newHoleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const invitesIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const rulesIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1={20} y1={6} x2={6} y2={20} />
    <line x1={6} y1={6} x2={20} y2={20} />
  </svg>
);
