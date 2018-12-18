import React, { Component, Fragment } from "react";
import Lottie from "react-lottie";
import { ActionCable } from "react-actioncable-provider";
import { Subscribe } from "unstated";
import styled from "styled-components";
import ReactPlayer from "react-player";
import NumberEasing from "che-react-number-easing";

import AuthContainer from "../../utils/AuthContainer";

import ButtcoinSpin from "../../animations/buttcoin/spin.json";
import ButtcoinToot from "../../animations/buttcoin/toot.json";
import * as cashRegisterSequence from "../../sounds/buttcoin-cash-register-sequence.mp3";

const animationSpin = {
  loop: true,
  autoplay: true,
  animationData: ButtcoinSpin,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const animationToot = {
  loop: false,
  autoplay: true,
  animationData: ButtcoinToot,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class Buttcoin extends Component {
  state = {
    playing: false,
    animationOptions: animationSpin,
  };
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Wrapper className="buttcoin">
            <ActionCable
              channel={{ channel: "ButtcoinsChannel" }}
              onReceived={data => {
                if (data.buttcoin.user.username !== this.props.username) return;

                auth.updateButtcoins(data.buttcoin.balance);
                this.setState({
                  playing: true,
                });

                // Now this below is some random magic numbers
                setTimeout(() => {
                  this.setState({
                    animationOptions: animationToot,
                  });
                }, 2500);

                setTimeout(() => {
                  this.setState({
                    animationOptions: animationSpin,
                  });
                }, 3200);
              }}
            />
            <Coin>
              <Lottie
                options={this.state.animationOptions}
                height={100}
                width={100}
              />
            </Coin>
            {this.props.amount && (
              <Fragment>
                <NumberEasing
                  value={this.props.amount}
                  ease="quintOut" // available options https://github.com/mattdesl/eases/blob/master/index.js
                  precision={0}
                  speed={5000}
                  useLocaleString={true}
                />
                {/* Sound needs to be preloaded manually */}
                <audio src={cashRegisterSequence} preload="preload" />
                <ReactPlayer
                  url={cashRegisterSequence}
                  width="0"
                  height="0"
                  playsInline
                  volume={1}
                  playing={this.state.playing}
                />
              </Fragment>
            )}
          </Wrapper>
        )}
      </Subscribe>
    );
  }
}

export default Buttcoin;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--buttcoin-color);
  font-family: "Menlo", monospace;
  position: relative;

  span {
    margin-left: 0.35rem;
  }

  audio {
    display: none;
  }
`;

const Coin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -25px;
  width: 80px;
  height: 30px;
  overflow: visible;
`;
