import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LoadingBar from "react-top-loading-bar";
import { setBearerToken, shopApiInstance } from "./network";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  Register,
  Catalogue,
  NavBar,
  Orders,
  Home,
  Cart,
  CreateProduct,
  PasswordUpdate,
  toastConfig,
} from "./components";
import { usePersistedState } from "./utils";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
  getCartSuccess,
  getCartRequest,
  getCartFailure,
} from "./redux/resources";
import { useAppDispatch, useAppSelector } from "./redux/store";

function App() {
  const [mobile, setMobile] = usePersistedState("mobile", false);
  const [progress, setProgress] = usePersistedState("progress", 0);
  const [cartCount, setCartCount] = useState(0);

  const dispatch = useAppDispatch();
  const { user, orders, products, cart } = useAppSelector();

  useEffect(() => {
    const count = cart.items
      ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
    setCartCount(count);
  }, [cart]);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("load", () => {
      setBearerToken(user.token ?? "");
    });
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setMobile(true) : setMobile(false)
    );
  });

  useEffect(() => {
    window.innerWidth < 768 ? setMobile(true) : setMobile(false);
  }, [setMobile]);

  const getCart = async () => {
    try {
      const response = await shopApiInstance.get("/cart");
      dispatch(getCartSuccess(response.data));
    } catch (error) {
      dispatch(getCartFailure(error));
    }
  };

  const getOrders = async (role) => {
    const url = role === "administrator" ? "/orders/admin" : "/orders";
    try {
      const response = await shopApiInstance.get(url);
      if (response.data.orders) {
        dispatch(getOrdersSuccess(response.data.orders.reverse()));
      } else {
        dispatch(getOrdersSuccess([]));
      }
    } catch (error) {
      dispatch(getOrdersFailure(error));
    }
  };

  const getProducts = async () => {
    try {
      const response = await shopApiInstance.get("/products");
      dispatch(getProductsSuccess(response.data.products.reverse()));
    } catch (error) {
      dispatch(getProductsFailure(error));
    }
  };

  const getUser = (token) => {
    const decodedUser: any = jwt_decode(token);
    const { username, email, role, password, userId } = decodedUser;
    const loggedInUser = { username, email, role, password, userId, token };
    dispatch(loginSuccess(loggedInUser));
  };

  const handleLogin = async (e, params) => {
    setProgress(40);
    e.preventDefault();
    dispatch(login());
    dispatch(getOrdersRequest());
    dispatch(getProductsRequest());
    dispatch(getCartRequest());
    try {
      const response = await shopApiInstance.post("/users/signin", params);
      e.target.reset();
      setProgress(100);
      setBearerToken(response.data.token);
      getUser(response.data.token);
      getCart();
      getOrders(user.role);
      getProducts();
      toast.success("Successfully logged in!", toastConfig);
      navigate("/apple_shop/home");
    } catch (err) {
      setProgress(100);
      console.log(err);
      const error = () => {
        if (err.message.includes("401"))
          return "Email/Password combination incorrect. Try again.";
        if (err.message.includes("404")) return "User not found.";
      };
      dispatch(loginFailure(error()));
      toast.error(error(), toastConfig);
    }
  };

  const handleRegister = async (e, params) => {
    setProgress(40);
    e.preventDefault();
    try {
      const response = await shopApiInstance.post("/users/signup", params);
      if (response.data) {
        toast.success("Product successfully created", toastConfig);
        getProducts();
        navigate("/apple_shop/products");
      }
    } catch (err) {
      setProgress(100);
      toast.error(err.message, toastConfig);
    }
  };

  const addProduct = async (e, params) => {
    dispatch(getProductsRequest());
    try {
      const response = await shopApiInstance.post("/products", params);
      if (response.data) {
        toast.success("Product successfully created", toastConfig);
        getProducts();
        navigate("/apple_shop/products");
      }
    } catch (err) {
      dispatch(getProductsFailure(err));
      toast.error(err.message, toastConfig);
    } finally {
      e.target.reset();
    }
  };

  const updateProduct = async (e, id, params) => {
    dispatch(getProductsRequest());
    try {
      const response = await shopApiInstance.put(`/products/${id}`, params);
      if (response.data) {
        toast.success("Product successfully updated", toastConfig);
        getProducts();
        navigate("/apple_shop/products");
      }
    } catch (err) {
      dispatch(getProductsFailure(err));
      toast.error(err.message, toastConfig);
    } finally {
      e.target.reset();
    }
  };

  const deleteProduct = async (id) => {
    dispatch(getProductsRequest());
    const deleteParams = { productId: id };
    try {
      const response = await shopApiInstance.delete("/orders/delete", {
        data: deleteParams,
      });
      if (response.data) {
        const productDeleteResponse = await shopApiInstance.delete(
          `/products/${id}`
        );
        if (productDeleteResponse.data) {
          toast.success("Product successfully deleted", toastConfig);
          getProducts();
          navigate("/apple_shop/products");
        }
      }
    } catch (err) {
      dispatch(getProductsFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const updatePassword = async (e, params) => {
    try {
      const response = await shopApiInstance.put(
        `/users/${user.userId}`,
        params
      );
      if (response.data) {
        toast.success("Password successfully updated", toastConfig);
        navigate("/apple_shop/home");
      }
    } catch (err) {
      const error = err.message.includes("401")
        ? "Incorrect password. Try again."
        : err.message;
      toast.error(error, toastConfig);
    } finally {
      e.target.reset();
    }
  };

  const updateProductAvailability = async (path) => {
    dispatch(getProductsRequest());
    try {
      const response = await shopApiInstance.put(path);
      if (response.data) {
        toast.success("Product availability successfully updated", toastConfig);
        getProducts();
        navigate("/apple_shop/products");
      }
    } catch (err) {
      dispatch(getProductsFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const addToCart = async (params) => {
    dispatch(getCartRequest());
    try {
      const response = await shopApiInstance.post("/cart", params);
      if (response.data) {
        toast.success("Product successfully added to cart", toastConfig);
        getCart();
      }
    } catch (err) {
      dispatch(getCartFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const updateCart = async (params) => {
    try {
      const response = await shopApiInstance.put("/cart/update", params);
      if (response.data) {
        toast.success("Cart successfully updated", toastConfig);
        getCart();
      }
    } catch (err) {
      dispatch(getCartFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const removeFromCart = async (params) => {
    dispatch(getCartRequest());
    try {
      const response = await shopApiInstance.put("/cart/remove", params);
      if (response.data) {
        toast.success("Product successfully removed from cart", toastConfig);
        getCart();
      }
    } catch (err) {
      dispatch(getCartFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const placeOrder = async () => {
    dispatch(getOrdersRequest());
    dispatch(getCartRequest());
    try {
      const response = await shopApiInstance.post("/orders");
      if (response.data) {
        toast.success("Order successfully placed", toastConfig);
        getOrders(user.role);
        getCart();
      }
    } catch (err) {
      dispatch(getCartFailure(err));
      dispatch(getOrdersFailure(err));
      toast.error(err.message, toastConfig);
    }
  };

  const logoutUser = () => {
    setBearerToken("");
    toast.dark("Logged out.", toastConfig);
    navigate("/apple_shop");
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
      <Routes>
        <Route
          path="/apple_shop"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route path="/apple_shop/home" element={<Home />} />
        <Route
          path="/apple_shop/register"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route
          path="/apple_shop/products"
          element={
            <Catalogue
              products={products.products}
              user={user.user}
              addToCart={addToCart}
              deleteProduct={deleteProduct}
              updateProductAvailability={updateProductAvailability}
              updateProduct={updateProduct}
              mobile={mobile}
            />
          }
        />
        <Route
          path="/apple_shop/orders"
          element={
            <Orders
              orders={orders.orders}
              mobile={mobile}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/apple_shop/cart"
          element={
            <Cart
              updateCart={updateCart}
              cart={cart}
              count={cartCount}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
              mobile={mobile}
            />
          }
        />
        <Route
          path="/apple_shop/create-product"
          element={<CreateProduct addProduct={addProduct} />}
        />
        <Route
          path="/apple_shop/password"
          element={
            <PasswordUpdate user={user.user} updatePassword={updatePassword} />
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
