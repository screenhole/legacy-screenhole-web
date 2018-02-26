import React, { Component } from "react";
import styled from "styled-components";

import Buttcoin from "../../components/Buttcoin/Buttcoin";

export default class Invite extends Component {
  render() {
    return (
      <Page>
        <div>
          <section>
            <h1>Invite yer friends to the ’hole</h1>
            <p>
              An invite costs <span className="buttcoin">200 buttcoins</span>.
              Once you generate an invite, share the code, or the link with a
              friend, and they can join Screenhole. We’ll keep track of who you
              invite to make sure your friends are nice! Screenhole is a jerk
              free zone, so let's keep them out.
            </p>
            <p className="small">
              Please do not give invites to Mark Zuckerberg, Logan / Jake Paul,
              or Donald Trump.
            </p>
          </section>
          <section>
            <a className="generate" href="#">
              Create invite for
              <Buttcoin />
              200
            </a>
          </section>
          <section className="invite-codes">
            <h2>Your Invite Codes:</h2>

            <div className="codes">
              <a href="#">screenhole.net/register/epfiso</a>
              <a href="#">screenhole.net/register/covfefe</a>
              <a href="#">screenhole.net/register/epfiso2</a>
            </div>
          </section>
        </div>
      </Page>
    );
  }
}

const Page = styled.div`
  margin: 0 auto 50px auto;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 790px) {
    padding: 0;
  }

  section {
    padding: 50px 0;
    max-width: 640px;
    color: var(--muted-color);
    line-height: 175%;
    font-size: 120%;

    .small {
      font-size: 80%;
    }
    .buttcoin {
      color: var(--buttcoin-color);
    }
    p {
      margin-top: 2em;
    }

    .generate {
      display: inline-flex;
      align-items: center;
      color: var(--buttcoin-color);
      font-size: 30px;
      font-weight: bold;
      border: 3px solid var(--buttcoin-color);
      padding: 15px 20px;
      border-radius: 10px;
      transition: all 0.2s ease;

      .buttcoin {
        position: relative;
        top: -1px;
        margin-left: 0.25em;
        margin-right: 0.15em;
      }

      &:hover {
        border-color: white;
        color: white;
      }
      &:active {
        transform: scale(0.95);
      }
    }
    h2 {
      font-size: 25px;
    }
    .codes {
      margin-top: 2em;
      a {
        display: block;
      }
    }
  }
`;
