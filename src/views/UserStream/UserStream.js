import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ActionCable } from "react-actioncable-provider";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";

import api from "../../utils/api";

import Avatar from "../../components/User/Avatar";
import Grab from "../../components/Grab/Grab";

import loader from "../../images/loader.gif";

class UserStream extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: api.authenticated,
      currentUser: api.currentUser,

      hasMore: false, // wait for async componentWillMount
      user: null,
      grabs: [],
    };
  }

  async componentWillMount() {
    const user = await api.get(`/users/${this.props.match.params.username}`);

    if (user.ok) {
      this.setState({
        hasMore: true,
        user: user.data.user,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      // clear instantly, so its responsive
      this.setState({
        hasMore: false,
        user: null,
        grabs: [],
      });

      // hard reload, since the InfiniteScroll current page doesn't reset
      window.location.pathname = `/${nextProps.match.params.username}`;
    }
  }

  loadMore = async page => {
    let res = await api.get(`/users/${this.state.user.id}/grabs?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      grabs: [...this.state.grabs, ...res.data.grabs],
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    if (data.grab.user.id !== this.state.user.id) return;

    this.setState({
      grabs: [data.grab, ...this.state.grabs],
    });
  };

  render() {
    let grabs = [];

    this.state.grabs.map((grab, i) =>
      grabs.push(
        <Grab
          username={grab.user.username}
          image={grab.image_public_url}
          id={grab.id}
          memos={grab.memos}
          gravatar={grab.user.gravatar_hash}
          media_type={grab.media_type}
          created_at={grab.created_at}
          key={i}
        />,
      ),
    );

    return (
      <Wrapper>
        {this.state.user && (
          <>
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

                  {this.state.currentUser &&
                    this.state.user.id === this.state.currentUser.id && (
                      <Link to="/settings">Edit profile</Link>
                    )}
                </UserBio>
              </UserInfo>
              <UserStats>
                <Number>{this.state.user.stats.grabs}</Number>
                <Label>Grabs</Label>
              </UserStats>
            </ProfileHeader>
            {this.state.user.badges.length > 0 && (
              <BadgeCarousel>
                {this.state.user.badges.map(b => (
                  <Badge>{b.id.replace(/_/g, " ")}</Badge>
                ))}
              </BadgeCarousel>
            )}
          </>
        )}
        <GrabsWrapper>
          <ActionCable
            channel={{ channel: "GrabsChannel" }}
            onReceived={this.onReceived}
          />
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={
              <div className="loader" key="loader">
                <img src={loader} alt="loading..." />
              </div>
            }
          >
            {grabs}
          </InfiniteScroll>
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

const BadgeCarousel = styled.marquee`
  padding: 1rem 3rem;
  border-bottom: var(--divider);
`;

const Badge = styled.span`
  display: inline-block;
  margin: 0 2rem;
  background-color: HSLA(250, 77%, 59%, 1.00);
  color: white;
  letter-spacing: .05em;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-transform: uppercase;

  &:nth-child(2) {
    background-color: HSLA(147, 96%, 54%, 1.00);
    color: #004a22;
  }

  &:nth-child(3) {
    background-color: #ef1062;
  }

  &:nth-child(5) {
    background-color: HSLA(147, 100%, 15%, 1.00);
    color: #17ff81;
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
