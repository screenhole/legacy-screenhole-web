import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import Avatar from '../User/Avatar';

class VoiceMemo extends Component {
  constructor() {
    super();

    this.state = {
      playing: false
    };
  }
  controlPlayback() {
    this.setState({
      playing: !this.state.playing
    });
  }
  render() {
    const playingTheme = this.state.playing ? 'playing' : 'paused';
    return (
      <Wrapper>
        <Avatar
          gravatar={this.props.gravatar}
          username={this.props.username}
        />
        <MemoBlock theme={playingTheme}>
          <div>
            <Link to={`/${this.props.username}`}>
              <Username>{this.props.username}:</Username>
            </Link>
            <Message>{this.props.message}</Message>
          </div>
          <AudioPlayer>
            <PlayerControls
              onClick={this.controlPlayback.bind(this)}
              theme={playingTheme}
            >
              {this.state.playing ? pauseIcon : playIcon}
            </PlayerControls>

            {/* This player is hidden. It’s controlled by the button above. */}
            <ReactPlayer
              url={this.props.audio}
              width="0"
              height="0"
              playsInline
              volume={1}
              playing={this.state.playing}
              onEnded={this.controlPlayback.bind(this)}
            />
          </AudioPlayer>
        </MemoBlock>
      </Wrapper>
    );
  }
}

export default VoiceMemo;

const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;

  > a {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
`;

const MemoBlock = styled.div`
  background-color: ${props =>
    props.theme === 'playing'
      ? 'var(--secondary-color)'
      : 'var(--primary-color)'};
  border-radius: 2.125rem;
  padding: 1rem 1.125rem;
  padding-right: 4rem;
  font-size: 1.125rem;
  line-height: 1.35;
  max-width: 50rem;
  display: flex;
  position: relative;
  transition: 0.25s ease all;
`;

const Username = styled.span`
  color: var(--body-bg-color);
  display: inline;
  margin-right: 0.5em;
`;

const Message = styled.p`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  display: inline;
`;

const AudioPlayer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
`;

const PlayerControls = styled.button`
  border: none;
  outline: none;
  color: ${props =>
    props.theme === 'playing' ? '#fff' : 'var(--body-bg-color)'};
  background-color: ${props =>
    props.theme === 'playing'
      ? 'var(--body-bg-color)'
      : 'var(--secondary-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 100%;
  transition: 0.17s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const playIcon = (
  <svg
    width="12"
    height="14"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <use
      xlinkHref="#play-icon"
      transform="rotate(90 6.375 6.375)"
      fill="currentColor"
    />
    <defs>
      <path
        id="play-icon"
        d="M6.495 1.5a1 1 0 0 1 1.732 0l5.63 9.75a1 1 0 0 1-.867 1.5H1.732a1 1 0 0 1-.866-1.5l5.63-9.75z"
      />
    </defs>
  </svg>
);

const pauseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15">
    <path
      d="M0 2a2 2 0 0 1 4 0v11a2 2 0 1 1-4 0V2zm8 0a2 2 0 0 1 4 0v11a2 2 0 1 1-4 0V2z"
      fill="currentColor"
    />
  </svg>
);
