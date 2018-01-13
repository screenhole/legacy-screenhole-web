import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';

class Grab extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Wrapper>
        <UserInfo>
          <Avatar
            src={`https://www.gravatar.com/avatar/${this.props.gravatar}`}
            username={this.props.username}
          />
          <Link to={`/${this.props.username}`} className="grab-username">
            {this.props.username}
          </Link>
        </UserInfo>
        <Link to={`/${this.props.username}/~${this.props.id}`}>
          <GrabImage
            src={this.props.image}
            alt={`${this.props.username}’s Grab on Screenhole`}
          />
        </Link>
      </Wrapper>
    );
  }
}

export default Grab;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  .grab-username {
    padding: 5px 10px;
    border-radius: 100px;
    border: 2px solid #3c3548;
    display: inline-block;
    margin-left: 0.5rem;
    color: #fff;
    transition: all 0.2s ease;

    &:hover {
      border-color: #fff;
    }
  }
`;

const GrabImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
  transition: all 0.1s ease;
  max-height: 80vh;
  border: 1px solid hsla(0, 0%, 100%, 0.1);

  &:hover {
    box-shadow: 0 0 0 5px var(--primary-color);
  }
`;
