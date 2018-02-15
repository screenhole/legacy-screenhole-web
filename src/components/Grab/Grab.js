import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';
import VoiceMemo from '../Memo/VoiceMemo';

import api from '../../utils/api';

class Grab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: api.authenticated,
      currentUser: api.currentUser,
    };
  }

  showMemoInstructions = () => {
    if (this.state.authenticated) {
      // TODO: make this a real API call
      alert('Call 1-810-420-8008 and enter 72195');
    } else {
      alert('Log in to leave a voice memo!');
    }
  };

  deleteGrab = async () => {
    if (!window.confirm('Are you sure you want to delete this grab?')) return;

    let res = await api.delete(`/grabs/${this.props.id}`);

    if (res.ok) {
      window.location = '/';
    } else {
      alert('Sorry, could not delete grab. Try again.');
    }
  };

  render() {
    return (
      <Wrapper>
        <UserInfo>
          <Avatar
            gravatar={this.props.gravatar}
            username={this.props.username}
          />
          <Link to={`/${this.props.username}`} className="grab-username">
            {this.props.username}
          </Link>

          <Button onClick={this.showMemoInstructions}>{memoIcon}</Button>
          {this.props.memos.length > 0 && (
            <Count>{this.props.memos.length}</Count>
          )}

          {this.props.showDelete &&
            this.state.authenticated &&
            this.props.username === this.state.currentUser.username && (
              <Button onClick={this.deleteGrab}>{deleteIcon}</Button>
            )}
        </UserInfo>
        <Link to={`/${this.props.username}/~${this.props.id}`}>
          <GrabImage
            src={this.props.image}
            alt={`${this.props.username}’s Grab on Screenhole`}
          />
        </Link>
        {this.props.showMemos &&
          this.props.memos.map(memo => {
            if (!memo.pending && memo.variant === 'voice') {
              return (
                <VoiceMemo
                  key={memo.id}
                  message={memo.message}
                  audio={memo.media_public_url}
                  username={memo.user.username}
                  gravatar={memo.user.gravatar_hash}
                />
              );
            }

            return false;
          })}
      </Wrapper>
    );
  }
}

export default Grab;

const Wrapper = styled.article`
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

const Button = styled.button`
  outline: 0;
  display: inline-block;
  background: none;
  border: none;
  transition: 0.2s ease all;
  cursor: pointer;
  position: relative;
  top: 1px;
  margin-left: 0.25rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Count = styled.span`
  color: var(--primary-color);
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

const deleteIcon = (
  <svg
    width="20"
    height="26"
    viewBox="0 0 20 26"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Canvas" transform="translate(-8132 4676)">
      <g id="trash">
        <g id="Vector">
          <use
            xlinkHref="#path0_fill_deleteIcon"
            transform="translate(8132 -4676)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8141.06 -4665.69)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8144.5 -4665.69)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8137.62 -4665.69)"
            fill="#3B3648"
          />
        </g>
      </g>
    </g>
    <defs>
      <path
        id="path0_fill_deleteIcon"
        d="M 12.5625 0L 7.4375 0C 6.40625 0 5.5625 0.811561 5.5625 1.80347L 5.5625 3.24624L 1.5625 3.24624C 0.6875 3.24624 0 3.90751 0 4.74913L 0 6.61272C 0 7.45434 0.6875 8.11561 1.5625 8.11561L 1.90625 8.11561L 1.90625 22.6936C 1.90625 24.5272 3.4375 26 5.34375 26L 14.625 26C 16.5312 26 18.0625 24.5272 18.0625 22.6936L 18.0625 8.11561L 18.4375 8.11561C 19.3125 8.11561 20 7.45434 20 6.61272L 20 4.74913C 20 3.90751 19.3125 3.24624 18.4375 3.24624L 14.4375 3.24624L 14.4375 1.80347C 14.4375 0.811561 13.5938 0 12.5625 0ZM 7.4375 1.80347L 12.5312 1.80347L 12.5312 3.24624L 7.4375 3.24624L 7.4375 1.80347ZM 16.1875 22.6936C 16.1875 23.5353 15.5 24.1965 14.625 24.1965L 5.34375 24.1965C 4.46875 24.1965 3.78125 23.5353 3.78125 22.6936L 3.78125 8.11561L 16.2188 8.11561L 16.1875 22.6936ZM 18.125 6.31214L 1.875 6.31214L 1.875 5.04971L 18.125 5.04971L 18.125 6.31214Z"
      />
      <path
        id="path1_fill_deleteIcon"
        d="M 0.9375 11.9931C 1.46875 11.9931 1.875 11.6023 1.875 11.0913L 1.875 0.901734C 1.875 0.390751 1.46875 -2.29323e-07 0.9375 -2.29323e-07C 0.40625 -2.29323e-07 0 0.390751 0 0.901734L 0 11.0913C 0 11.6023 0.40625 11.9931 0.9375 11.9931Z"
      />
    </defs>
  </svg>
);

const memoIcon = (
  <svg width="25" height="25" xmlnsXlink="http://www.w3.org/1999/xlink">
    <use xlinkHref="#path0_fill_memoIcon" fill="#6A40EE" />
    <use
      xlinkHref="#path1_fill_memoIcon"
      transform="translate(13.42 5.45)"
      fill="#6FDC7B"
    />
    <use
      xlinkHref="#path2_fill_memoIcon"
      transform="translate(13.46 .18)"
      fill="#6FDC7B"
    />
    <defs>
      <path
        id="path0_fill_memoIcon"
        d="M2.723.045C1.253.045.05 1.205.006 2.634-.04 4.42.184 6.205.585 7.946A22.365 22.365 0 0 0 22.149 25h.178a.837.837 0 0 0 .356-.09C23.975 24.733 25 23.66 25 22.323v-5.358a2.684 2.684 0 0 0-2.673-2.678h-3.565c-.623 0-.712.268-.801.402-.09.133-.179.223-.268.357-.178.268-.312.535-.49.848-.223.402-.356.58-.49.803-3.832-1.74-6.861-4.642-8.42-8.437a5.22 5.22 0 0 1 .49-.223c.356-.179.757-.313 1.069-.536.178-.09.356-.223.49-.402a1.16 1.16 0 0 0 .356-.848V2.679A2.684 2.684 0 0 0 8.025 0H2.723v.045zm0 1.785H8.07c.49 0 .89.402.89.893v3.304l-.044.044c-.178.134-.534.268-.89.447-.357.178-.714.312-1.026.49-.133.09-.311.18-.49.358a.834.834 0 0 0-.267.491c-.044.179 0 .402.09.625l-.045-.044c1.737 4.82 5.569 8.392 10.291 10.357a.896.896 0 0 0 .936-.134c.58-.536.847-1.161 1.203-1.786.134-.268.312-.536.401-.714h3.163c.49 0 .891.401.891.893v5.357a.895.895 0 0 1-.89.893c-9.669 0-17.778-6.697-19.96-15.715a17.603 17.603 0 0 1-.535-4.821c.044-.536.4-.938.935-.938zm16.574 14.063s0 .044-.089.09l.09-.09z"
      />
      <path
        id="path1_fill_memoIcon"
        d="M0 .893C0 .402.401 0 .891 0c.134 0 .267.045.356.045 2.184.937 3.966 2.678 4.857 4.91V5a.907.907 0 0 1-.49 1.16.904.904 0 0 1-1.159-.49C3.742 3.884 2.361 2.455.58 1.74A.916.916 0 0 1 0 .893z"
      />
      <path
        id="path2_fill_memoIcon"
        d="M.003.937A.845.845 0 0 1 .85 0h.178c5.347.848 9.58 5.09 10.381 10.446v.045c.09.447-.312.893-.757.982-.446.09-.936-.268-.98-.759A10.695 10.695 0 0 0 .76 1.786.867.867 0 0 1 .003.937z"
      />
    </defs>
  </svg>
);
