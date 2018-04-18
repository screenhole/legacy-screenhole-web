import React, { Component } from "react";
import styled from "styled-components";
import Trend from "react-trend";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import InfiniteScroll from "react-infinite-scroller";

import Memo from "../../components/Memo/Memo";
import Buttcoin from "../../components/Buttcoin/Buttcoin";

import loader from "../../images/loader.gif";

import api from "../../utils/api";

export default class Activity extends Component {
  state = {
    notes: [],
    hasMore: true,
    loading: true,
  };

  loadMore = async page => {
    let res = await api.get(`/sup?page=${page}`);

    if (!res.ok) {
      return this.setState({ hasMore: false });
    }

    this.setState({
      notes: [...this.state.notes, ...res.data.notes],
      loading: false,
    });

    if (!res.data.meta.next_page) {
      this.setState({ hasMore: false, loading: false });
    }
  };

  render() {
    return (
      <View>
        <h1>SUP?</h1>
        <section>
          <h2>Your daily buttcoin digestif</h2>
          <Table>
            <Column>
              <h3>Earned</h3>
              <p className="positive">7,234</p>
            </Column>
            <Column>
              <h3>Spent</h3>
              <p className="negative">2,452</p>
            </Column>
            <Column>
              <h3>Profit</h3>
              <p className="positive">4,782</p>
            </Column>
            <Column>
              <Chart>
                <Trend
                  data={[12, 10, 8, 2, 9, 16, 12, 6, 5, 8, 12, 21]}
                  stroke="#3ae06e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  smooth
                  radius={2}
                  autoDraw
                  autoDrawDuration={1500}
                  autoDrawEasing="cubic-bezier(0.23, 1, 0.32, 1)"
                  width={240}
                  height={60}
                />
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
                    <p>
                      {/* When you leave a memo on your own stuff */}
                      {/* You mentioned yourself. Good thing it’s here or you might have missed it. */}
                      {/* It’s this annoying bag of bones again. */}
                      {/* Here’s some news for ya... */}
                      {/* Some people wanted to use Screenhole as their online diary, so here’s a chomment you left on your own grab. */}
                      New {note.cross_ref_type}
                      {note.meta.grab_id ? (
                        <span>
                          {" "}
                          on{" "}
                          <Link to={`/grab/~${note.meta.grab_id}`}>
                            your grab
                          </Link>
                        </span>
                      ) : (
                        <span> mentioning you</span>
                      )}
                      {/* @ralph left a voice memo on your grab */}
                      {/* @ralph mentioned you in a chomment */}
                    </p>
                    <Memo
                      message={note.meta.summary}
                      username={note.actor.username}
                      gravatar={note.actor.gravatar_hash}
                      variant={note.variant}
                      audio={note.cross_ref.media_public_url}
                    />
                  </ActivityInfo>
                  {note.meta.buttcoin_earned && (
                    <Buttcoin amount={note.meta.buttcoin_earned} />
                  )}
                  <TimeAgo date={note.created_at} />
                </ActivityItem>
              ))}
            </InfiniteScroll>
          </ActivityStream>
        </section>
      </View>
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
`;

const Table = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div`
  display: inline-block;
  min-width: 200px;
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
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  time {
    font-size: 0.875rem;
    color: var(--muted-color);
    flex-shrink: 0;
    text-align: right;
  }

  time,
  .buttcoin {
    padding-top: 2rem;
    padding-right: 1rem;
  }

  .buttcoin {
    padding-left: 1rem;
  }
`;

const ActivityInfo = styled.div`
  > p {
    color: var(--muted-color);
  }
`;
