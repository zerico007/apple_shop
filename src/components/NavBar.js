import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ChevronDown, ShoppingCart } from "react-feather";
import wave from "../assets/apple_shop_wave.svg";

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #333d51;
  height: 67px;
  padding: 10px;
  z-index: 8;
`;

const NavButton = styled.button`
  width: ${(props) => (props.mobileSite ? "100%" : "120px")};
  height: ${(props) => (props.mobileSite ? "2rem" : "60px")};
  background: ${(props) => (props.mobileSite ? "#333d51" : "none")};
  color: ${(props) => (props.mobileSite ? "#f4f3ea" : "#333d51")};
  font-family: "Roboto Condensed", sans-serif;
  font-size: ${(props) => (props.mobileSite ? "24px" : "16px")};
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  transition: all 0.5s;
  &:hover {
    color: #d3ac2b;
    transform: scale(1.1);
  }

  margin-right: ${(props) => (props.mobileSite ? "0" : "40px")};
  margin-top: ${(props) => (props.mobileSite ? "45px" : "10px")};
  text-align: center;
`;

const NavButtonsDiv = styled.div`
  position: absolute;
  top: 72px;
  transform: translateX(-1.25rem);
  right: 100px;
  z-index: 10;
  background: white;
  width: 18rem;
  height: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.3rem;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 71.2%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const MobileNavButtonsDiv = styled.div`
  position: absolute;
  left: 0;
  padding-left: 40px;
  padding-top: 10px;
  top: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  z-index: 100;
  width: 105vw;
  animation: enterTopRight 0.5s;
  transform-origin: 0% 0%;
  background-image: url("${wave}");
  height: 100vh;
`;

function NavBar({
  logout,
  getOrders,
  getAdminOrders,
  user,
  mobile,
  cartCount,
}) {
  const logoStyle = {
    float: "left",
    marginLeft: "20px",
    marginTop: "1.5rem",
    color: "#F4F3EA",
    fontSize: "24px",
  };

  const greetingStyle = {
    color: "#F4F3EA",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    marginTop: "0.7rem",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "101",
    height: "auto",
    minHeight: "60px",
  };

  const [showNav, setShowNav] = useState(false);
  const [translucent, setTranslucent] = useState(false);
  const [showNavOptions, setShowNavOptions] = useState(false);

  const isUserAdmin = user.role === "administrator";

  const showNavDropDown = !mobile && showNavOptions;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setTranslucent(true) : setTranslucent(false);
    });
  }, []);

  return (
    <>
      <Nav style={{ opacity: translucent ? "0.8" : "1" }}>
        {!mobile && (
          <Link to="/apple_shop/home">
            <div className="title" style={logoStyle}>
              {" "}
              <i className="fab fa-apple"></i> Shop
            </div>
          </Link>
        )}
        {!mobile && (
          <div
            className="right-nav"
            style={{
              float: "right",
              marginRight: "5rem",
              display: "flex",
              width: "15rem",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              className="options"
              onMouseEnter={() => setShowNavOptions(true)}
              onMouseLeave={() => setShowNavOptions(false)}
              style={greetingStyle}
            >
              <p style={{ margin: "0" }}>{`Hello, ${user.username}`}</p>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Accounts & Lists
                <ChevronDown size={16} />
              </div>
              {showNavDropDown && (
                <NavButtonsDiv>
                  <Link to="/apple_shop/orders">
                    <NavButton
                      onClick={() => {
                        isUserAdmin ? getAdminOrders() : getOrders();
                        setShowNavOptions(false);
                      }}
                    >
                      {isUserAdmin ? "Orders" : "My Orders"}
                    </NavButton>
                  </Link>
                  {isUserAdmin && (
                    <Link to="/apple_shop/create-product">
                      <NavButton onClick={() => setShowNavOptions(false)}>
                        Create a Product
                      </NavButton>
                    </Link>
                  )}
                  <Link to="/apple_shop/products">
                    <NavButton onClick={() => setShowNavOptions(false)}>
                      Products
                    </NavButton>
                  </Link>
                  <Link to="/apple_shop/password">
                    <NavButton onClick={() => setShowNavOptions(false)}>
                      Manage Passwords
                    </NavButton>
                  </Link>
                  <NavButton onClick={logout}>Logout</NavButton>
                </NavButtonsDiv>
              )}
            </div>
            <Link to="/apple_shop/cart">
              <div
                className="cart"
                style={{
                  marginTop: "1rem",
                  cursor: "pointer",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ShoppingCart style={{ marginRight: "0.4rem" }} />
                Cart <sup>{` (${cartCount})`}</sup>
              </div>
            </Link>
          </div>
        )}
        {mobile && (
          <>
            <NavButton
              mobileSite={mobile}
              onClick={() => setShowNav(!showNav)}
              style={{
                float: "left",
                marginTop: "10px",
                width: "120px",
                fontSize: "20px",
                height: "50px",
              }}
            >
              {showNav ? (
                <i className="fas fa-times fa-2x"></i>
              ) : (
                <i className="fas fa-bars fa-2x"></i>
              )}
            </NavButton>
            <Link to="/apple_shop/cart">
              <div
                className="cart"
                style={{
                  marginTop: "1rem",
                  cursor: "pointer",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  float: "right",
                  marginRight: "3rem",
                  alignItems: "center",
                }}
              >
                <ShoppingCart size={32} style={{ marginRight: "0.4rem" }} />
                Cart <sup>{` (${cartCount})`}</sup>
              </div>
            </Link>
          </>
        )}
        {showNav && (
          <MobileNavButtonsDiv onClick={() => mobile && setShowNav(!showNav)}>
            <Link to="/apple_shop/home">
              <NavButton mobileSite={true}>Home</NavButton>
            </Link>
            <Link to="/apple_shop/orders">
              <NavButton
                mobileSite={true}
                onClick={isUserAdmin ? getAdminOrders : getOrders}
              >
                {isUserAdmin ? "Orders" : "My Orders"}
              </NavButton>
            </Link>
            {isUserAdmin && (
              <Link to="/apple_shop/create-product">
                <NavButton mobileSite={true}>Create a Product</NavButton>
              </Link>
            )}
            <Link to="/apple_shop/products">
              <NavButton mobileSite={true}>Products</NavButton>
            </Link>
            <Link to="/apple_shop/password">
              <NavButton mobileSite={true}>Manage Passwords</NavButton>
            </Link>
            <div
              className="logout"
              style={{
                width: "80vw",
                left: "0",
                position: "relative",
                border: "none",
                display: "flex",
                alignItems: "flex-start",
                marginTop: "10vh",
              }}
            >
              <Link>
                <NavButton
                  style={{ background: "none", color: "#333d51" }}
                  mobileSite={true}
                  onClick={logout}
                >
                  Logout
                </NavButton>
              </Link>
            </div>
          </MobileNavButtonsDiv>
        )}
      </Nav>
    </>
  );
}

export default NavBar;
