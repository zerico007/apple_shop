import React from "react";
import styled from "@emotion/styled";
import { IMAGES_URL } from "../constants";
import { Button } from "./styledElements";

const OrderItemDiv = styled.div`
  display: grid;
  width: 80%;
  grid-template-areas:
    "pic title"
    "pic price"
    "pic subtotal"
    "pic order";
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

function OrderItem({
  image,
  title,
  productId,
  addToCart,
  price,
  quantity,
  subtotal,
}) {
  const handleBuyAgain = () => {
    const params = { product: productId, quantity: 1 };
    addToCart(params);
  };
  return (
    <OrderItemDiv>
      <div className="order-image" style={{ gridArea: "pic", width: "200px" }}>
        <img
          src={`${IMAGES_URL}/${image}`}
          alt={title}
          loading="lazy"
          className="product-img"
        />
      </div>
      <div className="order-item-title" style={{ gridArea: "title" }}>
        {title}
      </div>
      <div className="order-item-price" style={{ gridArea: "price" }}>
        <strong>{`Price: $${new Intl.NumberFormat().format(
          price
        )} x ${quantity}`}</strong>
      </div>
      <div className="subtotal" style={{ gridArea: "subtotal" }}>
        <strong>{`Subtotal: $${subtotal}.00`}</strong>
      </div>
      <div className="reorder" style={{ gridArea: "order" }}>
        <Button onClick={handleBuyAgain}>Buy Again</Button>
      </div>
    </OrderItemDiv>
  );
}

export default OrderItem;
