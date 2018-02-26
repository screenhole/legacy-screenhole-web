import React, { Component } from "react";
import styled from "styled-components";

export default class Invite extends Component {
  render() {
    return (
      <Page>
        <div>
          <section>
            <h1>Invite yer friends to the 'hole</h1>
            <p>
              An invite costs <span class="buttcoin">200 buttcoins</span>. Once
              you generate an invite, share the code, or the link with a friend,
              and they can join Screenhole. We'll keep track of who you invite,
              to make sure your friends are nice! Screenhole is a jerk free
              zone, so let's keep them out.
            </p>
            <p class="small">
              Please do not give invites to Mark Zuckerberg, Logan / Jake Paul,
              or Donald Trump.
            </p>
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
    height: 500px;
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
  }
`;
