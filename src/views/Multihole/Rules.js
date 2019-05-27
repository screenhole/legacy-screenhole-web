import React, { Component } from "react";
import styled from "styled-components";

import api from "../../utils/api";
import subdomain from "../../utils/subdomain";

export default class Rules extends Component {
  constructor() {
    super();

    // temp
    this.state = {
      chat_enabled: true,
      chomments_enabled: true,
      web_upload_enabled: true,
      private_grabs_enabled: false,
    };
  }

  componentDidMount = async () => {
    let res = await api.get(`/api/v2/holes/${subdomain}`);

    if (res.ok) {
      console.log(res.data.hole);

      this.setState({
        ...res.data.hole.rules,
      });
    }
  };

  handleRule = async name => {
    this.setState(
      {
        [name]: !this.state[name],
      },
      async () => {
        let res = await api.put(`/api/v2/holes/${subdomain}`, {
          rules: { ...this.state },
        });

        console.log(res.data);
      },
    );
  };

  render() {
    return (
      <Page>
        <h1>Rules</h1>
        <p>Shape your community by setting your own rules.</p>
        <hr />
        <InputGroup>
          <InputWrapper>
            <Label>
              <span>Name</span>
              <Input type="text" value="holefoods" />
            </Label>
          </InputWrapper>
          <InputWrapper>
            <Label>
              <span>Subdomain</span>
              <Input type="text" value="holefoods" />
            </Label>
          </InputWrapper>
          <InputWrapper>
            <Button>Save</Button>
          </InputWrapper>
        </InputGroup>

        <hr />

        <Grid>
          <Rule
            onClick={() => this.handleRule("chomments_enabled")}
            enabled={this.state.chomments_enabled}
          >
            <RuleIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </RuleIcon>
            <RuleName>Chomments</RuleName>
            <RuleStatus>
              {this.state.chomments_enabled ? "ON" : "OFF"}
            </RuleStatus>
          </Rule>
          <Rule
            onClick={() => this.handleRule("web_upload_enabled")}
            enabled={this.state.web_upload_enabled}
          >
            <RuleIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                <path d="M16 16l-4-4-4 4" />
              </svg>
            </RuleIcon>
            <RuleName>Web Upload</RuleName>
            <RuleStatus>
              {this.state.web_upload_enabled ? "ON" : "OFF"}
            </RuleStatus>
          </Rule>
          <Rule
            onClick={() => this.handleRule("private_grabs_enabled")}
            enabled={this.state.private_grabs_enabled}
          >
            <RuleIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </RuleIcon>
            <RuleName>Private Grabs</RuleName>
            <RuleStatus>
              {this.state.private_grabs_enabled ? "ON" : "OFF"}
            </RuleStatus>
          </Rule>
        </Grid>
      </Page>
    );
  }
}

const Page = styled.div`
  h1 {
    margin-bottom: 0;
  }
  hr {
    border-color: var(--super-muted-color);
    margin: 2rem 0;
  }

  > p {
    color: var(--muted-color);
  }

  &::after {
    content: "Available soon.";
    display: block;
    position: relative;
    margin-top: 2rem;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 1rem 2rem;
  align-items: end;

  ${"" /* temp disable */}
  opacity: 0.5;
  pointer-events: none;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 2rem;

  ${"" /* temp disable */}
  opacity: 0.5;
  pointer-events: none;
`;

const Rule = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.07)
  );
  padding: 1rem;
  border-radius: 8px;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
  transition: 0.25s ease all, 0.15s ease box-shadow;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 4.5rem;

  @media (pointer: fine) {
    &:hover,
    &:focus {
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 0 0 3px black,
        0 0 0 5px rgba(255, 255, 255, 0.15);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  ${props =>
    props.enabled &&
    `background: linear-gradient(HSLA(255, 83%, 58%, 1), HSLA(255, 83%, 48%, 1)); box-shadow: inset 0 1px 0 0 HSLA(255, 83%, 65%, 1);`}
`;

const RuleIcon = styled.div`
  margin-right: 1rem;
  position: relative;
  top: 2px;
`;

const RuleName = styled.div`
  font-size: 1.25rem;
`;

const RuleStatus = styled.div`
  display: inline-block;
  text-align: right;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.25em 0.5em;
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
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
  margin-bottom: 0.125rem;
`;
