import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LoadingBar from "react-top-loading-bar";
import { setBearerToken, shopApiInstance } from "../network";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Register from "./Register";
import Catalogue from "./Catalogue";
import NavBar from "./NavBar";
import Orders from "./Orders";
import Home from "./Home";
import Cart from "./Cart";
import CreateProduct from "./CreateProduct";
import PasswordUpdate from "./PasswordUpdate";
import { usePersistedState } from "../utils";
import { toastConfig } from "./styledElements";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from "../redux/resources/user";
import {
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
} from "../redux/resources/orders";
import {
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
} from "../redux/resources/products";
import {
  getCartSuccess,
  getCartRequest,
  getCartFailure,
} from "../redux/resources/cart";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [mobile, setMobile] = usePersistedState("mobile", false);
  const [progress, setProgress] = usePersistedState("progress", 0);
  const [cartCount, setCartCount] = useState(0);

  const dispatch = useDispatch();
  const { user, orders, products, cart } = useSelector((state) => state);

  useEffect(() => {
    const count = cart.items
      ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
    setCartCount(count);
  }, [cart]);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("load", () => {
      setBearerToken(user.token || "");
    });
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setMobile(true) : setMobile(false)
    );
    //window.addEventListener('unload', () => logout());
  });

  useEffect(() => {
    window.innerWidth < 768 ? setMobile(true) : setMobile(false);
  }, [setMobile]);

  const getCart = () => {
    shopApiInstance
      .get("/cart")
      .then((response) => {
        dispatch(getCartSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getCartFailure(err));
      });
  };

  const getOrders = (role) => {
    const url = role === "administrator" ? "/orders/admin" : "/orders";
    shopApiInstance
      .get(url)
      .then((response) => {
        if (response.data.orders) {
          dispatch(getOrdersSuccess(response.data.orders.reverse()));
        } else {
          dispatch(getOrdersSuccess([]));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(getOrdersFailure(err));
      });
  };

  const getProducts = () => {
    shopApiInstance
      .get("/products")
      .then((response) => {
        dispatch(getProductsSuccess(response.data.products.reverse()));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getProductsFailure(err));
      });
  };

  const getUser = (token) => {
    const user = jwt_decode(token);
    const { username, email, role, password, userId } = user;
    const loggedInUser = { username, email, role, password, userId, token };
    dispatch(loginSuccess(loggedInUser));
  };

  const handleLogin = (e, params) => {
    setProgress(40);
    e.preventDefault();
    dispatch(login());
    dispatch(getOrdersRequest());
    dispatch(getProductsRequest());
    dispatch(getCartRequest());
    shopApiInstance
      .post("/users/signin", params)
      .then(async (response) => {
        e.target.reset();
        setProgress(100);
        await setBearerToken(response.data.token);
        await getUser(response.data.token);
        getProducts();
        getCart();
        getOrders(user.role);
        toast.success("Successfully logged in!", toastConfig);
        history.push("/apple_shop/home");
      })
      .catch((err) => {
        setProgress(100);
        console.log(err);
        const error = () => {
          if (err.message.includes("401"))
            return "Email/Password combination incorrect. Try again.";
          if (err.message.includes("404")) return "User not found.";
        };
        dispatch(loginFailure(error()));
        toast.error(error(), toastConfig);
      });
  };

  const handleRegister = (e, params) => {
    setProgress(40);
    e.preventDefault();
    shopApiInstance
      .post("/users/signup", params)
      .then((response) => {
        setProgress(100);
        console.log(response.data);
        toast.success("Account successfully created. Login here.", toastConfig);
        history.push("/apple_shop");
      })
      .catch((err) => {
        setProgress(100);
        toast.error(err.message, toastConfig);
      });
  };

  const addProduct = (e, params) => {
    dispatch(getProductsRequest());
    shopApiInstance
      .post("/products", params)
      .then((response) => {
        console.log(response.data);
        toast.success("Product successfully created", toastConfig);
        getProducts();
        history.push("/apple_shop/products");
      })
      .catch((err) => {
        dispatch(getProductsFailure(err));
        toast.error(err.message, toastConfig);
      });
    e.target.reset();
  };

  const updateProduct = (e, id, params) => {
    dispatch(getProductsRequest());
    shopApiInstance
      .put(`/products/${id}`, params)
      .then((response) => {
        console.log(response.data);
        toast.success("Product successfully updated", toastConfig);
        getProducts();
        history.push("/apple_shop/products");
      })
      .catch((err) => {
        dispatch(getProductsFailure(err));
        toast.error(err.message, toastConfig);
      });
    e.target.reset();
  };

  const deleteProduct = (id) => {
    dispatch(getProductsRequest());
    const deleteParams = { productId: id };
    shopApiInstance
      .delete("/orders/delete", { data: deleteParams })
      .then((result) => console.log(result));
    shopApiInstance
      .delete(`/products/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Products successfully deleted", toastConfig);
        getProducts();
        history.push("/apple_shop/products");
      })
      .catch((err) => {
        dispatch(getProductsFailure(err));
        toast.error(err.message, toastConfig);
      });
  };

  const updatePassword = (e, params) => {
    shopApiInstance
      .put(`/users/${user.userId}`, params)
      .then((response) => {
        console.log(response.data);
        toast.success("Password updated successfully!", toastConfig);
        history.push("/apple_shop/home");
      })
      .catch((err) => {
        const error = err.message.includes("401")
          ? "Incorrect password. Try again."
          : err.message;
        toast.error(error, toastConfig);
      });
    e.target.reset();
  };

  const updateProductAvailability = (path) => {
    dispatch(getProductsRequest());
    console.log(path);
    shopApiInstance
      .put(path)
      .then((response) => {
        console.log(response.data);
        getProducts();
        toast.success("Order updated successfully", toastConfig);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getProductsFailure(err));
        toast.error(err.message, toastConfig);
      });
  };

  const addToCart = (params) => {
    dispatch(getCartRequest());
    shopApiInstance
      .post("/cart", params)
      .then((response) => {
        console.log(response.data);
        getCart();
        toast.success("Cart updated successfully", toastConfig);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getCartFailure(err));
        toast.error(err.message, toastConfig);
      });
  };

  const updateCart = (params) => {
    shopApiInstance
      .put("/cart/update", params)
      .then((response) => {
        console.log("item in cart updated");
        getCart();
      })
      .catch((err) => {
        console.log("update Cart", err);
        dispatch(getCartFailure(err));
      });
  };

  const removeFromCart = (params) => {
    dispatch(getCartRequest());
    shopApiInstance
      .put("/cart/remove", params)
      .then((response) => {
        console.log(response.data);
        getCart();
        toast.success("Cart updated successfully", toastConfig);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getCartFailure(err));
        toast.error(err.message, toastConfig);
      });
  };

  const placeOrder = () => {
    dispatch(getOrdersRequest());
    dispatch(getCartRequest());
    shopApiInstance
      .post("/orders")
      .then((response) => {
        console.log(response.data);
        getCart();
        getOrders(user.role);
        toast.success("Order placed successfully", toastConfig);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getOrdersFailure(err));
        dispatch(getCartFailure(err));
        toast.error(err.message, toastConfig);
      });
  };

  const logoutUser = () => {
    setBearerToken("");
    toast.dark("Logged out.", toastConfig);
    history.push("/apple_shop");
    dispatch(logout());
    sessionStorage.clear();
  };

  return (
    <Fragment>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      {user.user.isLoggedIn && (
        <NavBar
          logout={logoutUser}
          getOrders={getOrders}
          user={user.user}
          mobile={mobile}
          cartCount={cartCount}
        />
      )}
      <Switch>
        <Route
          exact
          path="/apple_shop"
          render={(props) => <Login {...props} handleLogin={handleLogin} />}
        />
        <Route path="/apple_shop/home" component={Home} />
        <Route
          path="/apple_shop/register"
          render={(props) => (
            <Register {...props} handleRegister={handleRegister} />
          )}
        />
        <Route
          path="/apple_shop/products"
          render={(props) => (
            <Catalogue
              {...props}
              products={products.products}
              user={user.user}
              addToCart={addToCart}
              deleteProduct={deleteProduct}
              updateProductAvailability={updateProductAvailability}
              updateProduct={updateProduct}
              mobile={mobile}
            />
          )}
        />
        <Route
          path="/apple_shop/orders"
          render={(props) => (
            <Orders
              {...props}
              orders={orders.orders}
              mobile={mobile}
              addToCart={addToCart}
            />
          )}
        />
        <Route
          path="/apple_shop/cart"
          render={(props) => (
            <Cart
              {...props}
              updateCart={updateCart}
              cart={cart}
              count={cartCount}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
              mobile={mobile}
            />
          )}
        />
        <Route
          path="/apple_shop/create-product"
          render={(props) => (
            <CreateProduct {...props} addProduct={addProduct} />
          )}
        />
        <Route
          path="/apple_shop/password"
          render={(props) => (
            <PasswordUpdate
              {...props}
              user={user.user}
              updatePassword={updatePassword}
            />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
