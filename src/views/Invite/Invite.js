import React, { Component } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";

import AuthContainer from "../../utils/AuthContainer";

import Buttcoin from "../../components/Buttcoin/Buttcoin";

const BUTTCOIN_INVITE_PRICE = 200;

export default class Invite extends Component {
  constructor() {
    super();

    this.state = {
      inviteGenerated: false,
    };
  }
  generateInvite = () => {
    this.setState({
      inviteGenerated: true,
    });
  };
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Page>
            <div>
              <section>
                <h1>Invite yer friends to the ’hole</h1>
                <p>
                  An invite costs{" "}
                  <span className="buttcoin">
                    {BUTTCOIN_INVITE_PRICE} buttcoins
                  </span>. Once you generate an invite, share the code, or the
                  link with a friend, and they can join Screenhole. We’ll keep
                  track of who you invite to make sure your friends are nice!
                  Screenhole is a jerk free zone, so let's keep them out.
                </p>
                <p className="small">
                  Please do not give invites to Mark Zuckerberg, Logan / Jake
                  Paul, or Donald Trump.
                </p>
              </section>
              <section>
                {auth.state.current.stats.buttcoins < BUTTCOIN_INVITE_PRICE ? (
                  <p className="buttcoin">
                    You need {BUTTCOIN_INVITE_PRICE} buttcoins to generate
                    invites. <br />Earn some more and come back here.
                  </p>
                ) : (
                  <button
                    className="generate"
                    onClick={this.generateInvite.bind(this)}
                  >
                    Create invite for
                    <Buttcoin />
                    200
                  </button>
                )}
                {this.state.inviteGenerated && (
                  <NewInvite>
                    Send this link to someone:
                    <textarea
                      readOnly
                      onClick={e => {
                        e.target.focus();
                        e.target.select();
                      }}
                    >
                      https://screenhole.net/register/420blazeit
                    </textarea>
                  </NewInvite>
                )}
              </section>
              <section className="invite-codes">
                <h2>Your Invite Links:</h2>

                <div className="codes">
                  <p>screenhole.net/register/epfiso</p>
                  <p>screenhole.net/register/covfefe</p>
                  <p>screenhole.net/register/epfiso2</p>
                </div>
              </section>
            </div>
          </Page>
        )}
      </Subscribe>
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
    padding: 3rem 0;
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
      background: transparent;
      cursor: pointer;
      outline: 0;
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
      p {
        display: block;
        margin: 0.25rem;
      }
    }
  }
`;

const NewInvite = styled.div`
  background-color: var(--primary-color);
  border-radius: 3px;
  padding: 1.5rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #fff;

  textarea {
    user-select: all;
    display: block;
    padding: 0.5rem;
    margin-top: 1rem;
    background-color: var(--body-bg-color);
    color: #fff;
    font-size: 1.25rem;
    border: none;
    border-radius: 4px;
    width: 100%;
    outline: none;
    resize: none;
  }
`;
