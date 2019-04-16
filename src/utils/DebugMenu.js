import React, { Component } from "react";
import styled from "styled-components";

export default class DebugMenu extends Component {
  clearGrabCache = () => {
    localStorage.removeItem("grabs");
  };

  render() {
    return (
      <Menu>
        <h1>DEBUG</h1>
        <br />
        <button onClick={this.clearGrabCache}>Clear grab cache</button>
      </Menu>
    );
  }
}

const Menu = styled.div`
  position: fixed;
  top: 120px;
  right: 64px;
  background-color: var(--buttcoin-color);
  color: black;
  border-radius: 8px;
  padding: 1rem;
  z-index: 9999999;
  box-shadow: 0 5px 20px 0 var(--buttcoin-color);

  h1 {
    font-size: 0.875rem;
    color: black;
  }
`;
