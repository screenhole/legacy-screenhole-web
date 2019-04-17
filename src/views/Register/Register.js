import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import Media from "react-media";
import styled from "styled-components";

import api from "../../utils/api";

import Button from "../../components/Button/Button";

const onSubmit = async values => {
  const register = await api.post("/users", { auth: values });
  console.log(register);

  if (!register.ok) {
    api.resetLocalStorage();
    return { [FORM_ERROR]: "Registration Failed" };
  }

  api.setAuthHeader(register.data.meta.jwt);

  api.setCurrentUser(register.data.user);

  if (true || !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    window.location = "screenhole:///jwt/" + register.data.meta.jwt;
  }

  // wait for screenhole:/// call
  setTimeout(() => {
    // TODO: update state without hard reload
    // TODO: pass thru AuthContainer
    // this.props.history
    window.location = "/";
  }, 250);
};

class Register extends Component {
  render() {
    return (
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          }

          if (!values.username) {
            errors.username = "Required";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.code) {
            errors.code = "Required";
          }

          return errors;
        }}
        initialValues={{
          code: this.props.match.params.code,
        }}
        render={({
          handleSubmit,
          submitError,
          pristine,
          submitting,
          values,
        }) => {
          return (
            <Wrapper onSubmit={handleSubmit}>
              <h1>Register</h1>

              <Field name="email">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="email"
                      placeholder="Email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellcheck="false"
                    />
                    <Label>
                      Email{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>
              <Field name="username">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input {...input} type="text" placeholder="Username" />
                    <Label>
                      Username{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="password"
                      placeholder="Password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellcheck="false"
                      autoComplete="off"
                    />
                    <Label>
                      Password{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>

              {this.props.match.params.code && (
                <Field component="input" type="hidden" name="code" />
              )}

              {!this.props.match.params.code && (
                <Field name="code">
                  {({ input, meta }) => (
                    <InputWrapper>
                      <Input
                        {...input}
                        type="input"
                        placeholder="Invite Code"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellcheck="false"
                        autoComplete="off"
                        value={this.props.match.params.code || input.value}
                      />
                      <Label>
                        Invite Code{" "}
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span>{meta.error || meta.submitError}</span>
                        )}
                      </Label>
                    </InputWrapper>
                  )}
                </Field>
              )}

              {submitError && <div className="error">{submitError}</div>}
              <Button type="submit" disabled={submitting}>
                Go!
              </Button>

              <Media query="(max-width: 791px)">
                <Label>
                  By registering you agree to the <a href="/eula">EULA</a> &amp;{" "}
                  <a href="/privacy">Privacy Policy</a>
                </Label>
              </Media>
            </Wrapper>
          );
        }}
      />
    );
  }
}

export default Register;

const Wrapper = styled.form`
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
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
