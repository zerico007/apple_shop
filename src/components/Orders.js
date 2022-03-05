import React from "react";
import styled from "styled-components";
import OrderView from "./OrderView";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 150px;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
`;

function Orders({ orders, mobile, addToCart }) {
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
          user={order.order.user ?? null}
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
