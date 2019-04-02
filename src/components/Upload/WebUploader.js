import React, { Component } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";

import AuthContainer from "../../utils/AuthContainer";

export default class WebUploader extends Component {
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <div>
            {auth.state.uploader && (
              <UploadModal>
                <CloseButton onClick={() => auth.toggleUploader("off")}>
                  {closeIcon}
                </CloseButton>
                <h3>Post a grab</h3>
                <p>
                  Upload those juicy <strong>.jpg</strong>,{" "}
                  <strong>.png</strong>, and <strong>.gif</strong> grabs (max
                  10MB)
                </p>
                <Caption>
                  <input type="file" />
                </Caption>
                <Caption>
                  <span>Caption</span>
                  <textarea cols="30" rows="3" />
                </Caption>
                <div className="center-it">
                  <Button>Upload!</Button>
                </div>
              </UploadModal>
            )}
          </div>
        )}
      </Subscribe>
    );
  }
}

const UploadModal = styled.div`
  position: fixed;
  top: calc(64px - 0.25rem);
  right: 1.5rem;
  width: 515px;
  padding: 2rem 3rem;
  background-color: black;
  box-shadow: 0 0 0 4px var(--primary-color), 0 4px 15px 0 rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  z-index: 999;
  animation: jellyReveal 0.65s linear both;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  transform-origin: 40% -20%;

  &::after {
    content: "";
    position: absolute;
    top: -13px;
    right: 290px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7px 10px;
    border-color: transparent transparent #6a40ee;
  }

  h3,
  p {
    text-align: center;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin: 0.5rem 0;
    color: var(--muted-color);
    font-size: 0.875rem;
  }

  strong {
    font-weight: normal;
    color: var(--primary-color);
  }

  .center-it {
    display: flex;
    justify-content: center;
  }
`;

const CloseButton = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  outline: none;
  color: white;
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
  transition: 0.15s ease all;

  @media (pointer: fine) {
    &:hover,
    &:focus {
      color: var(--primary-color);
      cursor: pointer;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const Caption = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > span {
    color: var(--muted-color);
  }

  textarea {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    border: none;
    box-shadow: none;
    color: white;
    transition: 0.25s ease all;

    &:focus {
      background-color: var(--primary-color);
      outline: none;
    }
  }

  input[type="file"] {
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
  margin-bottom: 0.125rem;
  margin-top: 1rem;
`;

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1={18} y1={6} x2={6} y2={18} />
    <line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);
