import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ActionCable } from "react-actioncable-provider";
import Helmet from "react-helmet";
import styled from "styled-components";

import api from "../../utils/api";

import Grab from "./../../components/Grab/Grab";

import loader from "../../images/loader.gif";

class GrabStream extends Component {
  state = {
    hasMore: true,
    grabs: [],
  };

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

  render() {
    let grabs = [];

    this.state.grabs.map((grab, index) =>
      grabs.push(
        <Grab
          username={grab.user.username}
          image={grab.image_public_url}
          id={grab.id}
          memos={grab.memos}
          gravatar={grab.user.gravatar_hash}
          key={grab.id}
          index={index}
        />,
      ),
    );

    return (
      <Grabs>
        <MetaTags />
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
