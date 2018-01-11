import React, { Component } from 'react';
import styled from 'styled-components';

import Chomment from '../../components/Chomment/Chomment';

class ChommentStream extends Component {
  render() {
    return (
      <Chomments>
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
        <Chomment />
      </Chomments>
    );
  }
}

export default ChommentStream;

const Chomments = styled.aside`
  position: fixed;
  left: 0;
  top: var(--nav-height);
  height: calc(100% - var(--nav-height));
  width: 100%;
  max-width: var(--sidebar-width);
  border-right: var(--divider);
  padding: var(--app-padding);
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;
