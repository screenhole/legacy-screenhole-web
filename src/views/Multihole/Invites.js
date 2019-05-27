import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Subscribe } from "unstated";
import TimeAgo from "react-timeago";
import Clipboard from "clipboard";

import api from "../../utils/api";
import subdomain from "../../utils/subdomain";
import AuthContainer from "../../utils/AuthContainer";

export default class Invites extends Component {
  constructor() {
    super();

    this.state = {
      codeCopied: false,
      inviteGenerated: false,
      inviteLink: false,
      invites: false,
      BUTTCOIN_INVITE_PRICE: 0,
      inviteButtonLocked: false,
    };
  }
  generateInvite = async () => {
    this.setState({
      inviteButtonLocked: true,
    });

    let generatedInvite = await api.post(
      `/api/v2/holes/${subdomain}/invitations`,
    );

    if (generatedInvite.ok) {
      let invites = await api.get(`/api/v2/holes/${subdomain}/invitations`);

      if (invites.ok) {
        this.setState({
          codeCopied: false,
          inviteGenerated: true,
          inviteLink: `https://${subdomain}.screenhole.net/register/${
            generatedInvite.data.invite.code
          }`,
          invites: invites.data.invites.reverse(),
          inviteButtonLocked: false,
        });
      }
    }
  };
  componentDidMount() {
    this.loadData();
    // eslint-disable-next-line
    const clipboard = new Clipboard(".copy-to-clipboard");
  }
  loadData = async () => {
    let invites = await api.get(`/api/v2/holes/thinko/invitations`);

    if (invites.ok) {
      this.setState({ invites: invites.data.invites.reverse() });
    }
  };
  handleCopyButtonState() {
    this.setState({
      codeCopied: true,
    });
  }
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Page>
            <div>
              <section>
                <h1>Invite your friends</h1>
                <p>
                  Once you generate an invite share the code or the link with a
                  friend so they can join Screenhole. We’ll keep track of who
                  you invite to make sure your friends are nice! Screenhole is a
                  jerk free zone, so let’s keep them out.
                </p>
                <p className="small">
                  Please do not give invites to Mark Zuckerberg, Logan / Jake
                  Paul, or Donald Trump.
                </p>
              </section>
              <section>
                <button
                  className="generate"
                  disabled={this.state.inviteButtonLocked}
                  onClick={this.generateInvite.bind(this)}
                >
                  Create {this.state.inviteGenerated ? "another" : "an"} invite
                </button>
                {this.state.inviteGenerated && (
                  <NewInvite
                    className={this.state.codeCopied ? "copied" : null}
                  >
                    <strong>Invite created!</strong>
                    <br />
                    Send this link to someone:
                    <textarea
                      id="new-code-generated"
                      readOnly
                      rows="1"
                      value={this.state.inviteLink}
                      onClick={e => {
                        e.target.focus();
                        e.target.select();
                      }}
                    />
                    <button
                      className="copy-to-clipboard"
                      data-clipboard-target="#new-code-generated"
                      onClick={this.handleCopyButtonState.bind(this)}
                    >
                      {this.state.codeCopied ? (
                        <span>{checkIcon} Copied</span>
                      ) : (
                        "Copy to clipboard"
                      )}
                    </button>
                  </NewInvite>
                )}
              </section>
              <section className="invite-codes">
                <h2>Your Invite Codes:</h2>

                <ol className="codes">
                  {this.state.invites &&
                    this.state.invites.map(invite => (
                      <li key={invite.code}>
                        <strong
                          className={
                            invite.invited !== null ? "strike-it" : null
                          }
                        >
                          {invite.code}
                          {invite.invited === null && (
                            <CopyToClipboardButton
                              className="copy-to-clipboard"
                              data-clipboard-text={invite.code}
                            >
                              Copy
                            </CopyToClipboardButton>
                          )}
                        </strong>
                        <time>
                          Created <TimeAgo date={invite.created_at} />
                        </time>
                        <span className="redeemer">
                          {invite.invited !== null ? (
                            <span>
                              <span className="checked">{checkIcon}</span>
                              Invited
                              <Link to={`/${invite.invited.username}`}>
                                 @{invite.invited.username}
                              </Link>
                            </span>
                          ) : (
                            <span>Not used yet</span>
                          )}
                        </span>
                      </li>
                    ))}
                  {this.state.invites.length < 1 && (
                    <p>None yet. Generate one above.</p>
                  )}
                </ol>
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
  @media (max-width: 819px) {
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

      &[disabled],
      &:disabled {
        opacity: 0.35;
        cursor: wait;
      }

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
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;

        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
        }

        > * {
          width: 33%;
          min-width: 200px;
        }
      }

      p {
        display: block;
        margin: 0.25rem;
      }

      time,
      .redeemer {
        font-size: 0.875rem;
        user-select: none;
      }

      time {
        @media (min-width: 1120px) {
          text-align: center;
        }
      }

      strong {
        font-weight: 700;
        color: #fff;
        display: flex;
        align-items: center;
        width: 200px;
      }
    }

    .redeemer span {
      display: flex;
      align-items: center;
      @media (min-width: 1120px) {
        justify-content: flex-end;
      }
    }

    .checked {
      color: var(--secondary-color);
      margin-right: 3px;
    }
  }

  .strike-it {
    color: var(--muted-color) !important;
    position: relative;

    &::after {
      content: "";
      width: calc(100% + 1rem);
      height: 3px;
      background-color: var(--body-bg-color);
      border-radius: 3px;
      position: absolute;
      left: -0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const NewInvite = styled.div`
  background-color: var(--buttcoin-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #000;
  transition: 0.15s ease all;
  transform-origin: top center;
  animation: revealHeight 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;

  &.copied {
    background-color: var(--secondary-color);

    .copy-to-clipboard {
      background-color: var(--secondary-color);
      pointer-events: none;
      cursor: default;
      color: #000;
      padding-left: 0;
    }
  }

  textarea {
    user-select: all;
    display: block;
    padding: 0.5rem;
    margin-top: 1rem;
    background-color: var(--body-bg-color);
    color: #fff;
    font-size: 1.25rem;
    border: none;
    border-radius: 6px;
    width: 100%;
    outline: none;
    resize: none;
  }

  .copy-to-clipboard {
    border: none;
    outline: none;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: 0.15s ease all;

    &:hover {
    }

    &:active {
      transform: scale(0.95);
    }

    span {
      display: flex;
      align-items: center;
    }
  }
`;

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <g>
      <polygon
        fill="currentColor"
        points="12.4,6 11,4.6 7,8.6 5,6.6 3.6,8 7,11.4 "
      />
    </g>
  </svg>
);

const CopyToClipboardButton = styled.button`
  outline: none;
  background: none;
  border: 2px solid currentColor;
  border-radius: 4px;
  color: var(--primary-color);
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 0.5rem;
  position: relative;
  top: -1px;
  cursor: pointer;
  transition: 0.15s ease all;

  &:hover {
    border-color: currentColor;
    color: var(--secondary-color);
  }

  &:active {
    transform: scale(0.95);
  }
`;
