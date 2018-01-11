import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Grab from '../../components/Grab/Grab';

class GrabSingle extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <article>
        <MetaTags
          username="pasquale"
          grab_id="123"
          grab_url="https://pbs.twimg.com/profile_images/757821676977397760/4VX6_NlV_400x400.jpg"
        />
        <Grab
          grab_url="https://pbs.twimg.com/profile_images/757821676977397760/4VX6_NlV_400x400.jpg"
          username="pasquale"
        />
      </article>
    );
  }
}

export default GrabSingle;

class MetaTags extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="fragment" content="!" />
        <title>{this.props.username}’s Grab on SCREENHOLE!</title>
        <meta
          name="description"
          content={`Check out this cool Grab from ${this.props.username}.`}
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:url" content={this.props.grab_url} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${this.props.username}’s Grab on SCREENHOLE!`}
        />
        <meta property="og:image" content={this.props.grab_url} />
        <meta
          property="og:description"
          content={`Check out this cool Grab from ${this.props.username}.`}
        />
        <meta property="og:site_name" content="Screenhole" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@screenhole" />
        <meta name="twitter:creator" content="@screenhole" />
        <meta
          name="twitter:url"
          content={`https://screenhole.net/grab/${this.props.grab_id}`}
        />
        <meta
          name="twitter:title"
          content={`${this.props.username}’s Grab on SCREENHOLE!`}
        />
        <meta
          name="twitter:description"
          content={`Check out this cool Grab from ${this.props.username}.`}
        />
        <meta name="twitter:image" content={this.props.grab_url} />
      </Helmet>
    );
  }
}
