import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export default class Wtf extends Component {
  render() {
    return (
      <Page>
        <section>
          <img src="/img/wtf.png" alt="What the actual fuck?" />
          <p>
            Screenhole is a fun internet hangout run by{" "}
            <a href="http://thinko.com">Thinko</a>. It’s a place to hang out and
            share "grabs" you take from your Mac or iPhone. 
          </p>
          <p>
          We don’t have a ton of rules, so just don’t be a dick and everything will be ok.
          </p>
          <p>
            There’s no drag &amp; drop, or editing. You can only post grabs with
            our fun apps. We encourage you to post as much as you like.
          </p>

          <p>We’re considering open sourcing the whole thing soon... so others can submit new features.</p>
        </section>

        <section>
          <h1>How do I register?</h1>
          <p>
            We’re not trying to cram this place with a flood of users, so
            invitations are limited. You’ll need an invite code to register. If
            you can’t find one, dm{" "}
            <a
              href="https://twitter.com/screenhole"
              target="_blank"
              rel="noopener noreferrer"
            >
              @screenhole
            </a>{" "}
            on twitter.
          </p>
        </section>

        <section>
          <h1>Instructions</h1>
          <h2>Download the Apps</h2>
          <p>
            <Link to="/apps">Grab the iPhone &amp; Mac apps here</Link>.
          </p>
          <h2>Log in with the Desktop App</h2>
          <p>
            Make sure you have the Desktop app running FIRST, and then{" "}
            <Link to="/login">log in</Link> on the web. If you were already
            logged in on the web, log out and back in again with the desktop app
            running. We automatically connect your account!
          </p>
          <h2>Post a Grab from Desktop</h2>
          <p>
            Make sure the app is running in the menubar, then use the shortcut:
          </p>
          <p>
            <code>Control + Option + Command + s</code>
          </p>
          <h2>Post a Grab from iPhone</h2>
          <p>
            Take a screenshot &amp; open the app within an hour. Tap FIRE IN THE
            HOLE.
          </p>
          <h2>Leave a Voice Memo</h2>
          <p>
            Click the little telephone icon above a post, and follow the
            prompts. Make sure to say something funny if you want people to like
            you.
          </p>
          <h2>Buttcoin?</h2>
          <p>
            It’s a craptocurrency. Score Buttcoin by using Screenhole. You can
            spend it soon.
          </p>
          <h2>Set your Avatar</h2>
          <p>
            Set your Avatar using <a href="http://gravatar.com">gravatar.com</a>.
            We’ll let you manually set it in your profile soon.
          </p>
          <h1>Get in touch</h1>
          <p>
            Since this whole thing is crazy, expect rough edges{" "}
            <span role="img" aria-label="shhh">
              🤭
            </span>{" "}
            . If you find a bug, or get stuck, email{" "}
            <a href="mailto:screenhole@thinko.com">screenhole@thinko.com</a>,
            and we’ll get back to you. If you’re technically inclined, you can
            see / file bugs on{" "}
            <a href="https://github.com/yothinko/screenhole/issues">github</a>.
          </p>
          <p>HAVE FUN!</p>
          <p>
            - Last updated by <a href="/pasquale">@pasquale</a>{" "}
            <TimeAgo date="2018-12-11
            17:49:56 -0500" />
          </p>
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
