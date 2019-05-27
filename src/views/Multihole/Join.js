import React, { Component } from "react";
import styled from "styled-components";

import Button from "../../components/Button/Button";

export default class Join extends Component {
  render() {
    return (
      <Page>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={64}
          height={64}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
        <h1>Join another hole</h1>
        <p>
          Got an invite code? Cool. Paste it below for access to another
          dimension.
        </p>

        <InputGroup>
          <InputWrapper>
            <Label>
              <Input type="text" placeholder="abcd1234" />
            </Label>
          </InputWrapper>
          <InputWrapper>
            <Button>Accept invite</Button>
          </InputWrapper>
        </InputGroup>
      </Page>
    );
  }
}

const Page = styled.div`
  > svg {
    color: var(--primary-color);
  }

  h1 {
    margin: 1rem 0;
  }

  p {
    color: var(--muted-color);
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1rem;
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
