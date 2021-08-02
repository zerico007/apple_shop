import React, { Fragment, useEffect } from "react";
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
import CreateProduct from "./CreateProduct";
import PasswordUpdate from "./PasswordUpdate";
import { usePersistedState } from "../utils";
import { toastConfig } from "./styledElements";

function App() {
  const [products, setProducts] = usePersistedState("products", []);
  //const [ token, setToken ] = usePersistedState('token', '');
  const [user, setUser] = usePersistedState("user", {});
  const [authenticated, setAuthenticated] = usePersistedState(
    "authenticated",
    false
  );
  const [orders, setOrders] = usePersistedState("orders", []);
  const [mobile, setMobile] = usePersistedState("mobile", false);
  const [progress, setProgress] = usePersistedState("progress", 0);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("load", () => {
      setBearerToken(localStorage.getItem("token") || "");
    });
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setMobile(true) : setMobile(false)
    );
    //window.addEventListener('unload', () => logout());
  });

  useEffect(() => {
    window.innerWidth < 768 ? setMobile(true) : setMobile(false);
  }, [setMobile]);

  const getAdminOrders = () => {
    shopApiInstance
      .get("/orders/admin")
      .then((response) => {
        response.data.orders
          ? setOrders(response.data.orders.reverse())
          : setOrders([]);
      })
      .catch((err) => console.log(err));
  };

  const getOrders = () => {
    shopApiInstance
      .get("/orders")
      .then((response) => {
        response.data.orders
          ? setOrders(response.data.orders.reverse())
          : setOrders([]);
      })
      .catch((err) => console.log(err));
  };

  const getProducts = () => {
    shopApiInstance
      .get("/products")
      .then((response) => {
        setProducts(response.data.products.reverse());
      })
      .catch((err) => console.log(err));
  };

  const getUser = (token) => {
    const user = jwt_decode(token);
    const { username, email, role, password, userId } = user;
    setUser({ username, email, role, password, userId });
  };

  const handleLogin = (e, params) => {
    setProgress(40);
    e.preventDefault();
    //console.log(window.env.EXPOSED_API_URL)
    shopApiInstance
      .post("/users/signin", params)
      .then(async (response) => {
        e.target.reset();
        setProgress(100);
        //await setToken(response.data.token);
        await localStorage.setItem("token", response.data.token);
        await setBearerToken(response.data.token);
        await setAuthenticated(true);
        await getUser(response.data.token);
        getProducts();
        user.role === "administrator" ? getAdminOrders() : getOrders();
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
        toast.error(error, toastConfig);
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
    shopApiInstance
      .post("/products", params)
      .then((response) => {
        console.log(response.data);
        toast.success("Product successfully created", toastConfig);
        getProducts();
        history.push("/apple_shop/products");
      })
      .catch((err) => {
        toast.error(err.message, toastConfig);
      });
    e.target.reset();
  };

  const updateProduct = (e, id, params) => {
    shopApiInstance
      .put(`/products/${id}`, params)
      .then((response) => {
        console.log(response.data);
        toast.success("Product successfully updated", toastConfig);
        getProducts();
        history.push("/apple_shop/products");
      })
      .catch((err) => {
        toast.error(err.message, toastConfig);
      });
    e.target.reset();
  };

  const deleteProduct = (id) => {
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
        toast.error(err.message, toastConfig);
      });
  };

  const logout = () => {
    //setToken('');
    setBearerToken("");
    setAuthenticated(false);
    setProducts([]);
    sessionStorage.clear();
    toast.dark("Logged out.", toastConfig);
    history.push("/apple_shop");
  };

  return (
    <Fragment>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      {authenticated && (
        <NavBar
          logout={logout}
          getOrders={getOrders}
          getAdminOrders={getAdminOrders}
          user={user}
          mobile={mobile}
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
              products={products}
              user={user}
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
            <Orders {...props} orders={orders} mobile={mobile} />
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
              user={user}
              updatePassword={updatePassword}
            />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
