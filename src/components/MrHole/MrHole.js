import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Subscribe } from "unstated";
import Lottie from "react-lottie";
import styled from "styled-components";

import AuthContainer from "../../utils/AuthContainer";

import MrHoleIdle from "../../animations/mr-hole/idle.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: MrHoleIdle,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const messages = [
  { text: "psst, wanna invite someone to screenhole?", url: "/invite" },
  { text: "you’re awesome", url: "/" },
  { text: "hope you're having a great day", url: "/" },
  { text: "let’s see what’s on your screen, COWARD", url: "/" },
  { text: "welcome to my hole", url: "/" },
  { text: "click here if you have questions", url: "/wtf" },
];

class MrHole extends Component {
  state = {
    visible: true,
    message: Math.floor(Math.random() * messages.length),
  };

  goToLink = url => {
    this.props.history.push(url);
  };

  hideDatBoi = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        message: Math.floor(Math.random() * messages.length),
      });
    }, 20000);
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <span>
            {this.state.visible && (
              <HoleBoye onClick={this.hideDatBoi}>
                <Lottie options={defaultOptions} height={200} width={200} />
                <TalkBubble
                  onClick={() =>
                    this.goToLink(messages[this.state.message].url)
                  }
                >
                  {messages[this.state.message].text}
                </TalkBubble>
              </HoleBoye>
            )}
          </span>
        )}
      </Subscribe>
    );
  }
}

export default withRouter(MrHole);

const HoleBoye = styled.div`
  position: fixed;
  bottom: -3rem;
  right: -3.15rem;
  z-index: 9999;
`;

const TalkBubble = styled.div`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background-color: var(--primary-color);
  color: #fff;
  font-size: 1rem;
  padding: 1rem;
  max-width: 15rem;
  border-radius: 3px;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.25);

  &::before {
    content: "";
    width: 1rem;
    height: 0.75rem;
    background: var(--primary-color);
    -webkit-clip-path: polygon(0 0, 100% 98%, 100% 0);
    clip-path: polygon(0 0, 100% 98%, 100% 0);
    position: absolute;
    bottom: -0.75rem;
    right: 1rem;
  }
`;
