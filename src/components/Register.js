import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormDiv,
  Button,
  Input,
  PasswordChecks,
  Check,
  toastConfig,
} from "./styledElements";
import styled from "styled-components";
import { CheckSquare, XCircle } from "react-feather";

const LoginButton = styled.button`
  border: none;
  border-bottom: solid 1px black;
  outline: none;
  cursor: pointer;
  font-family: "Roboto Condensed", sans-serif;
  background: none;
  font-size: 16px;
  transition: all 0.3s;
  &:hover {
    background-color: #212a31;
    color: white;
    transform: scale(1.2);
    border: solid 1px white;
    border-radius: 0.4rem;
  }
`;

function Register({ handleRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const validate = (e, params) => {
    if (!passwordsMatch) {
      toast.error("Passwords do not match.", toastConfig);
      e.preventDefault();
    }

    if (!email) {
      setEmailError(true);
      //toast.error('Please enter an email address.', toastConfig);
      e.preventDefault();
    }

    if (!username) {
      setUsernameError(true);
      //toast.error('Please enter a username.', toastConfig);
      e.preventDefault();
    }
    if (username && email && passwordsMatch) {
      params = { email, password, username };
      handleRegister(e, params);
    }
  };

  const characterCountRegex = /.{8,}/;
  const uppercaseRegex = /(?=.*?[A-Z])/;
  const specialCharacterRegex = /(?=.*?[#?!@$%^&*-])/;
  const digitRegex = /(?=.*?[0-9])/;

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  useEffect(() => {
    email && setEmailError(false);
    username && setUsernameError(false);
  }, [email, username]);

  return (
    <Fragment>
      <ToastContainer />
      <div
        className="header"
        style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}
      >
        <h1>
          Welcome to Apple Shop <i className="fab fa-apple"></i>
        </h1>
      </div>
      <FormDiv style={{ top: "60px", width: "340px" }}>
        <form onSubmit={validate}>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {usernameError && (
            <>
              <span style={{ fontSize: "14px", color: "red" }}>
                Please enter a username
              </span>
              <br />
            </>
          )}
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {emailError && (
            <>
              <span style={{ fontSize: "14px", color: "red" }}>
                Please enter an email address
              </span>
              <br />
            </>
          )}
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          {password && (
            <PasswordChecks>
              <Check>
                {characterCountRegex.test(password) ? (
                  <CheckSquare
                    size={20}
                    style={{ marginRight: "0.5rem", color: "green" }}
                  />
                ) : (
                  <XCircle
                    size={20}
                    style={{ marginRight: "0.5rem", color: "red" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>
                  Password must contain atleast 8 characters
                </span>
              </Check>
              <Check>
                {uppercaseRegex.test(password) ? (
                  <CheckSquare
                    size={20}
                    style={{ marginRight: "0.5rem", color: "green" }}
                  />
                ) : (
                  <XCircle
                    size={20}
                    style={{ marginRight: "0.5rem", color: "red" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>
                  Password must contain atleast one uppercase
                </span>
              </Check>
              <Check>
                {digitRegex.test(password) ? (
                  <CheckSquare
                    size={20}
                    style={{ marginRight: "0.5rem", color: "green" }}
                  />
                ) : (
                  <XCircle
                    size={20}
                    style={{ marginRight: "0.5rem", color: "red" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>
                  Password must contain atleast one digit
                </span>
              </Check>
              <Check>
                {specialCharacterRegex.test(password) ? (
                  <CheckSquare
                    size={20}
                    style={{ marginRight: "0.5rem", color: "green" }}
                  />
                ) : (
                  <XCircle
                    size={20}
                    style={{ marginRight: "0.5rem", color: "red" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>
                  Password must contain atleast one special character
                </span>
              </Check>
            </PasswordChecks>
          )}
          <Input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          {confirmPassword && (
            <PasswordChecks style={{ height: "auto" }}>
              <Check>
                {passwordsMatch ? (
                  <CheckSquare
                    size={20}
                    style={{ marginRight: "0.5rem", color: "green" }}
                  />
                ) : (
                  <XCircle
                    size={20}
                    style={{ marginRight: "0.5rem", color: "red" }}
                  />
                )}
                <span style={{ fontSize: "14px" }}>
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </span>
              </Check>
            </PasswordChecks>
          )}
          <Button
            disabled={!passwordsMatch || !passwordRegex.test(password)}
            type="submit"
          >
            Register
          </Button>
        </form>
        <footer>
          <Link to="/apple_shop">
            <LoginButton>Log in instead?</LoginButton>
          </Link>
        </footer>
      </FormDiv>
    </Fragment>
  );
}

export default Register;
