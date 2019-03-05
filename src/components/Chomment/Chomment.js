import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import styled from "styled-components";
import emojiRegex from "emoji-regex";

import Linkify from "react-linkify";
import Avatar from "../User/Avatar";

const maxAmountOfOnlyEmoji = /^[\W\S\D]{0,8}\W$/gu;

class Chomment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chommentClass: null,
    };
  }
  componentWillMount() {
    const catchEmoji = emojiRegex();
    let match;
    while ((match = catchEmoji.exec(this.props.message))) {
      if (this.props.message.match(maxAmountOfOnlyEmoji)) {
        this.setState({
          chommentClass: "BigEmojiChomment",
        });
      }
    }
  }
  render() {
    return (
      <Wrapper className={this.state.chommentClass}>
        <InnerChomment>
          <Avatar
            gravatar={this.props.gravatar}
            username={this.props.username}
            variant={this.props.variant}
          />
          <Content>
            <Username>
              {this.props.countryCode && (
                <CountryEmoji>{this.props.countryEmoji}</CountryEmoji>
              )}
              <Link to={`/${this.props.username}`}>{this.props.username}</Link>
            </Username>
            {this.props.variant === "generic" && (
              <Message className="ChommentMessage">
                <Linkify properties={{target: '_blank' }}>{this.props.message}</Linkify>
              </Message>
            )}
            {this.props.variant === "voice_memo" && this.props.reference && (
              <Link to={`/grab/~${this.props.reference.id}`}>
                <Message className="voice-memo-link">
                  {this.props.message}
                </Message>
              </Link>
            )}
          </Content>
        </InnerChomment>
        <TimeAgo date={this.props.created_at} />
      </Wrapper>
    );
  }
}

export default Chomment;

const Wrapper = styled.div`
  display: block;
  margin: var(--app-padding) 0;

  &.BigEmojiChomment {
    .ChommentMessage {
      font-size: 2rem;
    }
  }

  time {
    font-size: 0.75rem;
    color: var(--super-muted-color);
    padding-left: 2.75rem;
  }
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
    color: var(--primary-color);
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
    color: var(--primary-color);
    display: inline;
    transition: 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;

    &:hover {
      border-bottom: var(--divider-width) solid var(--primary-color);
      transform: scale(1.05);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const CountryEmoji = styled.span`
  float: right;
  opacity: 0.75;
`;

const UsernameTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  time {
    font-size: 0.75rem;
    color: var(--super-muted-color);
  }
`;
