import React, { Component } from 'react';
import styled from 'styled-components';

class Avatar extends Component {
  constructor() {
    super();
  }
  render() {
    return <Image src={this.props.src} alt={this.props.username} />;
  }
}

export default Avatar;

const Image = styled.img`
  border-radius: 1000px;
  height: 2.25rem;
`;
