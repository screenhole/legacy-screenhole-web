import React from "react";
import styled from "styled-components";

import Buttcoin from "../../components/Buttcoin/Buttcoin";

const Code = () => (
  <Page>
    <h1>Get your hands deep in the Hole.</h1>
    <p>
      Screenhole is a family affair. Know how to code? Jump into our repos and
      make some cool stuff. If your PR gets merged we will give you{" "}
      <span>
        <Buttcoin /> 100,000 buttcoin
      </span>
      .
    </p>
    <Grid>
      <Repo
        href="https://github.com/yothinko/screenhole-issues/issues"
        target="_blank"
      >
        <Title>screenhole/issues</Title>
        <Info>
          Monorepo for collecting all bugs and feature requests. Most span
          multiple repos.
        </Info>
        <Stack>GitHub</Stack>
      </Repo>
      <Repo href="https://github.com/jake/screenhole-web" target="_blank">
        <Title>screenhole-web</Title>
        <Info>
          This is the website that you’re on. It’s connected to the backend with
          a REST API.
        </Info>
        <Stack>React</Stack>
      </Repo>
      <Repo href="https://github.com/jake/screenhole-api" target="_blank">
        <Title>screenhole-api</Title>
        <Info>
          Our API that gets grabs from your screen onto other people’s screens.
        </Info>
        <Stack>Rails</Stack>
      </Repo>
      <Repo href="https://github.com/jake/screenhole-macos" target="_blank">
        <Title>screenhole-macos</Title>
        <Info>
          The desktop app for turning screenshots into grabs and sending them to
          the hole.
        </Info>
        <Stack>Swift</Stack>
      </Repo>
      <Repo href="https://github.com/jake/screenhole-ios" target="_blank">
        <Title>screenhole-ios</Title>
        <Info>
          Scrappy mobile app. Mostly renders the mobile version of
          screenhole.net
        </Info>
        <Stack>Swift</Stack>
      </Repo>
      <Repo href="https://github.com/screenhole/ios-next" target="_blank">
        <Title>ios-next</Title>
        <Info>
          Brand new cross-platform beta app for iOS and Android.
        </Info>
        <Stack>React Native, Expo</Stack>
      </Repo>
      <Repo href="https://github.com/jake/screenhole-services" target="_blank">
        <Title>screenhole-services</Title>
        <Info>
          This is how Mr. Hole uses the phone. Microservice running on top of
          Twilio.
        </Info>
        <Stack>Node, Twilio</Stack>
      </Repo>
    </Grid>
  </Page>
);

export default Code;

const Page = styled.div`
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
    max-width: 800px;
    margin-top: 1.5rem;

    span {
      display: inline-block;
      padding-left: 2rem;
      position: relative;

      .buttcoin {
        position: absolute;
        left: 0;
        top: -4px;
      }
    }
  }
  code {
    display: inline-block;
    clear: both;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.15em 0.25em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 300px));
  justify-content: start;
  grid-gap: 2rem;
  margin-top: 2rem;
`;

const Repo = styled.a`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: inline-block;
  transition: 0.15s ease all;

  &:active {
    transform: scale(0.92);
  }

  &:hover {
    @media (pointer: fine) {
      transform: scale(1.025);
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 1.25rem;
`;

const Info = styled.span`
  display: block;
  color: white;
  margin: 0.5rem 0;
`;

const Stack = styled.span`
  display: block;
  color: #444;
`;
