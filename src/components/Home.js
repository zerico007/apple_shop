import React from "react";
import styled from "styled-components";
import { Button } from "./styledElements";
import { Link } from "react-router-dom";
import homeBackground from "../assets/apple-products.jpeg";

const StyledWrapper = styled.div`
  width: 50vw;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #212a31;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
`;

const StyledContainer = styled.div`
  position: absolute;
  top: 68px;
  height: 100vh;
  width: 100vw;
  left: 0;
  display: flex;
  background-image: url("${homeBackground}");
  background-position: center;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <h1 className="welcome">
          Welcome to the Apple Shop <i className="fab fa-apple"></i>!
        </h1>
        <h3 className="landing">
          Your one stop shopping experience for all things Apple. We pride
          ourselves in being a premier supplier of Apple products.
        </h3>
        <Link to="/apple_shop/products">
          <Button>Browse</Button>
        </Link>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Home;
