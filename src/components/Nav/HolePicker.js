import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import subdomain from "../../utils/subdomain";

import screenholeLogo from "../../images/screenhole-logo.svg";

export default class HolePicker extends Component {
  render() {
    return (
      <NavLogoLink className="nav-logo-link">
        {!this.props.holeName && (
          <Link to="/">
            <Logo
              src={screenholeLogo}
              className={
                this.props.auth.state.current ? "logged-in" : "logged-out"
              }
            />
          </Link>
        )}
        <DropdownMenu className="nav-dropdown">
          <MultiholeName
            className={
              this.props.auth.state.current ? "logged-in" : "logged-out"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            {this.props.holeName && <Link to="/">{this.props.holeName}</Link>}
          </MultiholeName>
          {this.props.auth.state.current && (
            <Dropdown className="multihole-nav-dropdown">
              {/* TODO: unhack this lol so temp it shouldnt even exist */}
              {this.props.auth.state.current.holes[0].subdomain ===
                subdomain && (
                <span>
                  <p>Manage {this.props.holeName}</p>
                  <Link to="/cgi-bin/hole/rules">
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
                    Rules
                  </Link>
                </span>
              )}
              {/* <Link to="/cgi-bin/hole/invites">
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
            Invites
          </Link> */}
              <hr />
              <OtherHoles>
                <p>Switch holes</p>
                <Link to="https://screenhole.net">
                  <EnterIcon /> Screenhole
                </Link>
                <Link to="https://thinko.screenhole.net">
                  <EnterIcon /> Thinko
                </Link>
                {/* <Link to="/cgi-bin/hole/redeem">
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
                <rect
                  x={3}
                  y={11}
                  width={18}
                  height={11}
                  rx={2}
                  ry={2}
                />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              Join another hole
            </Link> */}
              </OtherHoles>
              <hr />
              <NavLink to="/cgi-bin/hole/new">
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
                Create hole
              </NavLink>
            </Dropdown>
          )}
        </DropdownMenu>
      </NavLogoLink>
    );
  }
}

const NavLogoLink = styled.div`
  display: flex;
  align-items: center;
  height: var(--nav-height);
  width: 300px;
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  left: 1.75rem;
  top: -2px;
  height: 60px;
  width: auto;
  z-index: 999;

  &.logged-out {
    left: 0;
  }
`;

const MultiholeName = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  position: relative;
  top: -5px;

  svg {
    margin-right: 0.25rem;
  }

  &.logged-out {
    svg {
      display: none;
    }
  }
`;

const OtherHoles = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
`;

const EnterIcon = () => (
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
    <path d="M14 9l6 6-6 6" />
    <path d="M4 4v7a4 4 0 0 0 4 4h11" />
  </svg>
);

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
