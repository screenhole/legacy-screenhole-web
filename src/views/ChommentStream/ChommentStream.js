import React, { Component, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Subscribe } from "unstated";
import { ActionCable } from "react-actioncable-provider";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import Media from "react-media";
import * as Scroll from "react-scroll";

import AuthContainer from "../../utils/AuthContainer";

import api from "../../utils/api";

import Chomment from "../../components/Chomment/Chomment";
import BackToTop from "../../components/Nav/BackToTop";

import loader from "../../images/loader.gif";

let scroller = Scroll.animateScroll;

const canNotify = () => {
  if (!("Notification" in window)) {
    // user doesn't support notifications, what a loser
    return false;
  }

  if (Notification.permission !== "granted") {
    // user doesn't want us in their lives; fair play
    return false;
  }

  return true;
};

class ChommentStream extends Component {
  state = {
    hasMore: true,
    chomments: [],
    canNotify: canNotify(),
  };

  loadMore = async page => {
    let res = await api.get(`/chomments?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      chomments: [...this.state.chomments, ...res.data.chomments],
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    this.setState({
      chomments: [data.chomment, ...this.state.chomments],
    });

    this.notify(data.chomment);
  };

  notify = chomment => {
    if (!canNotify()) {
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user_current"));
    const currentUserId = currentUser.id;

    if (currentUserId === chomment.user.id) {
      return;
    }

    new Notification(`@${chomment.user.username}`, { body: chomment.message });
  };

  requestNotifyPermission = () => {
    if (canNotify()) {
      return this.setState({ canNotify: true });
    }

    Notification.requestPermission();

    return this.setState({ canNotify: true });
  };

  submitMessage = async values => {
    if (!values.message) return;

    let message = values.message;
    values.message = "";

    await api.post("/chomments", { chomment: { message: message } });
  };

  scrollUp() {
    scroller.scrollTo(0, {
      duration: 750,
      delay: 100,
      smooth: "easeInOutCubic",
      containerId: "ChommentStream",
    });
  }

  render() {
    let chomments = [];

    this.state.chomments.map(chomment =>
      chomments.push(
        <Chomment
          username={chomment.user.username}
          message={chomment.message}
          gravatar={chomment.user.gravatar_hash}
          variant={chomment.variant}
          reference={chomment.cross_ref}
          key={chomment.id}
          created_at={chomment.created_at}
        />,
      ),
    );

    return (
      <Fragment>
        <Subscribe to={[AuthContainer]}>
          {auth => (
            <Chomments
              id="ChommentStream"
              authenticated={auth.state.authenticated}
              canNotify={this.state.canNotify}
            >
              <ActionCable
                channel={{ channel: "ChommentsChannel" }}
                onReceived={this.onReceived}
              />

              <InfiniteScroll
                element="section"
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                useWindow={false}
                loader={
                  <div className="loader" key="loader">
                    <img src={loader} alt="loading..." />
                  </div>
                }
              >
                {chomments}
              </InfiniteScroll>

              {auth.state.authenticated && (
                <Form
                  onSubmit={this.submitMessage}
                  render={({ handleSubmit, values }) => {
                    return (
                      <ChommentInputWrapper onSubmit={handleSubmit}>
                        <Field name="message">
                          {({ input, meta }) => (
                            <Input
                              {...input}
                              type="text"
                              placeholder="Type some chomments"
                              autoComplete="off"
                            />
                          )}
                        </Field>

                        {!this.state.canNotify && (
                          <Media query="(min-width: 791px)">
                            {matches =>
                              matches ? (
                                <NotificationNag
                                  onClick={() => this.requestNotifyPermission()}
                                >
                                  Notify on new Chomment?
                                </NotificationNag>
                              ) : null
                            }
                          </Media>
                        )}
                      </ChommentInputWrapper>
                    );
                  }}
                />
              )}
            </Chomments>
          )}
        </Subscribe>
        {/* Show Chomments back to top arrow on mobile */}
        <Media query="(min-width: 791px)">
          {matches =>
            matches ? null : (
              <BackToTop
                className="ChommentStream--BackToTop"
                onClick={this.scrollUp.bind(this)}
              />
            )
          }
        </Media>
      </Fragment>
    );
  }
}

export default ChommentStream;

const chommentPadding = (authenticated, canNotify) => {
  if (authenticated && !canNotify) {
    return "6rem";
  }

  if (authenticated) {
    return "4rem";
  }

  return "calc(var(--app-padding) / 2)";
};

const Chomments = styled.aside`
  position: fixed;
  left: 0;
  top: var(--nav-height);
  height: calc(100% - var(--nav-height));
  width: 100%;
  max-width: var(--sidebar-width);
  box-shadow: inset -1px 0 0 0 var(--divider-color);
  padding: var(--app-padding);
  padding-top: ${props =>
    chommentPadding(props.authenticated, props.canNotify)};
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overscroll-behavior: contain;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left 80%,
    left bottom,
    from(#000),
    to(rgba(0, 0, 0, 0))
  );

  section {
    padding-bottom: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    background-color: var(--divider-color);
    height: 6px;
    width: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
  }

  @media (max-width: 790px) {
    max-width: 100%;
    height: calc(90vh - var(--nav-height));
    -webkit-overflow-scrolling: touch;
    background-color: var(--body-bg-color);
    box-shadow: none;
  }
`;

const ChommentInputWrapper = styled.form`
  display: block;
  position: fixed;
  width: calc(var(--sidebar-width) - 1px);
  top: var(--nav-height);
  left: 0;

  @media (max-width: 790px) {
    width: 100%;
    top: var(--nav-height);
  }
`;

const NotificationNag = styled.div`
  padding: 0 var(--app-padding);
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  background-color: var(--body-bg-color);
  color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid #222;
  cursor: pointer;
  height: 2rem;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1rem;
  color: #fff;
  border: 0;
  border-bottom: 1px solid #222;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.65);
  background-color: var(--body-bg-color);
  transform: translateZ(0);
  padding: var(--app-padding);
  transition: 0.2s ease all;

  &:focus {
    outline: none;
    background-color: #111;
  }
`;
