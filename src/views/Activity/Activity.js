import React, { Component } from "react";
import styled from "styled-components";
import Trend from "react-trend";
import { Link } from "react-router-dom";

import Memo from "../../components/Memo/Memo";

export default class Activity extends Component {
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
                  width="240"
                  height="60"
                />
              </Chart>
            </Column>
          </Table>
        </section>
        <section>
          <h2>Activity</h2>
          <ActivityStream>
            <li>
              <ActivityInfo>
                <p>
                  New chomment on <Link to="">your grab</Link>
                </p>
                <time>2 minutes ago</time>
              </ActivityInfo>
              <Memo
                key={0}
                message="Send me 0.6 $butt and I will send you 6 $butt back"
                username="jacob"
                gravatar="jacob"
                variant="chomment"
              />
            </li>
            <li>
              <ActivityInfo>
                <p>
                  New mention on <Link to="">@jacob’s grab</Link>
                </p>
                <time>2 minutes ago</time>
              </ActivityInfo>
              <Memo
                key={1}
                message="tite @mrhole"
                username="pasquale"
                gravatar="pasquale"
                variant="chomment"
              />
            </li>
            <li>
              <ActivityInfo>
                <p>
                  New voice memo on <Link to="">your grab</Link>
                </p>
                <time>2 minutes ago</time>
              </ActivityInfo>
              <Memo
                key={2}
                message="I like bug butts and I cannot lie"
                username="jacob"
                gravatar="jacob"
                audio="whoops.mp3"
              />
            </li>
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
`;

const Column = styled.div`
  display: inline-block;
  min-width: 240px;
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

const ActivityInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  p {
    color: var(--muted-color);
  }

  time {
    font-size: 0.875rem;
    color: var(--muted-color);
    flex-shrink: 0;
  }
`;
