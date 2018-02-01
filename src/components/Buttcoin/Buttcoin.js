import React, { Component } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import * as ButtcoinSpin from '../../animations/buttcoin/spin.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ButtcoinSpin,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

class Buttcoin extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Wrapper>
        <Coin>
          <Lottie options={defaultOptions} height={100} width={100} />
        </Coin>
        {this.props.amount && <span>{this.props.amount}</span>}
      </Wrapper>
    );
  }
}

export default Buttcoin;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--buttcoin-color);

  span {
    margin-left: 0.35rem;
  }
`;

const Coin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  overflow: hidden;
`
