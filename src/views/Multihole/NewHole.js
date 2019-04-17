import React, { Component } from "react";
import styled from "styled-components";
import HideChat from "../../utils/HideChat";

export default class NewHole extends Component {
  render() {
    return (
      <Page>
        <HideChat />
        <h3>this doesn’t work yet</h3>
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

        <InputGroup>
          <InputWrapper>
            <Label>
              <span>Hole Name</span>
              <Input type="text" />
            </Label>
          </InputWrapper>
          <InputWrapper>
            <Label>
              <span>Subdomain</span>
              <Input type="text" />
            </Label>
          </InputWrapper>
          <InputWrapper>
            <Button>Create hole</Button>
          </InputWrapper>
        </InputGroup>
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

const InputGroup = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 1rem 2rem;
  align-items: end;
  margin-top: 2rem;
`;

const InputWrapper = styled.div``;

const Label = styled.label`
  color: var(--muted-color);
  font-size: 1rem;
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1.25rem;
  border: none;
  box-shadow: none;
  color: white;
  transition: 0.25s ease all;

  &:focus {
    box-shadow: 0 0 0 4px black, 0 0 0 6px var(--primary-color);
    outline: none;
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
