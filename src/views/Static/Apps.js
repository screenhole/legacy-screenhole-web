import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

export default class apps extends Component {
  render() {
    return (
      <Page>
        <section>
          <h1>Download the apps</h1>
          <p>Use our apps to post grabs to the ’hole.</p>
          <img class="download" src="/img/apps.png" alt="iPhone App" />
          <p class="links">
            <a href="http://appstore.com/screenhole" target="_blank">
              iPhone
            </a>{" "}
            /{" "}
            <a
              href="https://rink.hockeyapp.net/apps/df7fde32da044e62980cfb683cb7d0b9"
              target="_blank"
            >
              Macintosh
            </a>
          </p>
        </section>
        <Helmet>
          {/* Drop meta tags in here */}
          <title>Download the apps!</title>
          <meta name="description" content="<description of this page>" />
          <meta property="og:title" content="Download the apps!" />
          <meta property="og:url" content="https://screenhole.net/download" />
          <meta
            property="og:description"
            content="<description of this page>"
          />
          {/* Make the url for this image absolute */}
          <meta property="og:image" content="<url for the image>" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@screenhole" />
          <meta name="twitter:creator" content="@screenhole" />
        </Helmet>
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
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & + section {
      margin-top: 100px;
    }
    h1 {
      margin-top: 5vh;
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
      text-align: center;
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

  .download {
    width: 50%;
    margin-top: 100px;
  }
  .links {
    font-size: 200%;
  }
`;
