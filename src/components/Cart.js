import React from "react";
import styled from "@emotion/styled";
import CartItem from "./CartItem";
import { Button } from "./styledElements";

const CartWrapper = styled.div`
  position: relative;
  margin: 10rem auto;
  width: 80vw;
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 0.2rem;
`;

const Cart = ({
  cart,
  updateCart,
  count,
  removeFromCart,
  placeOrder,
  mobile,
}) => {
  return (
    <CartWrapper>
      <div
        className="cart-header"
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "87%",
          borderBottom: "1px solid lightgrey",
          marginBottom: "1rem",
        }}
      >
        <h2>Shopping Cart</h2>
        <div className="cart-total">
          <strong>
            {`Subtotal (${count} items): `}
            {`${cart.total || "$0.00"}`}
          </strong>
        </div>
        {cart.items && <Button onClick={placeOrder}>Place Order</Button>}
      </div>
      {cart.items?.map((item, i) => (
        <CartItem
          image={item.product.productImage}
          title={item.product.name}
          price={item.product.price}
          quantity={item.quantity}
          productId={item.product._id}
          updateCart={updateCart}
          removeFromCart={removeFromCart}
          key={i}
        />
      ))}
      {!cart.items && (
        <div className="empty-cart" style={{ textAlign: "center" }}>
          <h1>
            Your Shopping Cart is Empty. Fill it with goodies that you love!
          </h1>
        </div>
      )}
    </CartWrapper>
  );
};

export default Cart;
