import React, { Component } from 'react';
import styled from 'styled-components';

import Chomment from '../../components/Chomment/Chomment';

class ChommentStream extends Component {
  constructor() {
    super();

    this.state = {
      chomments: false
    };
  }
  componentWillMount() {
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
          : 'Stacking up them Chomments...'}
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
  padding-top: 2rem;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overscroll-behavior: contain;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left 20%,
    left top,
    from(#000),
    to(rgba(0, 0, 0, 0))
  );

  ::-webkit-scrollbar {
    display: none;
  }
`;
