import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Grab from './../../components/Grab/Grab';

function getNewGrabs() {
  fetch(`https://api.screenhole.net/grabs?page=1`)
    .then(res => res.json())
    .then(res => {
      window.localStorage.setItem('grabs', JSON.stringify(res.grabs));
    })
    .catch();
}

class GrabStream extends Component {
  constructor() {
    super();

    this.state = {
      grabs: [],
      firstLoad: true
    };
  }
  componentWillMount() {
    if (!window.localStorage.grabs) {
      getNewGrabs();
    }
  }
  componentWillReceiveProps(nextProps) {
    var routeChanged = nextProps.location !== this.props.location;
    this.setState({ firstLoad: routeChanged });
  }
  componentDidMount() {
    if (window.localStorage.grabs) {
      this.setState({
        grabs: JSON.parse(window.localStorage.grabs)
      });
    }
  }
  componentWillUnmount() {
    getNewGrabs();
  }
  render() {
    return (
      <Grabs>
        <MetaTags />
        {this.state.grabs
          ? this.state.grabs.map(grab => (
              <Grab
                username={grab.user.username}
                image={grab.image_public_url}
                id={grab.id}
                gravatar={grab.user.gravatar_hash}
                key={grab.id}
              />
            ))
          : 'Loading...'}
      </Grabs>
    );
  }
}

export default GrabStream;

const Grabs = styled.div`
  display: block;
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
        <title>SCREENHOLE!</title>
        <meta name="description" content="Cram your stuff in my hole!" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:url" content="https://screenhole.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SCREENHOLE!" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="Cram your stuff in my hole!" />
        <meta property="og:site_name" content="Screenhole" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@screenhole" />
        <meta name="twitter:creator" content="@screenhole" />
        <meta name="twitter:url" content="https://screenhole.net/" />
        <meta name="twitter:title" content="SCREENHOLE!" />
        <meta
          name="twitter:description"
          content="Cram your stuff in my hole!"
        />
        <meta name="twitter:image" content="" />
      </Helmet>
    );
  }
}
