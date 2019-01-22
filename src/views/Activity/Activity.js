import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { ActionCable } from "react-actioncable-provider";
import Trend from "react-trend";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import InfiniteScroll from "react-infinite-scroller";
import * as Scroll from "react-scroll";
import NumberEasing from "che-react-number-easing";

import api from "../../utils/api";

import Memo from "../../components/Memo/Memo";
import Buttcoin from "../../components/Buttcoin/Buttcoin";
import BackToTop from "../../components/Nav/BackToTop";

import loader from "../../images/loader.gif";

const scroller = Scroll.animateScroll;

export default class Activity extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      hasMore: true,
      buttcoins: {
        earned: 0,
        spent: 0,
        profit: 0,
      },
      trends: false,
    };
  }

  async componentWillMount() {
    let buttcoinStats = await api.get(`/buttcoins`);
    let buttcoinTrends = await api.get(`/buttcoins/trends`);

    let trendsData = buttcoinTrends.data;
    let trends = new Array();

    if (trendsData !== undefined && trendsData.data !== undefined) {
      for (let i in trendsData) {
        trends.push(trendsData[i].profit);
      }
      this.setState({
        buttcoins: buttcoinStats.data,
        trends: trends,
      });
    } else {
      this.setState({
        buttcoins: buttcoinStats.data,
        trends: false,
      });
    }
  }

  loadMore = async page => {
    let res = await api.get(`/sup?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      notes: [...this.state.notes, ...res.data.notes],
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false });
    }
  };

  onReceived = data => {
    this.setState({
      notes: [data, ...this.state.notes],
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
    return (
      <View>
        <BackToTop onClick={this.scrollUp} />
        {/* DISABLED DUE TO DATA STRUCTURE MISMATCH */}
        {/* https://gist.github.com/pugson/0858859bdeab3d78aea661dd90139df1 */}
        {/* <ActionCable
          channel={{ channel: "NotesChannel" }}
          onReceived={this.onReceived}
        /> */}
        <h1>SUP?</h1>
        <section>
          <h2>Your daily buttcoin digestif</h2>
          <Table>
            <Column>
              <h3>Earned</h3>
              <p className="positive">
                <NumberEasing
                  value={Number(this.state.buttcoins.earned)}
                  ease="quintOut" // available options https://github.com/mattdesl/eases/blob/master/index.js
                  precision={0}
                  speed={3000}
                  useLocaleString={true}
                />
              </p>
            </Column>
            <Column>
              <h3>Spent</h3>
              <p className="negative">
                <NumberEasing
                  value={Number(this.state.buttcoins.spent)}
                  ease="quintOut" // available options https://github.com/mattdesl/eases/blob/master/index.js
                  precision={0}
                  speed={5000}
                  useLocaleString={true}
                />
              </p>
            </Column>
            <Column>
              <h3>Profit</h3>
              <p
                className={
                  Number(this.state.buttcoins.profit) < 0
                    ? "negative"
                    : "positive"
                }
              >
                <NumberEasing
                  value={Number(this.state.buttcoins.profit)}
                  ease="quintOut" // available options https://github.com/mattdesl/eases/blob/master/index.js
                  precision={0}
                  speed={6500}
                  useLocaleString={true}
                />
              </p>
            </Column>
            <Column>
              <Chart>
                {this.state.trends && (
                  <Trend
                    data={this.state.trends}
                    stroke="#3ae06e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    smooth
                    radius={2}
                    autoDraw
                    autoDrawDuration={6500}
                    autoDrawEasing="cubic-bezier(0.23, 1, 0.32, 1)"
                    width={240}
                    height={60}
                  />
                )}
              </Chart>
            </Column>
          </Table>
        </section>
        <section>
          <h2>Activity</h2>
          <ActivityStream>
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
              {this.state.notes.map(note => (
                <ActivityItem key={note.id}>
                  <ActivityInfo>
                    <ActivityLink grab_id={note.meta.grab_id}>
                      <p>
                        {/* User */}@{note.actor.username}
                        {/* Action */}
                        {note.variant === "voice_memo" && (
                          <span> left a voice memo </span>
                        )}
                        {note.variant === "chomment" && (
                          <span> left a chomment </span>
                        )}
                        {note.variant === "at_reply" && (
                          <span> mentioned you in a chomment </span>
                        )}
                        {/* Type */}
                        {note.meta.grab_id && <span>on your grab</span>}
                      </p>
                    </ActivityLink>
                    {/* When you leave a memo on your own stuff */}
                    {/* You mentioned yourself. Good thing it’s here or you might have missed it. */}
                    {/* It’s this annoying bag of bones again. */}
                    {/* Here’s some news for ya... */}
                    {/* Some people wanted to use Screenhole as their online diary, so here’s a chomment you left on your own grab. */}
                    <Memo
                      message={note.meta.summary}
                      username={note.actor.username}
                      gravatar={note.actor.gravatar_hash}
                      variant={note.variant}
                      audio={
                        note.cross_ref && !note.cross_ref.pending
                          ? note.cross_ref.media_public_url
                          : null
                      }
                      hideUsername={true}
                    />
                  </ActivityInfo>
                  <ActivityMeta>
                    {note.meta.buttcoin_earned && (
                      <Buttcoin amount={note.meta.buttcoin_earned} />
                    )}
                    <ActivityLink
                      grab_id={note.meta.grab_id}
                      className="activity-timestamp"
                    >
                      <TimeAgo date={note.created_at} />
                    </ActivityLink>
                  </ActivityMeta>
                </ActivityItem>
              ))}
            </InfiniteScroll>
          </ActivityStream>
        </section>
      </View>
    );
  }
}

class ActivityLink extends Component {
  render() {
    return (
      <Fragment>
        {this.props.grab_id && (
          <Link to={`/grab/~${this.props.grab_id}`} {...this.props}>
            {this.props.children}
          </Link>
        )}
        {!this.props.grab_id && this.props.children}
      </Fragment>
    );
  }
}

const View = styled.div`
  margin-bottom: 6rem;

  section {
    margin-top: 1rem;
    padding: 1rem 0;
    max-width: 1200px;
  }

  section:first-of-type {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  h2,
  h3 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 300;
  }

  h2 {
    color: #fff;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    color: var(--muted-color);
  }

  .positive {
    color: var(--secondary-color);
  }

  .negative {
    color: var(--danger-color);
  }

  .memo-message .buttcoin {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
`;

const Table = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div`
  display: inline-block;
  min-width: 160px;
  margin-bottom: 0.5rem;

  p {
    font-family: "Menlo", monospace;
    font-size: 2rem;
    margin-top: 0.25rem;
  }
`;

const Chart = styled.div``;

const ActivityStream = styled.ul`
  li:not(:last-child) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const ActivityItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  time,
  .activity-timestamp {
    font-size: 0.875rem;
    color: var(--muted-color);
    flex-shrink: 0;
  }

  time,
  .buttcoin,
  .activity-timestamp {
    padding-top: 2rem;
    padding-right: 1rem;
  }

  .activity-timestamp time {
    padding-right: 0;
  }

  .buttcoin {
    padding-left: 1rem;
    padding-right: 2rem;
  }
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  flex-grow: 1;
`;

const ActivityInfo = styled.div`
  > p {
    color: var(--muted-color);
  }
`;
