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

// Get subdomain
const subdomain = window.location.host.split(".")[1]
  ? window.location.host.split(".")[0]
  : false;

class Chat extends Component {
  state = {
    hasMore: true,
    chat_messages: [],
  };

  loadMore = async page => {
    let res;

    if (subdomain) {
      res = await api.get(
        `/api/v2/holes/${subdomain}/chat_messages?page=${page}`,
      );
    } else {
      res = await api.get(`/api/v2/chat_messages?page=${page}`);
    }

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      chat_messages: [...this.state.chat_messages, ...res.data.chat_messages],
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    this.setState({
      chat_messages: [data.chat_message, ...this.state.chat_messages],
    });
  };

  submitMessage = async values => {
    if (!values.message) return;

    let message = values.message;
    values.message = "";

    if (subdomain) {
      await api.post(`/api/v2/holes/${subdomain}/chat_messages`, {
        chat_message: { message: message },
      });
    } else {
      await api.post("/api/v2/chat_messages", {
        chat_message: { message: message },
      });
    }
  };

  scrollUp() {
    scroller.scrollTo(0, {
      duration: 750,
      delay: 100,
      smooth: "easeInOutCubic",
      containerId: "Chat",
    });
  }

  render() {
    let chat_messages = [];

    this.state.chat_messages.map(chat_message =>
      chat_messages.push(
        <Chomment
          username={chat_message.user.username}
          message={chat_message.message}
          gravatar={chat_message.user.gravatar_hash}
          variant={chat_message.variant}
          reference={chat_message.cross_ref}
          key={chat_message.id}
          created_at={chat_message.created_at}
        />,
      ),
    );

    return (
      <Fragment>
        <Subscribe to={[AuthContainer]}>
          {auth => (
            <Chomments id="Chat" authenticated={auth.state.authenticated}>
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
                {chat_messages}
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
                              placeholder="Type a message"
                              autoComplete="off"
                            />
                          )}
                        </Field>
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
                className="Chat--BackToTop"
                onClick={this.scrollUp.bind(this)}
              />
            )
          }
        </Media>
      </Fragment>
    );
  }
}

export default Chat;

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
    props.authenticated ? "4rem" : "calc(var(--app-padding) / 2)"};
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
