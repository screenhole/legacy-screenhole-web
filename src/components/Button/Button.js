import React, { Component } from "react";
import styled from "styled-components";

export default class Button extends Component {
  constructor() {
    super();
  }
  render() {
    return <ButtonStyle {...this.props}>{this.props.children}</ButtonStyle>;
  }
}

const ButtonStyle = styled.button`
  background: linear-gradient(HSLA(255, 83%, 58%, 1), HSLA(255, 83%, 48%, 1));
  box-shadow: inset 0 1px 0 0 HSLA(255, 83%, 65%, 1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: 0.25s ease all, 0.15s ease box-shadow;
  position: relative;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (pointer: fine) {
    &:hover,
    &:focus {
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
