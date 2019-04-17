import React, { Component } from "react";
import styled from "styled-components";

export default class Rules extends Component {
  constructor() {
    super();

    // temp
    this.state = {
      chomments: true,
      webUpload: false,
      views: true,
      sfw: false,
    };
  }

  handleRule = name => {
    this.setState({
      [name]: !this.state[name],
    });
  };

  render() {
    return (
      <Page>
        <h3>this doesn’t work yet</h3>
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
            onClick={() => this.handleRule("chomments")}
            enabled={this.state.chomments}
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
            <RuleStatus>{this.state.chomments ? "ON" : "OFF"}</RuleStatus>
          </Rule>
          <Rule
            onClick={() => this.handleRule("webUpload")}
            enabled={this.state.webUpload}
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
            <RuleStatus>{this.state.webUpload ? "ON" : "OFF"}</RuleStatus>
          </Rule>
          <Rule
            onClick={() => this.handleRule("views")}
            enabled={this.state.views}
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
            <RuleName>Views</RuleName>
            <RuleStatus>{this.state.views ? "ON" : "OFF"}</RuleStatus>
          </Rule>
          <Rule onClick={() => this.handleRule("sfw")} enabled={this.state.sfw}>
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
                <line x1={4} y1={9} x2={20} y2={9} />
                <line x1={4} y1={15} x2={20} y2={15} />
                <line x1={10} y1={3} x2={8} y2={21} />
                <line x1={16} y1={3} x2={14} y2={21} />
              </svg>
            </RuleIcon>
            <RuleName>SFW</RuleName>
            <RuleStatus>{this.state.sfw ? "ON" : "OFF"}</RuleStatus>
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
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 1rem 2rem;
  align-items: end;
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
