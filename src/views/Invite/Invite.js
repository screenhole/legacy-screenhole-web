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
              An invite will cost you <span class="buttcoin">200 buttcoin</span>.{" "}
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
    .buttcoin {
      color: var(--buttcoin-color);
    }
    p {
      margin-top: 2em;
    }
  }
`;
