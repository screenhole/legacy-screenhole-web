import React, { Component } from 'react';
import styled from 'styled-components';

import Chomment from '../../components/Chomment/Chomment';

class ChommentStream extends Component {
  constructor() {
    super();

    this.state = {
      chomments: []
    };
  }
  componentDidMount() {
    fetch(`https://api.screenhole.net/chomments?page=1`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          chomments: res.chomments
        });
      })
      .catch();
  }
  render() {
    return (
      <Chomments>
        {this.state.chomments
          ? this.state.chomments.map(chomment => (
              <Chomment
                username={chomment.user.username}
                message={chomment.message}
                gravatar={chomment.user.gravatar_hash}
                key={chomment.id}
              />
            ))
          : 'Loading...'}
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
