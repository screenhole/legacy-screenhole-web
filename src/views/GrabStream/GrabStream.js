import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ActionCable } from "react-actioncable-provider";
import ls from "localstorage-ttl";
import Helmet from "react-helmet";
import styled from "styled-components";

import api from "../../utils/api";
import subdomain from "../../utils/subdomain";

import Grab from "./../../components/Grab/Grab";
import BackToTop from "../../components/Nav/BackToTop";

import loader from "../../images/loader.gif";

import * as Scroll from "react-scroll";

const scroller = Scroll.animateScroll;

const LOCALSTORAGE_TIMEOUT = 120000; // 2 minutes

class GrabStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMore: true,
      grabs: JSON.parse(ls.get("grabs")) || [],
    };
  }

  componentDidMount = async () => {
    window.onpopstate = e => {
      // serve cache by default when navigating back
      return;
    };

    let res;

    // Get hole data
    if (subdomain) {
      res = await api.get(`/api/v2/holes/${subdomain}/grabs?page=0`);
    } else {
      // load fresh grabs
      res = await api.get(`/api/v2/holes/root/grabs?page=0`);
    }

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    const freshGrabs = JSON.stringify(res.data.grabs);
    ls.set("grabs", freshGrabs, LOCALSTORAGE_TIMEOUT);

    this.setState({
      grabs: res.data.grabs,
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  loadMore = async page => {
    let res;

    // Get hole data
    if (subdomain) {
      res = await api.get(`/api/v2/holes/${subdomain}/grabs?page=${page}`);
    } else {
      // load fresh grabs
      res = await api.get(`/api/v2/holes/root/grabs?page=${page}`);
    }

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    const grabs = [...this.state.grabs, ...res.data.grabs];
    const freshGrabs = JSON.stringify(grabs);
    ls.set("grabs", freshGrabs, LOCALSTORAGE_TIMEOUT);

    this.setState({
      grabs: grabs,
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    const grabs = [data.grab, ...this.state.grabs];
    const freshGrabs = JSON.stringify(grabs);
    ls.set("grabs", freshGrabs, LOCALSTORAGE_TIMEOUT);

    this.setState({
      grabs: grabs,
    });
  };

  scrollUp = () => {
    scroller.scrollTo(0, {
      duration: 750,
      delay: 100,
      smooth: "easeInOutCubic",
    });
  };

  render() {
    let grabs = [];

    this.state.grabs.map((grab, index) => {
      grabs.push(
        <Grab
          username={grab.user.username}
          image={grab.image_public_url}
          id={grab.id}
          key={grab.id}
          memos={grab.memos}
          gravatar={grab.user.gravatar_hash}
          index={index}
          created_at={grab.created_at}
          description={grab.description}
          media_type={grab.media_type}
          media_filetype={
            (grab.accelerator_metadata && grab.accelerator_metadata.format) ||
            "png"
          }
        />,
      );

      return false;
    });

    return (
      <Grabs id="GrabStream">
        <MetaTags />
        <BackToTop onClick={this.scrollUp} />
        <ActionCable
          channel={{
            channel: "GrabsChannel",
            hole: subdomain ? subdomain : "root",
          }}
          onReceived={this.onReceived}
        />

        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadMore}
          initialLoad={false}
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
`;

class MetaTags extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="fragment" content="!" />
        <title>SCREENHOLE!</title>
        <meta
          name="description"
          content="all the grabs from the fall down the screenhole"
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:url" content="https://screenhole.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SCREENHOLE!" />
        <meta property="og:image" content="" />
        <meta
          property="og:description"
          content="all the grabs from the fall down the screenhole"
        />
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
