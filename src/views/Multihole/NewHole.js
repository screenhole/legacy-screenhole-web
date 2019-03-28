import React, { Component } from "react";
import styled from "styled-components";

import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

export default class NewHole extends Component {
  render() {
    return (
      <Page>
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
          render={({
            pristine,
            values,
          }) => {
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
                      <Label>
                        Name
                      </Label>
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
                      <Label>
                        Subdomain on screenhole.net
                      </Label>
                    </InputWrapper>
                  )}
                </Field>
                <Button type="submit">
                  Go!
                </Button>
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

// lol this should be a component and done with css
const Button = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  padding: 1.25rem;
  border: 0;
  background: 50% no-repeat transparent
    url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDYwMCAxMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+Cjx0aXRsZT5nb2J1dHRvbjwvdGl0bGU+CjxkZXNjPkNyZWF0ZWQgdXNpbmcgRmlnbWE8L2Rlc2M+CjxnIGlkPSJDYW52YXMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03OTA5IC03MzUpIj4KPGcgaWQ9ImdvYnV0dG9uIj4KPGcgaWQ9IlJlY3RhbmdsZSA2Ij4KPG1hc2sgaWQ9Im1hc2swX291dGxpbmVfaW5zIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc5MjUuMjcgNzUzKSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfb3V0bGluZV9pbnMpIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDFfc3Ryb2tlXzJ4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OTI1LjI3IDc1MykiIGZpbGw9IiM2QTQwRUUiLz4KPC9nPgo8L2c+CjxnIGlkPSJSZWN0YW5nbGUgNiI+CjxtYXNrIGlkPSJtYXNrMV9vdXRsaW5lX2lucyI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgyX2ZpbGwiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OTE3LjE0IDc0NCkiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2sxX291dGxpbmVfaW5zKSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgzX3N0cm9rZV8yeCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzkxNy4xNCA3NDQpIiBmaWxsPSIjNkE0MEVFIi8+CjwvZz4KPC9nPgo8ZyBpZD0iUmVjdGFuZ2xlIDYiPgo8bWFzayBpZD0ibWFzazJfb3V0bGluZV9pbnMiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoNF9maWxsIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzkwOSA3MzUpIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMl9vdXRsaW5lX2lucykiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoNV9zdHJva2VfMngiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc5MDkgNzM1KSIgZmlsbD0iIzZBNDBFRSIvPgo8L2c+CjwvZz4KPC9nPgo8L2c+CjxkZWZzPgo8cGF0aCBpZD0icGF0aDBfZmlsbCIgZD0iTSAwIDBMIDU2Ny40NTggMEwgNTY3LjQ1OCA2NUwgMCA2NUwgMCAwWiIvPgo8cGF0aCBpZD0icGF0aDFfc3Ryb2tlXzJ4IiBkPSJNIDAgMEwgMCAtNEwgLTQgLTRMIC00IDBMIDAgMFpNIDU2Ny40NTggMEwgNTcxLjQ1OCAwTCA1NzEuNDU4IC00TCA1NjcuNDU4IC00TCA1NjcuNDU4IDBaTSA1NjcuNDU4IDY1TCA1NjcuNDU4IDY5TCA1NzEuNDU4IDY5TCA1NzEuNDU4IDY1TCA1NjcuNDU4IDY1Wk0gMCA2NUwgLTQgNjVMIC00IDY5TCAwIDY5TCAwIDY1Wk0gMCA0TCA1NjcuNDU4IDRMIDU2Ny40NTggLTRMIDAgLTRMIDAgNFpNIDU2My40NTggMEwgNTYzLjQ1OCA2NUwgNTcxLjQ1OCA2NUwgNTcxLjQ1OCAwTCA1NjMuNDU4IDBaTSA1NjcuNDU4IDYxTCAwIDYxTCAwIDY5TCA1NjcuNDU4IDY5TCA1NjcuNDU4IDYxWk0gNCA2NUwgNCAwTCAtNCAwTCAtNCA2NUwgNCA2NVoiLz4KPHBhdGggaWQ9InBhdGgyX2ZpbGwiIGQ9Ik0gMCAwTCA1ODMuNzI5IDBMIDU4My43MjkgODNMIDAgODNMIDAgMFoiLz4KPHBhdGggaWQ9InBhdGgzX3N0cm9rZV8yeCIgZD0iTSAwIDBMIDAgLTRMIC00IC00TCAtNCAwTCAwIDBaTSA1ODMuNzI5IDBMIDU4Ny43MjkgMEwgNTg3LjcyOSAtNEwgNTgzLjcyOSAtNEwgNTgzLjcyOSAwWk0gNTgzLjcyOSA4M0wgNTgzLjcyOSA4N0wgNTg3LjcyOSA4N0wgNTg3LjcyOSA4M0wgNTgzLjcyOSA4M1pNIDAgODNMIC00IDgzTCAtNCA4N0wgMCA4N0wgMCA4M1pNIDAgNEwgNTgzLjcyOSA0TCA1ODMuNzI5IC00TCAwIC00TCAwIDRaTSA1NzkuNzI5IDBMIDU3OS43MjkgODNMIDU4Ny43MjkgODNMIDU4Ny43MjkgMEwgNTc5LjcyOSAwWk0gNTgzLjcyOSA3OUwgMCA3OUwgMCA4N0wgNTgzLjcyOSA4N0wgNTgzLjcyOSA3OVpNIDQgODNMIDQgMEwgLTQgMEwgLTQgODNMIDQgODNaIi8+CjxwYXRoIGlkPSJwYXRoNF9maWxsIiBkPSJNIDAgNUMgMCAyLjIzODU4IDIuMjM4NTggMCA1IDBMIDU5NSAwQyA1OTcuNzYxIDAgNjAwIDIuMjM4NTggNjAwIDVMIDYwMCA5NUMgNjAwIDk3Ljc2MTQgNTk3Ljc2MSAxMDAgNTk1IDEwMEwgNSAxMDBDIDIuMjM4NTggMTAwIDAgOTcuNzYxNCAwIDk1TCAwIDVaIi8+CjxwYXRoIGlkPSJwYXRoNV9zdHJva2VfMngiIGQ9Ik0gNSA0TCA1OTUgNEwgNTk1IC00TCA1IC00TCA1IDRaTSA1OTYgNUwgNTk2IDk1TCA2MDQgOTVMIDYwNCA1TCA1OTYgNVpNIDU5NSA5NkwgNSA5NkwgNSAxMDRMIDU5NSAxMDRMIDU5NSA5NlpNIDQgOTVMIDQgNUwgLTQgNUwgLTQgOTVMIDQgOTVaTSA1IC00QyAwLjAyOTQzNzMgLTQgLTQgMC4wMjk0MzczIC00IDVMIDQgNUMgNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMIDUgLTRaTSA1OTUgNEMgNTk1LjU1MiA0IDU5NiA0LjQ0NzcyIDU5NiA1TCA2MDQgNUMgNjA0IDAuMDI5NDM3MyA1OTkuOTcxIC00IDU5NSAtNEwgNTk1IDRaTSA1OTYgOTVDIDU5NiA5NS41NTIzIDU5NS41NTIgOTYgNTk1IDk2TCA1OTUgMTA0QyA1OTkuOTcxIDEwNCA2MDQgOTkuOTcwNiA2MDQgOTVMIDU5NiA5NVpNIDUgOTZDIDQuNDQ3NzIgOTYgNCA5NS41NTIzIDQgOTVMIC00IDk1QyAtNCA5OS45NzA2IDAuMDI5NDM3MyAxMDQgNSAxMDRMIDUgOTZaIi8+CjwvZGVmcz4KPC9zdmc+Cg==");
  background-size: contain;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
  outline: none;
  margin-top: 2rem;

  &:active {
    transform: scale(0.92);
  }
`;
