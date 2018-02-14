import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { ActionCable } from 'react-actioncable-provider';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

import AuthContainer from '../../utils/AuthContainer';

import api from '../../utils/api';

import Chomment from '../../components/Chomment/Chomment';

class ChommentStream extends Component {
  constructor() {
    super();

    this.state = {
      chomments: false,
    };
  }

  async componentWillMount() {
    const chomments = await api.get(`/chomments`);

    if (chomments.ok) {
      this.setState({
        chomments: chomments.data.chomments.reverse()
      });
    }
  }

  onReceived = (data) => {
    this.setState({
      chomments: [
        ...this.state.chomments,
        data.chomment
      ]
    })
  }

  submitMessage = async (values) => {
    if (! values.message) return;

    let message = values.message;
    values.message = '';

    const res = await api.post("/chomments", { "chomment": { message: message } });
  }

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <Chomments>
            <InnerChomments>
              <ActionCable channel={{channel: 'ChommentsChannel'}} onReceived={this.onReceived} />
              {this.state.chomments
                ? this.state.chomments.map(chomment => (
                    <Chomment
                      username={chomment.user.username}
                      message={chomment.message}
                      gravatar={chomment.user.gravatar_hash}
                      variant={chomment.variant}
                      reference={chomment.cross_ref}
                      key={chomment.id}
                    />
                  ))
                : 'Stacking up them Chomments...'}
            </InnerChomments>

            {auth.state.authenticated &&
              <Form
                onSubmit={this.submitMessage}
                render={({ handleSubmit, values }) => {
                  return (
                    <ChommentInputWrapper onSubmit={handleSubmit}>
                      <Field name="message">
                        {({ input, meta }) => (
                          <Input {...input} type="text" placeholder="Type some chomments" />
                        )}
                      </Field>
                    </ChommentInputWrapper>
                  )
                }
              }
              />
            }
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
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overscroll-behavior: contain;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left 20%,
    left top,
    from(#000),
    to(rgba(0, 0, 0, 0))
  );

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

const InnerChomments = styled.div`
  padding-top: 2rem;
`;

const ChommentInputWrapper = styled.form`
  display: block;
  position: fixed;
  width: calc(var(--sidebar-width) - 1px);
  bottom: 0;
  left: 0;

  @media (max-width: 790px) {
    width: 100%;
    bottom: var(--nav-height);
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1rem;
  color: #fff;
  border: 0;
  border-top: 1px solid #222;
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
