import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../User/Avatar';

class Chomment extends Component {
  render() {
    return (
      <Wrapper>
        <Link to="/pasquale">
          <Avatar
            src="https://pbs.twimg.com/profile_images/757821676977397760/4VX6_NlV_400x400.jpg"
            username="Mr. Hole"
          />
        </Link>
        <Content>
          <Link to="/pasquale">pasquale</Link>
          <Message>
            I've thieved your buttcoin gif into our Slack. Let me know where to
            send royalties (in buttcoin obv).
          </Message>
        </Content>
      </Wrapper>
    );
  }
}

export default Chomment;

const Wrapper = styled.div`
  display: flex;
  margin: var(--app-padding) 0;

  img {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }

  a {
    flex-shrink: 0;
  }
`;

const Message = styled.p`
  color: var(--muted-color);
  line-height: 1.45;
  font-size: 0.925rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: var(--link-color);
    display: inline-block;
    align-self: flex-start;
    border-bottom: 1px solid transparent;
    margin-bottom: 0.15em;

    &:hover {
      color: #fff;
      border-bottom: 1px solid var(--primary-color);
    }
  }
`;
