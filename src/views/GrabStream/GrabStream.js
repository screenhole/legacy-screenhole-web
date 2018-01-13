import React, { Component } from 'react';
import styled from 'styled-components';

import Grab from './../../components/Grab/Grab';

class GrabStream extends Component {
  constructor() {
    super();

    this.state = {
      grabs: []
    };
  }
  componentWillMount() {
    if (!window.localStorage.grabs) {
      fetch(`https://api.screenhole.net/grabs?page=1`)
        .then(res => res.json())
        .then(res => {
          window.localStorage.setItem('grabs', JSON.stringify(res.grabs));
        })
        .catch();
    }
  }
  componentDidMount() {
    if (window.localStorage.grabs) {
      this.setState({
        grabs: JSON.parse(window.localStorage.grabs)
      });
    }
  }
  render() {
    return (
      <Grabs>
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
