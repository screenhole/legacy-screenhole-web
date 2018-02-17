import React, { Component } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import * as MrHoleInvite from '../../animations/mr-hole/spit.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: MrHoleInvite,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default class Invite extends Component {
  render() {
    return (
      <div>
        <h1>Throw your buds in the hole</h1>
        <Animation>
          <Lottie options={defaultOptions} height={500} width={500} />
        </Animation>
      </div>
    );
  }
}

const Animation = styled.div`
  position: fixed;
  right: 369px;
  top: -40px;
  z-index: 999999;
`;
