import React, { Component } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import * as MrHoleIdle from '../../animations/mr-hole/idle.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: MrHoleIdle,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

class MrHole extends Component {
  render() {
    return (
      <HoleBoye>
        <Lottie options={defaultOptions} height={200} width={200} />
      </HoleBoye>
    );
  }
}

export default MrHole;

const HoleBoye = styled.div`
  position: fixed;
  bottom: -3rem;
  right: -3.15rem;
  z-index: 9999;
  pointer-events: none;
  touch-action: none;
`;
