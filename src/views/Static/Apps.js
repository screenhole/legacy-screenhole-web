import React, { Component } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

export default class apps extends Component {
  render() {
    return (
      <Page>
        <section>
          <h1>Download the apps</h1>
          <p>Use our apps to post grabs to the ’hole.</p>
          <img className="download" src="/img/apps.png" alt="iPhone App" />
          <ul>
            <li className="links">
              <a
                href="http://appstore.com/screenhole"
                target="_blank"
                rel="noopener noreferrer"
              >
                iPhone
              </a>
            </li>
            <li className="links">
              <a
                href="https://rink.hockeyapp.net/apps/df7fde32da044e62980cfb683cb7d0b9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Macintosh
              </a>
            </li>
            <li className="beta-link">
              Feeling adventurous? Checkout our{" "}
              <a href="/beta" target="_blank" rel="noopener noreferrer">
                Beta
              </a>{" "}
              for Macintosh.
            </li>
          </ul>
        </section>
        <Helmet>
          {/* Drop meta tags in here */}
          <title>Download the apps!</title>
          <meta
            name="description"
            content="Use our apps to post grabs to Screenhole!"
          />
          <meta property="og:title" content="Download the apps!" />
          <meta property="og:url" content="https://screenhole.net/download" />
          <meta
            property="og:description"
            content="Use our apps to post grabs to Screenhole!"
          />
          {/* Make the url for this image absolute */}
          <meta
            property="og:image"
            content="https://screenhole.net/img/apps-og.png"
          />
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
  .beta-link {
    font-size: 100%;
  }
  li {
    margin-bottom: 1rem;
  }
`;
