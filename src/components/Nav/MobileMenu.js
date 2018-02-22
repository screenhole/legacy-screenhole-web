import React, { Component } from "react";
import styled from "styled-components";

class MobileMenu extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }
  handleMenuState() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Overlay className={this.state.isOpen ? "menu-open" : null}>
        <HamburgerButton
          onClick={this.handleMenuState.bind(this)}
          className={this.state.isOpen ? "menu-open" : null}
        >
          {hamburgerIcon}
        </HamburgerButton>
        {this.state.isOpen && (
          <Content onClick={this.handleMenuState.bind(this)}>
            {this.props.children}
          </Content>
        )}
      </Overlay>
    );
  }
}

export default MobileMenu;

const Overlay = styled.div`
  &.menu-open {
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--body-bg-color);
    @supports (-webkit-backdrop-filter: blur(0)) {
      -webkit-backdrop-filter: blur(35px) saturate(170%) contrast(160%);
      background-color: rgba(0, 0, 0, 0.75);
    }
    animation: fadeIn 0.25s ease both;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 1rem;
  outline: 0;
  color: var(--primary-color);
  position: absolute;
  z-index: 5000;
  top: 0.25rem;
  right: 0.25rem;

  svg use:first-of-type {
    transform: rotate(0deg) translate(0px, 0px);
  }

  svg use:last-of-type {
    ${"" /* Required for safari 🤷️ */} transform: rotate(0deg) translate(0px, 12px);
  }

  &.menu-open {
    color: #fff;
    svg {
      use:first-of-type {
        transform: rotate(45deg) translate(2px, -3px);
      }
      use:nth-child(even) {
        opacity: 0;
      }
      use:last-of-type {
        transform: rotate(-45deg) translate(-9px, 10px);
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  animation: fadeInZoom 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;

  .buttcoin {
    position: fixed;
    top: 0.875rem;
    left: 1.25rem;
    font-size: 1.5rem;
  }

  a {
    font-size: 1.75rem;
    padding: 0.5rem;
  }

  .nav-dropdown {
    position: relative;
    padding: 0;
    top: 0;

    &:hover {
      .user-nav-dropdown {
        animation: none;
      }
    }

    > a {
      justify-content: center;
      align-items: center;
      display: flex;

      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }

  .user-nav-dropdown {
    z-index: 3000;
    position: relative;
    top: 0;
    right: 0;
    background-color: transparent;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    opacity: 1;
    visibility: visible;
    border-bottom: var(--divider);
    padding-bottom: 2rem;
    margin-bottom: 2rem;

    a {
      font-size: 2rem;
    }

    &::after {
      content: "";
      display: none;
    }
  }
`;

const hamburgerIcon = (
  <svg
    width="20"
    height="15"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <use xlinkHref="#path0_fill_hamburger" fill="currentColor" />
    <use
      xlinkHref="#path0_fill_hamburger"
      transform="translate(0 6)"
      fill="currentColor"
    />
    <use
      xlinkHref="#path0_fill_hamburger"
      transform="translate(0 12)"
      fill="currentColor"
    />
    <defs>
      <path
        id="path0_fill_hamburger"
        d="M0 1.5A1.5 1.5 0 0 1 1.5 0h17a1.5 1.5 0 0 1 0 3h-17A1.5 1.5 0 0 1 0 1.5z"
      />
    </defs>
  </svg>
);
