import React, { useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormDiv, Button, Input } from "./styledElements";

function Login({ handleLogin }) {
  const RegisterButton = styled.button`
    border: none;
    border-bottom: solid 1px #212a31;
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
      margin-left: 10px;
    }
  `;

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    const params = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    handleLogin(e, params);
  };

  return (
    <Fragment>
      <div
        className="header"
        style={{ display: "flex", justifyContent: "center", fontSize: "24px" }}
      >
        <h1 style={{ textAlign: "center" }}>
          Welcome to Apple Shop <i className="fab fa-apple"></i>
        </h1>
      </div>
      <FormDiv>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            ref={emailRef}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <br></br>
          <Button type="submit">Login</Button>
        </form>
        <footer>
          New user?{" "}
          <Link to="/apple_shop/register">
            <RegisterButton>Register here</RegisterButton>
          </Link>
        </footer>
      </FormDiv>
    </Fragment>
  );
}

export default Login;
