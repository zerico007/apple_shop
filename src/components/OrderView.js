import React from "react";
import styled from "@emotion/styled";
import OrderItem from "./OrderItem";

const OrderWrapper = styled.div`
  position: relative;
  margin: 2rem auto;
  width: 80vw;
  height: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 0.4rem;
`;

function OrderView({
  date,
  total,
  orderId,
  user,
  updateCart,
  orderItems,
  mobile,
}) {
  const orderHeader = (className, headerText, value) => {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h3>{headerText}</h3>
        <div className={className}>{value}</div>
      </div>
    );
  };
  return (
    <OrderWrapper>
      <div
        className="order-header"
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          background: "lightgrey",
          width: "100%",
          marginBottom: "1rem",
          padding: "1rem",
          borderRadius: "0.4rem",
          boxSizing: "border-box",
        }}
      >
        {!mobile && orderHeader("user", "USER", user)}
        {orderHeader("date-placed", "ORDER PLACED", date)}
        {orderHeader("order-total", "TOTAL", total)}
        {!mobile && orderHeader("order-number", "ORDER #", orderId)}
      </div>
      {orderItems?.map((item, i) => (
        <OrderItem
          image={item.productImage}
          title={item.product}
          productId={item.productId}
          quantity={item.quantity}
          updateCart={updateCart}
          price={item.unitPrice}
          subtotal={item.total}
          key={i}
        />
      ))}
    </OrderWrapper>
  );
}

export default OrderView;
