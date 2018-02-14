import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import api from '../../utils/api';

import Avatar from '../../components/User/Avatar';
import Grab from '../../components/Grab/Grab';

class UserStream extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
      grabs: false,
    };
  }

  async componentWillMount() {
    const username = this.props.match.params.username;

    const user = await api.get(`/users/${username}`);

    if (user.ok) {
      this.setState({
        user: user.data.user,
      });

      const grabs = await api.get(`/users/${this.state.user.id}/grabs`);

      if (grabs.ok) {
        this.setState({
          grabs: grabs.data.grabs,
        });
      }
    }
  }

  onReceived = data => {
    if (data.grab.user.id !== this.state.user.id) return;

    this.setState({
      grabs: [data.grab, ...this.state.grabs],
    });
  };

  render() {
    return (
      <Wrapper>
        {this.state.user && (
          <ProfileHeader>
            <MetaTags
              username={this.state.user.username}
              name={this.state.user.name || this.state.user.username}
              gravatar_hash={this.state.user.gravatar_hash}
              bio={this.state.user.bio}
              grabs={this.state.user.stats.grabs}
            />
            <UserInfo>
              <Avatar
                username={this.state.user.username}
                gravatar={this.state.user.gravatar_hash}
                size={500}
              />
              <UserBio>
                <h1>{this.state.user.name}</h1>
                <h2>@{this.state.user.username}</h2>
                <p>{this.state.user.bio}</p>
                <Link to="/settings">Edit profile</Link>
              </UserBio>
            </UserInfo>
            <UserStats>
              <Number>{this.state.user.stats.grabs}</Number>
              <Label>Grabs</Label>
            </UserStats>
          </ProfileHeader>
        )}
        <GrabsWrapper>
          <ActionCable
            channel={{ channel: 'GrabsChannel' }}
            onReceived={this.onReceived}
          />
          {this.state.grabs
            ? this.state.grabs.map(grab => (
                <Grab
                  username={grab.user.username}
                  image={grab.image_public_url}
                  id={grab.id}
                  memos={grab.memos}
                  gravatar={grab.user.gravatar_hash}
                  key={grab.id}
                />
              ))
            : 'Searching for this Screenhooligan...'}
        </GrabsWrapper>
      </Wrapper>
    );
  }
}

export default UserStream;

const Wrapper = styled.div`
  margin: -1.25rem;
`;

const GrabsWrapper = styled.div`
  padding: 3rem;

  @media (max-width: 1120px) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--divider);
  padding: 2rem 3rem;
  position: relative;

  @media (max-width: 1120px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const UserInfo = styled.div`
  display: flex;

  a {
    flex-shrink: 0;
  }

  img {
    width: 6rem;
    height: 6rem;
  }

  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

const UserBio = styled.div`
  display: block;
  margin-left: 2rem;
  @media (max-width: 1120px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    color: var(--super-muted-color);
    margin-bottom: 1rem;
  }

  p {
    color: var(--muted-color);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  a {
    display: inline-block;
    margin-top: 1rem;
  }
`;

const UserStats = styled.div`
  text-align: center;

  @media (max-width: 1120px) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Number = styled.span`
  display: block;
  font-size: 3.5rem;
`;

const Label = styled.span`
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.25rem;
  color: var(--super-muted-color);
`;

class MetaTags extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="fragment" content="!" />
        <title>{this.props.name} on SCREENHOLE!</title>
        <meta name="description" content={this.props.bio} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta
          property="og:url"
          content={`https://screenhole.net/${this.props.username}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${this.props.name} on SCREENHOLE!`}
        />
        <meta
          property="og:image"
          content={`https://www.gravatar.com/avatar/${
            this.props.gravatar_hash
          }?size=500`}
        />
        <meta property="og:description" content={this.props.bio} />
        <meta property="og:site_name" content="Screenhole" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@screenhole" />
        <meta name="twitter:creator" content="@screenhole" />
        <meta
          name="twitter:url"
          content={`https://screenhole.net/${this.props.username}`}
        />
        <meta
          name="twitter:title"
          content={`${this.props.name} on SCREENHOLE!`}
        />
        <meta name="twitter:description" content={this.props.bio} />
        <meta
          name="twitter:image"
          content={`https://www.gravatar.com/avatar/${
            this.props.gravatar_hash
          }?size=500`}
        />
        <meta name="twitter:label1" value="Grabs" />
        <meta name="twitter:data1" value={this.props.grabs} />
      </Helmet>
    );
  }
}
