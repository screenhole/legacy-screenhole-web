import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import styled from "styled-components";
import { ActionCable } from "react-actioncable-provider";
import { Subscribe } from "unstated";
import { Form, Field } from "react-final-form";
import TimeAgo from "react-timeago";

import AuthContainer from "../../utils/AuthContainer";
import api from "../../utils/api";

import Avatar from "../User/Avatar";
import Memo from "../Memo/Memo";
import Tooltip from "../Tooltip/Tooltip";
import Buttcoin from "../Buttcoin/Buttcoin";

class Grab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      authenticated: api.authenticated,
      currentUser: api.currentUser,
      textMemoField: this.props.variant === "single" ? true : false,
      memos: this.props.memos.reverse(),
      description: this.props.description || null,
      media_type: this.props.media_type || "image",
    };

    this.state.isBlocked = false;

    if (this.state.currentUser) {
      this.state.isBlocked = this.state.currentUser.blocked.includes(
        this.props.userId,
      );
    }
  }

  onReceived = data => {
    if (data.memo.grab.id !== this.props.id) return;

    if (data.memo.pending) return;

    this.setState({
      memos: [data.memo, ...this.state.memos],
    });
  };

  voiceMemos = () => {
    return (this.state.memos || []).filter(function(memo) {
      return !memo.pending && memo.variant === "voice";
    });
  };

  textMemos = () => {
    return (this.state.memos || []).filter(function(memo) {
      return (
        !memo.pending &&
        memo.variant === "chomment" &&
        !memo.message.match(/^💸.*💸️/)
      );
    });
  };

  buttcoinTips = () => {
    const tips = (this.state.memos || []).filter(memo => {
      return (
        !memo.pending &&
        memo.variant === "chomment" &&
        memo.message.match(/^💸.*💸️/)
      );
    });

    return tips.reduce((memo, buttcoin) => {
      return memo + buttcoin.message.length;
    }, 0);
  };

  stickerMemos = () => {
    return (this.state.memos || []).filter(function(memo) {
      return !memo.pending && memo.variant === "sticker";
    });
  };

  showTextMemoField = () => {
    if (!this.state.authenticated) {
      alert("Log in to leave a text memo!");
      return;
    }

    this.setState({
      textMemoField: !this.state.textMemoField,
    });
  };

  deleteGrab = async () => {
    if (!this.state.authenticated) return;

    if (!window.confirm("Are you sure you want to delete this grab?")) return;

    let res = await api.delete(`/grabs/${this.props.id}`);

    if (res.ok) {
      window.location = `/${this.props.username}`;
    } else {
      alert("Sorry, could not delete grab. Try again.");
    }
  };

  blockUser = async () => {
    if (!this.state.authenticated) return;

    this.setState({ showDropdown: false });

    let res = await api.post(
      `/users/${this.props.userId}/${
        this.state.isBlocked ? "/unblock" : "/block"
      }`,
    );

    if (!res.ok) {
      alert("Sorry, could not block user. Try again.");
      return;
    }

    if (this.state.isBlocked) {
      alert("This user is now unblocked.");
    } else {
      alert("This user is now blocked.");
    }

    // update cache currentUser
    const currentUser = await api.get("/users/current");
    if (currentUser.ok) {
      api.setCurrentUser(currentUser.data.user);
    }

    // hard refresh
    // eslint-disable-next-line
    window.location = window.location;
  };

  reportGrab = async () => {
    let res = await api.post(`/grabs/${this.props.id}/report`);

    this.setState({ showDropdown: false });

    if (res.ok) {
      alert("Grab reported, thank you.");
    } else {
      alert("Sorry, could not report grab. Try again.");
    }
  };

  submitMessage = async values => {
    if (!values.message) return;

    let message = values.message;
    values.message = "";

    await api.post(`/grabs/${this.props.id}/memos`, {
      memo: {
        variant: "chomment",
        message: message,
        pending: false,
      },
    });

    this.setState({
      textMemoField: this.props.variant === "single" ? true : false,
    });
  };

  cancelSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { media_filetype } = this.props;
    var grabMedia;

    switch (media_filetype) {
      case "mov":
        grabMedia = (
          <video
            width="500"
            controls="controls"
            preload="metadata"
            playsInline
            loop
          >
            <source
              src={`${this.props.image};native.mp4#t=0.01`}
              type="video/mp4"
            />
          </video>
        );
        break;

      case "gif":
        grabMedia = (
          <video preload="metadata" playsInline loop muted autoPlay>
            <source
              src={`${this.props.image};native.mp4#t=0.01`}
              type="video/mp4"
            />
          </video>
        );
        break;

      default:
        grabMedia = (
          <GrabImage
            src={`${this.props.image};1800x1000,fit.png`}
            alt={`${this.props.username}’s grab on Screenhole`}
          />
        );
        break;
    }

    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Wrapper data-variant={this.props.variant}>
            <ActionCable
              channel={{ channel: "MemosChannel" }}
              onReceived={this.onReceived}
            />
            <UserInfo>
              <div className="user-info-together">
                <Avatar
                  gravatar={this.props.gravatar}
                  username={this.props.username}
                />
                <Link to={`/${this.props.username}`} className="grab-username">
                  {this.props.username}
                </Link>

                <Tooltip
                  className="tooltip-button"
                  title="Leave a chomment on this grab"
                >
                  <Button onClick={this.showTextMemoField}>
                    {chommentIcon}
                  </Button>
                  {this.textMemos().length > 0 && (
                    <Count>{this.textMemos().length}</Count>
                  )}
                </Tooltip>

                {this.props.showDelete &&
                  this.state.currentUser &&
                  this.props.username === this.state.currentUser.username && (
                    <Tooltip title="Delete this grab" theme="danger">
                      <Button onClick={this.deleteGrab}>{deleteIcon}</Button>
                    </Tooltip>
                  )}

                {this.props.showBlockReportDropdown &&
                  this.state.currentUser &&
                  this.props.username !== this.state.currentUser.username && (
                    <Media query="(max-width: 820px)">
                      <Dropdown>
                        <Button
                          onClick={() =>
                            this.setState({
                              showDropdown: !this.state.showDropdown,
                            })
                          }
                        >
                          {ellipsisIcon}
                        </Button>
                        <section
                          className={this.state.showDropdown ? "on" : "off"}
                        >
                          <Button onClick={this.blockUser}>
                            {this.state.isBlocked ? "Unblock" : "Block"}
                          </Button>
                          <Button onClick={this.reportGrab}>Report</Button>
                        </section>
                      </Dropdown>
                    </Media>
                  )}
              </div>
              <HorizontalDivider />
              <TimeAgo date={this.props.created_at} />
            </UserInfo>
            <Link
              to={`/${this.props.username}/~${this.props.id}`}
              className="grab-image-link"
            >
              {grabMedia}
            </Link>
            {this.state.description && (
              <GrabDescription>{this.state.description}</GrabDescription>
            )}
            <SpaceTop>
              {this.buttcoinTips() > 0 && (
                <Buttcoin amount={this.buttcoinTips()} />
              )}
              {this.textMemos().length > 0 && (
                <Link
                  to={`/${this.props.username}/~${this.props.id}`}
                  className="grab-image-link"
                >
                  View all chomments
                </Link>
              )}
              {this.props.media_type === "recording" && (
                <Link
                  to={`/${this.props.username}/~${this.props.id}`}
                  className="grab-image-link"
                >
                  View video
                </Link>
              )}
              {/* TODO: DRY this up */}
              {this.props.media_filetype === "mov" && (
                <Link
                  to={`/${this.props.username}/~${this.props.id}`}
                  className="grab-image-link"
                >
                  View video
                </Link>
              )}
              {this.props.media_filetype === "gif" && (
                <Link
                  to={`/${this.props.username}/~${this.props.id}`}
                  className="grab-image-link"
                >
                  View GIF
                </Link>
              )}
            </SpaceTop>
            {auth.state.authenticated && this.state.textMemoField && (
              <Form
                className="grab-text-memo-form"
                onSubmit={this.submitMessage}
                render={({ handleSubmit, values }) => {
                  // Assign zero length or it will be undefined due
                  // to the input not being used and having no value
                  let messageLength = 0;

                  if (values.message) {
                    // Assign actual length once user starts typing
                    messageLength = values.message.length;
                  }

                  return (
                    <ChommentInputWrapper
                      onSubmit={
                        // Check if message length is larger than
                        // user’s buttcoin balance
                        // Submit the form if more buttcoin than msg length
                        messageLength > auth.state.buttcoins
                          ? this.cancelSubmit.bind(this)
                          : handleSubmit
                      }
                    >
                      <Field name="message">
                        {({ input, meta }) => (
                          <Fragment>
                            <Input
                              {...input}
                              type="text"
                              placeholder="Type yer chomment"
                              autoComplete="off"
                              autoFocus
                              className={
                                input.value.length > auth.state.buttcoins
                                  ? "needs-more-buttcoin"
                                  : null
                              }
                            />
                            <TipButton
                              onClick={e => {
                                e.preventDefault();
                                const money = "💸️";
                                values.message = money.repeat(23);
                                handleSubmit();
                              }}
                            >
                              <Buttcoin />
                              <span>Tip 69</span>
                            </TipButton>
                            <ChommentCost>
                              {input.value.length <= auth.state.buttcoins && (
                                <span>
                                  Hit enter to chomment for{" "}
                                  <span className="butt-value">
                                    <span className="butt-coin">
                                      {input.value.length}
                                    </span>{" "}
                                    buttcoin
                                  </span>
                                </span>
                              )}
                              {input.value.length > auth.state.buttcoins && (
                                <span>
                                  You’re short{" "}
                                  <span className="butt-value-negative">
                                    <span className="butt-coin">
                                      {input.value.length -
                                        auth.state.buttcoins}
                                    </span>{" "}
                                    buttcoin.
                                  </span>{" "}
                                  Delete some characters.
                                </span>
                              )}
                            </ChommentCost>
                          </Fragment>
                        )}
                      </Field>
                    </ChommentInputWrapper>
                  );
                }}
              />
            )}
            {this.props.showMemos &&
              this.state.memos.map(memo => {
                if (!memo.pending && memo.variant === "voice") {
                  return (
                    <Memo
                      key={memo.id}
                      message={memo.message}
                      audio={memo.media_public_url}
                      username={memo.user.username}
                      gravatar={memo.user.gravatar_hash}
                    />
                  );
                }

                if (!memo.pending && memo.variant === "chomment") {
                  return (
                    <Memo
                      key={memo.id}
                      message={memo.message}
                      username={memo.user.username}
                      gravatar={memo.user.gravatar_hash}
                      created_at={memo.created_at}
                      variant="chomment"
                    />
                  );
                }

                return false;
              })}
          </Wrapper>
        )}
      </Subscribe>
    );
  }
}

export default Grab;

const Wrapper = styled.article`
  margin-bottom: 4rem;

  .tooltip-button {
    display: flex !important;
    align-items: center;
    user-select: none;
  }

  form {
    margin-top: 1rem;
  }

  video {
    border-radius: 5px;
    background-color: var(--body-bg-color);
    max-width: 600px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  @media (max-width: 400px), (min-width: 819px) and (max-width: 840px) {
    flex-wrap: wrap;
  }

  a {
    flex-shrink: 0;
  }

  .grab-username {
    padding: 5px 10px;
    border-radius: 100px;
    border: 2px solid #3c3548;
    display: inline-block;
    margin-left: 0.5rem;
    color: #fff;
    transition: all 0.2s ease;

    &:hover {
      border-color: #fff;
    }
  }

  .user-info-together {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  time {
    font-size: 0.95rem;
    color: var(--super-muted-color);
    text-align: right;
    flex-shrink: 0;
    margin: 0.5rem 0;
  }
`;

const Button = styled.button`
  outline: 0;
  display: inline-block;
  background: none;
  border: none;
  transition: 0.2s ease all;
  cursor: pointer;
  position: relative;
  top: 1px;
  margin-left: 0.25rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Count = styled.span`
  color: var(--primary-color);
  font-family: "Menlo", monospace;
`;

const GrabImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
  transition: all 0.1s ease;
  max-height: 65vh;
  border: 1px solid hsla(0, 0%, 100%, 0.1);

  &:hover {
    box-shadow: 0 0 0 5px var(--primary-color);
  }
`;

const GrabDescription = styled.p`
  color: #ffffff;
  line-height: 1.45;
  font-size: 0.925rem;
  word-break: break-word;
  display: block;
  clear: both;
  max-width: 580px;
  padding: 10px;
  margin-top: 15px;
  border-left: 3px solid #6448e5;
`;

const Dropdown = styled.div`
  position: relative;

  section {
    position: absolute;
    top: 30px;
    left: -27px;
    width: 100px;
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 0;
    margin: 0;
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.75);

    opacity: 0;
    visibility: hidden;
    transform: translateY(-5px);

    transition: all 400ms ease;

    &.on {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    &::after {
      content: "";
      position: absolute;
      top: -8px;
      right: calc(50% - 8px);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 7.5px 10px 7.5px;
      border-color: transparent transparent var(--primary-color) transparent;
    }

    button {
      opacity: 0.8;
      color: white;
      margin: 0;
      display: block;
      transition: all 0.2s ease;
      text-align: center;
      padding: 10px;
      width: 100%;
      font-size: 1rem;

      &:hover {
        opacity: 1;
        text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45);
        transform: translate(0, -1px);
      }
    }
  }
`;

const HorizontalDivider = styled.div`
  width: 70%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 1rem;
  @media (max-width: 400px), (min-width: 819px) and (max-width: 840px) {
    display: none;
  }
`;

const ellipsisIcon = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 5"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Canvas" transform="translate(-1320 183)">
      <g id="options">
        <g id="1_ellipsisIcon">
          <use
            xlinkHref="#path0_fill_ellipsisIcon"
            transform="translate(1320 -183)"
            fill="#6A40EE"
          />
        </g>
        <g id="2_ellipsisIcon">
          <use
            xlinkHref="#path0_fill_ellipsisIcon"
            transform="translate(1330 -183)"
            fill="#6A40EE"
          />
        </g>
        <g id="3_ellipsisIcon">
          <use
            xlinkHref="#path0_fill_ellipsisIcon"
            transform="translate(1340 -183)"
            fill="#6A40EE"
          />
        </g>
      </g>
    </g>
    <defs>
      <path
        id="path0_fill_ellipsisIcon"
        d="M 0 2.5C 0 1.11929 1.11929 0 2.5 0L 2.5 0C 3.88071 0 5 1.11929 5 2.5L 5 2.5C 5 3.88071 3.88071 5 2.5 5L 2.5 5C 1.11929 5 0 3.88071 0 2.5L 0 2.5Z"
      />
    </defs>
  </svg>
);

const deleteIcon = (
  <svg
    width="20"
    height="26"
    viewBox="0 0 20 26"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="Canvas" transform="translate(-8132 4676)">
      <g id="trash">
        <g id="Vector">
          <use
            xlinkHref="#path0_fill_deleteIcon"
            transform="translate(8132 -4676)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8141.06 -4665.69)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8144.5 -4665.69)"
            fill="#3B3648"
          />
        </g>
        <g id="Vector">
          <use
            xlinkHref="#path1_fill_deleteIcon"
            transform="translate(8137.62 -4665.69)"
            fill="#3B3648"
          />
        </g>
      </g>
    </g>
    <defs>
      <path
        id="path0_fill_deleteIcon"
        d="M 12.5625 0L 7.4375 0C 6.40625 0 5.5625 0.811561 5.5625 1.80347L 5.5625 3.24624L 1.5625 3.24624C 0.6875 3.24624 0 3.90751 0 4.74913L 0 6.61272C 0 7.45434 0.6875 8.11561 1.5625 8.11561L 1.90625 8.11561L 1.90625 22.6936C 1.90625 24.5272 3.4375 26 5.34375 26L 14.625 26C 16.5312 26 18.0625 24.5272 18.0625 22.6936L 18.0625 8.11561L 18.4375 8.11561C 19.3125 8.11561 20 7.45434 20 6.61272L 20 4.74913C 20 3.90751 19.3125 3.24624 18.4375 3.24624L 14.4375 3.24624L 14.4375 1.80347C 14.4375 0.811561 13.5938 0 12.5625 0ZM 7.4375 1.80347L 12.5312 1.80347L 12.5312 3.24624L 7.4375 3.24624L 7.4375 1.80347ZM 16.1875 22.6936C 16.1875 23.5353 15.5 24.1965 14.625 24.1965L 5.34375 24.1965C 4.46875 24.1965 3.78125 23.5353 3.78125 22.6936L 3.78125 8.11561L 16.2188 8.11561L 16.1875 22.6936ZM 18.125 6.31214L 1.875 6.31214L 1.875 5.04971L 18.125 5.04971L 18.125 6.31214Z"
      />
      <path
        id="path1_fill_deleteIcon"
        d="M 0.9375 11.9931C 1.46875 11.9931 1.875 11.6023 1.875 11.0913L 1.875 0.901734C 1.875 0.390751 1.46875 -2.29323e-07 0.9375 -2.29323e-07C 0.40625 -2.29323e-07 0 0.390751 0 0.901734L 0 11.0913C 0 11.6023 0.40625 11.9931 0.9375 11.9931Z"
      />
    </defs>
  </svg>
);

export const chommentIcon = (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path
        d="M3.846 2c-.917 0-1.142.043-1.368.164a.727.727 0 0 0-.314.314c-.12.226-.164.45-.164 1.368v11.308c0 .917.043 1.142.164 1.368.075.14.174.239.314.314.226.12.45.164 1.368.164h16.308c.917 0 1.142-.043 1.368-.164a.727.727 0 0 0 .314-.314c.12-.226.164-.45.164-1.368V3.846c0-.917-.043-1.142-.164-1.368a.727.727 0 0 0-.314-.314c-.226-.12-.45-.164-1.368-.164H3.846zm14.868 17l-2.373 3.692a1 1 0 0 1-1.682 0L12.286 19h-8.44c-1.337 0-1.822-.14-2.311-.4A2.726 2.726 0 0 1 .4 17.464C.139 16.976 0 16.491 0 15.155V3.844c0-1.336.14-1.821.4-2.31A2.726 2.726 0 0 1 1.536.4C2.024.139 2.509 0 3.845 0h16.31c1.336 0 1.821.14 2.31.4.49.262.873.646 1.134 1.135.262.489.401.974.401 2.31v11.31c0 1.336-.14 1.821-.4 2.31a2.726 2.726 0 0 1-1.135 1.134c-.489.262-.974.401-2.31.401h-1.44zM13.5 17l2 3 2-3h-4z"
        fill="#6A40EE"
        fillRule="nonzero"
      />
      <path
        d="M5 6h14a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2M5 11h9a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2"
        fill="#6FDC7B"
      />
    </g>
  </svg>
);

const ChommentInputWrapper = styled.form`
  display: block;
  width: 100%;
  position: relative;
  padding-left: 3.5rem;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  max-width: 580px;
  font-size: 1rem;
  color: #fff;
  margin-top: 0.25rem;
  border-radius: 40rem;
  border: 1px solid var(--super-muted-color);
  background-color: var(--body-bg-color);
  transform: translateZ(0);
  padding: 1rem;
  transition: 0.2s ease all;

  &:focus {
    outline: none;
    background-color: #111;
  }

  &.needs-more-buttcoin {
    border-color: var(--danger-color);
  }
`;

const ChommentCost = styled.div`
  font-size: 0.75rem;
  color: var(--muted-color);
  display: block;
  max-width: 580px;
  text-align: right;
  margin-top: 0.35rem;
  margin-bottom: 1rem;
  padding-right: 1rem;

  .butt-value {
    color: var(--buttcoin-color);
  }

  .butt-value-negative {
    color: var(--danger-color);
  }

  .butt-coin {
    font-family: "Menlo", monospace;
  }
`;

const TipButton = styled.div`
  position: absolute;
  background-color: var(--primary-color);
  border: none;
  border-radius: 40em;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  top: 0.25rem;
  left: 0;
  cursor: pointer;
  transition: 0.15s ease all;
  text-align: center;

  svg {
    pointer-events: none;
  }

  > span {
    white-space: nowrap;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 500;
    transform: translateY(-2px);
    user-select: none;
  }

  &:active {
    transform: scale(0.92);
  }

  @media (pointer: fine) {
    &:hover,
    &:focus {
      box-shadow: 0 0 0 3px var(--primary-color);
    }
  }
`;

const SpaceTop = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  .buttcoin + a,
  a + a {
    margin-left: 0.5rem;

    &::before {
      content: " • ";
      color: var(--muted-color);
      position: relative;
    }
  }
`;
