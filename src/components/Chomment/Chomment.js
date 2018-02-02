import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import styled from 'styled-components';

import Avatar from '../User/Avatar';

class Chomment extends Component {
  render() {
    return (
      <Wrapper>
        <InnerChomment>
          <Avatar
            src={`https://www.gravatar.com/avatar/${this.props.gravatar}`}
            username={this.props.username}
            variant={this.props.variant}
          />
          <Content>
            <Username>
              <Link to={`/${this.props.username}`}>{this.props.username}</Link>
            </Username>
            {this.props.variant === 'generic' && (
              <Message>
                <Linkify properties={{ target: '_blank' }}>
                  {this.props.message}
                </Linkify>
              </Message>
            )}
            {this.props.variant === 'voice_memo' && (
              <Link to={`/grab/~${this.props.reference.id}`}>
                <Message className="voice-memo-link">
                  {this.props.message}
                </Message>
              </Link>
            )}
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

  .user-avatar {
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

  a {
    display: inline-flex;
    align-items: center;
    outline: 0;
    color: var(--secondary-color);
    transition: 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;
  }

  a:hover {
    transform: scale(1.05);
  }

  a:active {
    transform: scale(0.98);
  }

  a:visited {
    color: var(--primary-color);
  }

  &.voice-memo-link {
    color: var(--link-color);
    display: inline;

    &:hover {
      border-bottom: var(--divider-width) solid var(--primary-color);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
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
