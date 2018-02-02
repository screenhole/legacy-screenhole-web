import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import phone from './icon-phone-chomment.svg';

class Avatar extends Component {
  render() {
    return (
      <Link to={`/${this.props.username}`}>
        <Image
          src={this.props.src}
          alt={this.props.username}
          className="user-avatar"
        />
        {this.props.variant === 'voice_memo' && (
          <PhoneIcon>
            <Icon src={phone} />
          </PhoneIcon>
        )}
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

const PhoneIcon = styled.span`
  position: absolute;
  background-color: var(--primary-color);
  border-radius: 100%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transform: translateY(-65%) translateX(-25%);
  box-shadow: 0 0 0 3px var(--body-bg-color);
  pointer-events: none;
  outline: none;
`;

const Icon = styled.img`
  background-color: transparent !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
`;
