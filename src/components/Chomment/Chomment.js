import React, { Component } from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import styled from "styled-components";
import emojiRegex from "emoji-regex";
import getUrls from "get-urls";

import Avatar from "../User/Avatar";

const maxAmountOfOnlyEmoji = /^[\W\S\D]{0,8}\W$/gu;

class Chomment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chommentClass: null,
      includedLink: false,
      linkMeta: {},
    };
  }
  componentWillMount() {
    const catchEmoji = emojiRegex();
    let emojiMatch;

    while ((emojiMatch = catchEmoji.exec(this.props.message))) {
      if (this.props.message.match(maxAmountOfOnlyEmoji)) {
        this.setState({
          chommentClass: "BigEmojiChomment",
        });
      }
    }
  }
  componentDidMount() {
    let linkMatch = getUrls(this.props.message); // returns a Set (ES6)
    let matchedUrl = linkMatch.values().next().value;

    if (matchedUrl) {
      fetch(`https://screenhole-svc-og.now.sh/?url=${matchedUrl}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            includedLink: true,
            linkMeta: data,
          });
        });
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
              <Link to={`/${this.props.username}`}>{this.props.username}</Link>
            </Username>
            {this.props.variant === "generic" && (
              <Message className="ChommentMessage">
                <Linkify properties={{ target: "_blank" }}>
                  {this.props.message}
                </Linkify>
              </Message>
            )}
            {this.props.variant === "voice_memo" &&
              this.props.reference && (
                <Link to={`/grab/~${this.props.reference.id}`}>
                  <Message className="voice-memo-link">
                    {this.props.message}
                  </Message>
                </Link>
              )}
            {this.state.includedLink &&
              this.state.linkMeta.image && (
                <ExpandedLink href={this.state.linkMeta.url} target="_blank">
                  {this.state.linkMeta.image && (
                    <img
                      src={this.state.linkMeta.image}
                      alt={this.state.linkMeta.title}
                      className="chomment-rich-img"
                    />
                  )}

                  <span className="chomment-rich-title">
                    {this.state.linkMeta.logo && (
                      <img src={this.state.linkMeta.logo} />
                    )}
                    {this.state.linkMeta.title}
                  </span>
                </ExpandedLink>
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
  margin: var(--app-padding) 0;

  &.BigEmojiChomment {
    .ChommentMessage {
      font-size: 2rem;
    }
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

const ExpandedLink = styled.a`
  position: relative;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background-color: #121212;
  margin-top: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0 3px var(--primary-color);
  transition: 0.15s ease all;

  &::before {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.25) 120%
    );
    z-index: 2;
  }

  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 0 3px var(--secondary-color);
  }

  .chomment-rich-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }

  .chomment-rich-title {
    color: #fff;
    font-weight: 700;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0.5rem;
    z-index: 3;
    display: flex;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      margin-right: 0.5rem;
      border-radius: 5px;
    }
  }
`;
