import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Grab from '../../components/Grab/Grab';

class GrabSingle extends Component {
  constructor(props) {
    super(props);

    const grab_id = this.props.match.params.id;

    this.state = {
      currentGrab: grab_id.substr(1) // removes "~"
    };
  }
  componentWillMount() {
    fetch(`https://api.screenhole.net/grabs/${this.state.currentGrab}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          grab: res.grab
        });
      })
      .catch();
  }
  render() {
    return (
      <article>
        {this.state.grab ? (
          <span>
            <MetaTags
              username={this.state.grab.user.username}
              grab_id={this.state.grab.id}
              grab_image_url={this.state.grab.image_public_url}
            />
            <Grab
              username={this.state.grab.user.username}
              image={this.state.grab.image_public_url}
              id={this.state.grab.id}
              gravatar={this.state.grab.user.gravatar_hash}
              key={this.state.grab.id}
            />
          </span>
        ) : (
          'Loading...'
        )}
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
        <meta property="og:url" content={this.props.grab_image_url} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${this.props.username}’s Grab on SCREENHOLE!`}
        />
        <meta property="og:image" content={this.props.grab_image_url} />
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
          content={`https://screenhole.net/${this.props.username}/${
            this.props.grab_id
          }`}
        />
        <meta
          name="twitter:title"
          content={`${this.props.username}’s Grab on SCREENHOLE!`}
        />
        <meta
          name="twitter:description"
          content={`Check out this cool Grab from ${this.props.username}.`}
        />
        <meta name="twitter:image" content={this.props.grab_image_url} />
      </Helmet>
    );
  }
}
