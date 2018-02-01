import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Avatar from '../../components/User/Avatar';
import Grab from '../../components/Grab/Grab';

class UserStream extends Component {
  constructor() {
    super();

    this.state = {
      profile: false,
      grabs: false
    };
  }
  getGrabs(user_id) {
    fetch(`https://api.screenhole.net/users/${user_id}/grabs?page=1`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          grabs: res.grabs
        });
      })
      .catch();
  }
  componentDidMount() {
    const username = this.props.match.params.username;

    fetch(`https://api.screenhole.net/users/${username}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          profile: res.user
        });

        this.getGrabs(res.user.id);
      })
      .catch();
  }
  render() {
    return (
      <Wrapper>
        {this.state.profile && (
          <ProfileHeader>
            <MetaTags
              username={this.state.profile.username}
              name={this.state.profile.name || this.state.profile.username}
              gravatar_hash={this.state.profile.gravatar_hash}
              bio={this.state.profile.bio}
              grabs={this.state.profile.stats.grabs}
            />
            <UserInfo>
              <Avatar
                username={this.state.profile.username}
                src={`https://www.gravatar.com/avatar/${
                  this.state.profile.gravatar_hash
                }?size=500`}
              />
              <UserBio>
                <h1>{this.state.profile.name}</h1>
                <h2>@{this.state.profile.username}</h2>
                <p>{this.state.profile.bio}</p>
                <Link to="/settings">Edit profile</Link>
              </UserBio>
            </UserInfo>
            <UserStats>
              <Number>{this.state.profile.stats.grabs}</Number>
              <Label>Grabs</Label>
            </UserStats>
          </ProfileHeader>
        )}
        <GrabsWrapper>
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
            : 'Loading Grabs...'}
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
  constructor() {
    super();
  }
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
