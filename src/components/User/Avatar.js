import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Avatar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Link to={`/${this.props.username}`}>
        <Image src={this.props.src} alt={this.props.username} />
      </Link>
    );
  }
}

export default Avatar;

const Image = styled.img`
  border-radius: 1000px;
  height: 2.25rem;
  display: block;
`;
