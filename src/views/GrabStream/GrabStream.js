import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ActionCable } from "react-actioncable-provider";
import Helmet from "react-helmet";
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import api from "../../utils/api";

import Grab from "./../../components/Grab/Grab";
import BackToTop from "../../components/Nav/BackToTop";

import loader from "../../images/loader.gif";

import * as Scroll from "react-scroll";
// I have no idea how this works but it works well...
// Somehow using scrollTo with Element doesn’t work with Scroll.animateScroll 🤷️
const scroller = Scroll.animateScroll;
const elementScroller = Scroll.scroller;
const Element = Scroll.Element;

class GrabStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMore: true,
      grabs: [],
      seenGrabIndex: 0,
    };

    this.scrollUp = this.scrollUp.bind(this);
  }

  loadMore = async page => {
    let res = await api.get(`/grabs?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      grabs: [...this.state.grabs, ...res.data.grabs],
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    this.setState({
      grabs: [data.grab, ...this.state.grabs],
    });
  };

  scrollUp() {
    scroller.scrollTo(0, {
      duration: 750,
      delay: 100,
      smooth: "easeInOutCubic",
    });
  }

  scrollToGrab(index) {
    elementScroller.scrollTo(`GrabStream-Grab-${index}`, {
      duration: 750,
      delay: 0,
      smooth: "easeInOutCubic",
      offset: -70,
    });
  }

  scrollToNextGrab() {
    this.scrollToGrab(this.state.seenGrabIndex + 1);
  }

  scrollToPreviousGrab() {
    if (this.state.seenGrabIndex > 0) {
      this.scrollToGrab(this.state.seenGrabIndex - 1);
    }
  }

  checkGrabVisibility(index) {
    if (this.state.grabs !== []) {
      this.setState({
        seenGrabIndex: index,
      });
    }
  }

  render() {
    let grabs = [];

    this.state.grabs.map((grab, index) => {
      grabs.push(
        <VisibilitySensor
          onChange={this.checkGrabVisibility.bind(this, index)}
          key={grab.id}
        >
          <Element name={`GrabStream-Grab-${index}`}>
            <Grab
              username={grab.user.username}
              image={grab.image_public_url}
              id={grab.id}
              memos={grab.memos}
              gravatar={grab.user.gravatar_hash}
              index={index}
            />
          </Element>
        </VisibilitySensor>,
      );
    });

    return (
      <Grabs id="GrabStream">
        <MetaTags />
        <BackToTop onClick={this.scrollUp} />
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="j"
          onKeyHandle={this.scrollToNextGrab.bind(this)}
        />
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="k"
          onKeyHandle={this.scrollToPreviousGrab.bind(this)}
        />
        <ActionCable
          channel={{ channel: "GrabsChannel" }}
          onReceived={this.onReceived}
        />

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.hasMore}
          loader={
            <div className="loader" key="loader">
              <img src={loader} alt="loading..." />
            </div>
          }
        >
          {grabs}
        </InfiniteScroll>
      </Grabs>
    );
  }
}

export default GrabStream;

const Grabs = styled.div`
  display: block;
  margin: -1.25rem;
  padding: 1rem 1.25rem;
  @media (min-width: 791px) {
    padding: 3rem;
  }
`;

class MetaTags extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="fragment" content="!" />
        <title>SCREENHOLE!</title>
        <meta name="description" content="Cram your stuff in my hole!" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:url" content="https://screenhole.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SCREENHOLE!" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="Cram your stuff in my hole!" />
        <meta property="og:site_name" content="Screenhole" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@screenhole" />
        <meta name="twitter:creator" content="@screenhole" />
        <meta name="twitter:url" content="https://screenhole.net/" />
        <meta name="twitter:title" content="SCREENHOLE!" />
        <meta
          name="twitter:description"
          content="Cram your stuff in my hole!"
        />
        <meta name="twitter:image" content="" />
      </Helmet>
    );
  }
}
