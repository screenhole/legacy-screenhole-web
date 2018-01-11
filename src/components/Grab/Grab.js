import React, { Component } from 'react';
import styled from 'styled-components';

class Grab extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <article>
        <h1>{this.props.username}</h1>
        <img
          src={this.props.grab_url}
          alt={`${this.props.username}’ Grab on Screenhole`}
        />
      </article>
    );
  }
}

export default Grab;
