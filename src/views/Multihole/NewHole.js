import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

const HideChat = createGlobalStyle`
  #ChommentStream { display: none; }
  main { padding-left: var(--app-padding) !important; }
`;

export default class NewHole extends Component {
  render() {
    return (
      <Page>
        <HideChat />
        <h1>
          Create a new hole <Badge>BETA</Badge>
        </h1>
        <p>Want to start your own community on Screenhole? Right this way.</p>
        <CoolListOfThings>
          <CoolThing>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            For friends or cool brands
          </CoolThing>
          <CoolThing>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Gather around a topic or go wild
          </CoolThing>
          <CoolThing>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Invite-only so you can keep the creeps out
          </CoolThing>
        </CoolListOfThings>

        <Form
          render={({ pristine, values }) => {
            return (
              <Wrapper>
                <Field name="name">
                  {({ input, meta }) => (
                    <InputWrapper>
                      <Input
                        {...input}
                        type="text"
                        placeholder="e.g. Hole Foods Buttcoin Market"
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                      />
                      <Label>Name</Label>
                    </InputWrapper>
                  )}
                </Field>
                <Field name="domain">
                  {({ input, meta }) => (
                    <InputWrapper>
                      <Input
                        {...input}
                        type="text"
                        placeholder="holefoods"
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                      />
                      <Label>Subdomain on screenhole.net</Label>
                    </InputWrapper>
                  )}
                </Field>
                <Button type="submit">Go!</Button>
              </Wrapper>
            );
          }}
        />
      </Page>
    );
  }
}

const Page = styled.div`
  h1 {
    margin-bottom: 1rem;
  }

  p {
    color: var(--muted-color);
  }
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  color: white;
  font-weight: bold;
  background-color: var(--primary-color);
  border-radius: 0.25rem;
  padding: 0.25em 0.5em;
  padding-right: 0.4em;
  ${"" /* weird font, i know */}
  line-height: 1;
  letter-spacing: 0.05em;
  position: relative;
  top: -0.5rem;
`;

const CoolListOfThings = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 2rem;
  list-style: none;
`;

const CoolThing = styled.li`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  svg {
    font-size: 2rem;
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }

  &:nth-child(1) svg {
    color: HSLA(339, 82%, 59%, 1);
  }

  &:nth-child(2) svg {
    color: var(--primary-color);
  }

  &:nth-child(3) svg {
    color: var(--buttcoin-color);
  }
`;

// Form stuff temp
const Wrapper = styled.form`
  max-width: 500px;
  margin-top: 1rem;

  > p {
    color: #858090;
    margin-top: 1rem;
    line-height: 150%;
  }
`;

const InputWrapper = styled.div`
  margin: 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 0.75rem 0;
  font-size: 1.75rem;
  border: 0;
  border-bottom: 2px solid var(--input-color);
  background-color: transparent;
  transition: all 0.2s ease;
  color: #fff;
  outline: none;

  &:focus {
    color: #fff;
    border-color: #fff;
  }

  ::-webkit-input-placeholder {
    color: var(--input-color);
  }
  ::-moz-placeholder {
    color: var(--input-color);
  }
  :-ms-input-placeholder {
    color: var(--input-color);
  }
  :-moz-placeholder {
    color: var(--input-color);
  }
`;

const Label = styled.label`
  color: var(--input-color);
  margin-top: 0.75rem;
  margin-bottom: 1.25rem;
  display: block;

  span {
    color: red;
  }
`;

const Button = styled.button`
  background: linear-gradient(HSLA(255, 83%, 58%, 1), HSLA(255, 83%, 48%, 1));
  box-shadow: inset 0 1px 0 0 HSLA(255, 83%, 65%, 1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: 0.25s ease all, 0.15s ease box-shadow;
  position: relative;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
