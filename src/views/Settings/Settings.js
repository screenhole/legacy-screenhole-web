import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import styled from "styled-components";

import api from "../../utils/api";

const onSubmit = async values => {
  const update = await api.post("/users/current", { auth: values });
  console.log(update);

  if (!update.ok) {
    return { [FORM_ERROR]: "Edit Settings Failed" };
  }

  const currentUser = await api.get("/users/current");
  console.log(currentUser);

  if (!currentUser.ok) {
    return { [FORM_ERROR]: "Edit Settings Failed [2]" };
  }

  api.setCurrentUser(currentUser.data.user);

  // TODO: update state without hard reload
  // TODO: pass thru AuthContainer
  // this.props.history
  window.location = "/";
};

class Settings extends Component {
  state = {
    countries: [],
  };

  async componentDidMount() {
    const countries = await api.get(`/countries`);

    if (!countries.ok) {
      return;
    }

    this.setState({ countries: countries.data.countries });
  }

  render() {
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={api.currentUser}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          }

          if (!values.username) {
            errors.username = "Required";
          }

          return errors;
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
              <h1>Settings</h1>

              <p>
                If you want to change your avatar, go to{" "}
                <a
                  href="https://gravatar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gravatar.com
                </a>{" "}
                and link it up to your Screenhole email address.
              </p>

              <Field name="email">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="email"
                      placeholder="you@email.com"
                      autoCapitalize="off"
                      autoCorrect="off"
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
                    <Input
                      {...input}
                      type="text"
                      placeholder="username"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                    <Label>
                      Username{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>
              <Field name="name">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="text"
                      placeholder="Spiderman Jones"
                    />
                    <Label>
                      Name{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>
              <Field name="bio">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="text"
                      placeholder="Tell us about yerself"
                      autoComplete="off"
                    />
                    <Label>
                      Bio{" "}
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
                      placeholder="new password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellcheck="false"
                      autoComplete="off"
                    />
                    <Label>
                      Leave blank to not change{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>
              <Field name="password_confirmation">
                {({ input, meta }) => (
                  <InputWrapper>
                    <Input
                      {...input}
                      type="password"
                      placeholder="new password confirmation"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellcheck="false"
                      autoComplete="off"
                    />
                    <Label>
                      Leave blank to not change{" "}
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </Label>
                  </InputWrapper>
                )}
              </Field>

              {submitError && <div className="error">{submitError}</div>}

              <Button type="submit" disabled={submitting}>
                Go!
              </Button>
            </Wrapper>
          );
        }}
      />
    );
  }
}

export default Settings;

const Wrapper = styled.form`
  max-width: 320px;
  margin: 0 auto;

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

const Select = styled.select`
  appearance: textfield;
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
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`;

const Option = styled.option``;

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

  &:active {
    transform: scale(0.92);
  }
`;
