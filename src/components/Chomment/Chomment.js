import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';

class Chomment extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Wrapper>
        <InnerChomment>
          <Avatar
            src={`https://www.gravatar.com/avatar/${this.props.gravatar}`}
            username={this.props.username}
          />
          <Content>
            <Link to={`/${this.props.username}`}>{this.props.username}</Link>
            <Message>{this.props.message}</Message>
          </Content>
        </InnerChomment>
      </Wrapper>
    );
  }
}

export default Chomment;

const Wrapper = styled.div`
  display: block;
  margin: calc(var(--app-padding) / 2) 0;
`;

const InnerChomment = styled.div`
  display: flex;

  img {
    background-color: var(--muted-color);
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
  }

  a {
    flex-shrink: 0;
  }
`;

const Message = styled.p`
  color: var(--muted-color);
  line-height: 1.45;
  font-size: 0.925rem;
  word-break: break-word;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: var(--link-color);
    display: inline-block;
    align-self: flex-start;
    border-bottom: 1px solid transparent;
    margin-bottom: 0.15em;

    &:hover {
      color: #fff;
      border-bottom: 1px solid var(--primary-color);
    }
  }
`;
