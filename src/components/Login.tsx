import { useRef, Fragment, FormEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormDiv, Button, Input } from "./styledElements";

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

function Login({
  handleLogin,
}: {
  handleLogin: (
    e: FormEvent,
    params: { email: string; password: string }
  ) => Promise<void>;
}) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    const params = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
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
