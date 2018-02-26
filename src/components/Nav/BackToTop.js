import React, { Component } from "react";
import styled from "styled-components";
import Headroom from "react-headroom";

export default class BackToTop extends Component {
  render() {
    return (
      <Wrapper {...this.props}>
        <Headroom disableInlineStyles pinStart={200}>
          <Button>
            <Arrow>{icon}</Arrow>
          </Button>
        </Headroom>
      </Wrapper>
    );
  }
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border-radius: 100%;
  border: none;
  outline: none;
  width: 2.5rem;
  height: 2.5rem;
  user-select: none;
  transition: 0.15s ease transform;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.35);
  cursor: pointer;
  @media (pointer: fine) {
    &:hover {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Arrow = styled.span`
  color: #fff;
  font-size: 1rem;
  line-height: 0;
`;

const Wrapper = styled.div`
  position: absolute;

  &:not(.ChommentStream--BackToTop) {
    .headroom {
      position: fixed;
      top: 0;
      right: var(--app-padding);
      z-index: 1;
      transition: 0.25s 0.05s ease-in-out transform;
    }
    .headroom--unfixed {
      position: fixed;
      top: 0;
      transform: translateY(0) scale(0);
    }
    .headroom--scrolled,
    .headroom--pinned,
    .headroom--unpinned {
      position: fixed;
      transform: translateY(calc(var(--nav-height) + 1rem)) scale(1);
    }
  }

  &.ChommentStream--BackToTop {
    .headroom,
    .headroom--scrolled,
    .headroom--pinned,
    .headroom--unpinned,
    .headroom--unfixed {
      position: fixed;
      bottom: calc(var(--nav-height) + 1rem);
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      transition: 0.25s 0.05s ease-in-out transform;
    }
  }
`;

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11">
    <path
      fill="#FFF"
      d="M.8 7.4a2 2 0 1 0 2.4 3.2L.8 7.4zM10 3l1.2-1.6L10 .5l-1.2.9L10 3zm6.8 7.6a2 2 0 1 0 2.4-3.2l-2.4 3.2zm-13.6 0l8-6-2.4-3.2-8 6 2.4 3.2zm5.6-6l8 6 2.4-3.2-8-6-2.4 3.2z"
    />
  </svg>
);
