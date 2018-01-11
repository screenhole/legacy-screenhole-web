import React, { Component } from 'react';
import styled from 'styled-components';

class Buttcoin extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Wrapper>
        <Coin src="./img/buttcoin-spin.gif" alt="Hold on to your $butt" />
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

const Coin = styled.img`
  height: 1.75rem;
`;
