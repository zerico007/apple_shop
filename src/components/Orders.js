import React from "react";
import styled from "@emotion/styled";
import OrderView from "./OrderView";

function Orders({ orders, mobile, addToCart }) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 150px;
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <Wrapper>
      {!orders.length && (
        <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
          No orders placed yet!
        </h2>
      )}
      {orders?.map((order, i) => (
        <OrderView
          total={order.order.OrderTotal}
          user={order.order.user && order.order.user}
          date={order.order.dateCreated}
          orderId={order.order.id}
          orderItems={order.order.items}
          addToCart={addToCart}
          mobile={mobile}
          key={i}
        />
      ))}
    </Wrapper>
  );
}

export default Orders;
