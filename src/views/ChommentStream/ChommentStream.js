import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Subscribe } from 'unstated';
import { ActionCable } from 'react-actioncable-provider';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

import AuthContainer from '../../utils/AuthContainer';

import api from '../../utils/api';

import Chomment from '../../components/Chomment/Chomment';

import loader from '../../images/loader.gif';

class ChommentStream extends Component {
  state = {
    hasMore: true,
    chomments: [],
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
  };

  submitMessage = async values => {
    if (!values.message) return;

    let message = values.message;
    values.message = '';

    await api.post('/chomments', { chomment: { message: message } });
  };

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
        />,
      ),
    );

    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Chomments authenticated={auth.state.authenticated}>
            <ActionCable
              channel={{ channel: 'ChommentsChannel' }}
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
                    </ChommentInputWrapper>
                  );
                }}
              />
            )}
          </Chomments>
        )}
      </Subscribe>
    );
  }
}

export default ChommentStream;

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
    props.authenticated ? '4rem' : 'calc(var(--app-padding) / 2)'};
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
    background-color: var(--body-bg-color);
    height: calc(100% - var(--nav-height) * 2);
    ${'' /* -webkit-overflow-scrolling: touch; */};
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
