import React, { useState } from "react";
import styled from "@emotion/styled";
import { IMAGES_URL } from "../constants";
import { Button } from "./styledElements";

const CartItemDiv = styled.div`
  display: grid;
  width: 80%;
  grid-template-areas:
    "pic title"
    "pic price"
    "pic quantity"
    "pic remove";
  padding: 2rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  border: 1px solid lightgrey;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  background: white;
`;

const AmountSelect = styled.select`
  width: 60px;
  height: 2rem;
  background: lightgrey;
  border-radius: 0.4rem;
  padding-left: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  color: #212a31;
  border: none;
  outline: none;
  background-color: #ffcc00;
  transition: all 0.3s;
  outline: none;
  &:hover {
    background-color: #e5b700;
    transform: scale(1.1);
  }
`;

const CartItem = ({
  updateCart,
  productId,
  image,
  title,
  price,
  quantity,
  removeFromCart,
}) => {
  const [amount, setAmount] = useState(quantity);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    const params = { product: productId, quantity: e.target.value };
    updateCart(params);
  };

  const handleRemoveItem = () => {
    const params = { product: productId };
    removeFromCart(params);
  };

  return (
    <CartItemDiv>
      <div className="cart-image" style={{ gridArea: "pic", width: "200px" }}>
        <img
          src={`${IMAGES_URL}/${image}`}
          alt={title}
          loading="lazy"
          className="product-img"
        />
      </div>
      <div className="cart-item-title" style={{ gridArea: "title" }}>
        {title}
      </div>
      <div className="cart-item-price" style={{ gridArea: "price" }}>
        <strong>Price: ${new Intl.NumberFormat().format(price)}</strong>
      </div>
      <div className="cart-quantity-btn" style={{ gridArea: "quantity" }}>
        <AmountSelect
          name="quantity"
          id="quantity"
          defaultValue={amount}
          onChange={handleAmountChange}
          style={{}}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </AmountSelect>
      </div>
      <div className="remove-from-cart" style={{ gridArea: "remove" }}>
        <Button onClick={handleRemoveItem}>Remove</Button>
      </div>
    </CartItemDiv>
  );
};

export default CartItem;
