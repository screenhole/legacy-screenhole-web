import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Download extends Component {
  render() {
    return (
      <Page>
        <section>
          <h1>Download your portal to the hole</h1>
          <p>Get this app now.</p>
          <h2>No seriously</h2>
          <p>You should download it</p>
        </section>
      </Page>
    );
  }
}

const Page = styled.div`
  margin: 0 auto 50px auto;
  padding: 50px;
  @media (max-width: 790px) {
    padding: 0;
  }
  max-width: 1000px;
  section {
    color: #858090;
    line-height: 150%;
    & + section {
      margin-top: 100px;
    }
    h1 + h2 {
      margin-top: 3rem;
    }
    p + h2,
    p + h1 {
      margin-top: 5rem;
    }
    p {
      max-width: 640px;
      margin-top: 1.5rem;
    }
    code {
      display: inline-block;
      clear: both;
      background-color: rgba(255, 255, 255, 0.1);
      padding: 0.15em 0.25em;
    }
    a {
      color: $purple;
    }
  }
  img {
    display: block;
    max-width: 100%;
    border-radius: 5px;
  }
`;
