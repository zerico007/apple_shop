import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ChevronDown } from "react-feather";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

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
  .mobile-menu {
    opacity: 0;
    visibility: hidden;
    transform: translate(-2.5rem, -2.5rem) scale(0);
    transform-origin: 0% 0%;
    transition: all 0.5s ease-in-out;
  }
  .mobile-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translate(0) scale(1);
  }
`;

const NavButton = styled.button`
  width: ${(props) => (props.mobileSite ? "50%" : "120px")};
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
  text-align: ${(props) => (props.mobileSite ? "left" : "center")};
`;

const menuFadeDown = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
    visibility: hidden;
  } to {
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
  }
`;

const NavButtonsDiv = styled.div`
  position: absolute;
  top: 80px;
  transform-origin: 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 2px solid #333d51;
  animation: ${menuFadeDown} 0.5s ease-in-out;
  right: 142px;
  z-index: 10;
  background: white;
  width: 12rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.3rem;
  > a {
    width: 100%;
    > button {
      width: 100%;
      margin: 0;
      :hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
          rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
      }
    }
  }
  > button {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
    :hover {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 71.2%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
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
  background-color: #333d51;
  height: 100vh;
`;

function NavBar({ logout, getOrders, user, mobile, cartCount }) {
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

  const navigate = useNavigate();

  const links = [
    { route: "home", text: "Home" },
    { route: "orders", text: isUserAdmin ? "Orders" : "My Orders" },
    { route: "create-product", text: "Create Product" },
    { route: "products", text: "Products" },
    { route: "password", text: "Manage Password" },
  ];

  const handleTranslucentOnScroll = () => {
    if (window.scrollY > 0) {
      setTranslucent(true);
    } else {
      setTranslucent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleTranslucentOnScroll);
    return () => {
      window.removeEventListener("scroll", handleTranslucentOnScroll);
    };
  }, []);

  const ShoppingCart = () => {
    return (
      <Link to="/apple_shop/cart">
        <div
          onClick={() => mobile && setShowNav(false)}
          className="cart"
          style={{
            marginTop: "1rem",
            marginRight: mobile ? "3rem" : 0,
            cursor: "pointer",
            color: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            float: "right",
          }}
        >
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon
                style={{ color: "white", fontSize: "xx-large" }}
              />
            </StyledBadge>
          </IconButton>
        </div>
      </Link>
    );
  };

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
                  {links.slice(1).map(({ route, text }) => {
                    if (route === "create-product") {
                      if (isUserAdmin) {
                        return (
                          <Link to={`/apple_shop/${route}`}>
                            <NavButton
                              onClick={() => {
                                setShowNavOptions(false);
                              }}
                            >
                              {text}
                            </NavButton>
                          </Link>
                        );
                      } else {
                        return null;
                      }
                    }
                    return (
                      <Link to={`/apple_shop/${route}`}>
                        <NavButton
                          onClick={() => {
                            setShowNavOptions(false);
                            route === "orders" && getOrders(user.role);
                          }}
                        >
                          {text}
                        </NavButton>
                      </Link>
                    );
                  })}
                  <NavButton onClick={logout}>Logout</NavButton>
                </NavButtonsDiv>
              )}
            </div>
            <ShoppingCart />
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
                marginLeft: "30px",
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
            <ShoppingCart />
          </>
        )}

        <MobileNavButtonsDiv
          className={showNav ? "mobile-menu open" : "mobile-menu"}
          onClick={() => mobile && setShowNav(!showNav)}
        >
          {links.map(({ route, text }) => {
            if (route === "create-product") {
              if (isUserAdmin) {
                return (
                  <NavButton
                    key={text}
                    mobileSite={mobile}
                    onClick={() => {
                      navigate(`/apple_shop/${route}`);
                    }}
                  >
                    {text}
                  </NavButton>
                );
              } else {
                return null;
              }
            }
            return (
              <NavButton
                key={text}
                mobileSite={mobile}
                onClick={() => {
                  navigate(`/apple_shop/${route}`);
                  if (route === "orders") {
                    getOrders(user.role);
                  }
                }}
              >
                {text}
              </NavButton>
            );
          })}

          <NavButton mobileSite={true} onClick={logout}>
            Logout
          </NavButton>
        </MobileNavButtonsDiv>
      </Nav>
    </>
  );
}

export default NavBar;
