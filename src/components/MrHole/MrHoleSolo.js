import React, { Component } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";

import MrHoleIdle from "../../animations/mr-hole/idle.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: MrHoleIdle,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default class MrHoleSolo extends Component {
  render() {
    return (
      <HoleBoye onClick={this.hideDatBoi}>
        <Lottie options={defaultOptions} height={200} width={200} />
      </HoleBoye>
    );
  }
}

const HoleBoye = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
