import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import Linkify from "react-linkify";
import styled from "styled-components";
import emojiRegex from "emoji-regex";

import Memo from "../Memo/Memo";

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
        {this.props.variant === "generic" && (
          <Memo
            message={this.props.message}
            username={this.props.username}
            gravatar={this.props.gravatar}
            created_at={this.props.created_at}
            variant="chomment"
          />
        )}
        {this.props.variant === "voice_memo" && (
          <Memo
            message={this.props.message}
            username={this.props.username}
            gravatar={this.props.gravatar}
            created_at={this.props.created_at}
            variant="voice"
          />
        )}
      </Wrapper>
    );
  }
}

export default Chomment;

const Wrapper = styled.div`
  display: block;
  ${"" /* margin: var(--app-padding) 0; */} &.BigEmojiChomment {
    .memo-message {
      font-size: 2rem;
    }
  }

  .user-avatar {
    width: 1.75rem;
    height: 1.75rem;
  }

  .memo-message {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.25;
  }
`;
