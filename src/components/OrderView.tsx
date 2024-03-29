import styled from "styled-components";
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

interface OrderViewProps {
  mobile: boolean;
  date: string;
  total: number;
  orderId: string;
  user: User;
  addToCart: (params: { product: string; quantity: number }) => Promise<void>;
  orderItems: any;
}

function OrderView({
  date,
  total,
  orderId,
  user,
  addToCart,
  orderItems,
  mobile,
}: OrderViewProps) {
  const orderHeader = (className: string, headerText: string, value: any) => {
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
      {orderItems?.map((item: any, i: number) => (
        <OrderItem
          image={item.productImage}
          title={item.product}
          productId={item.productId}
          quantity={item.quantity}
          addToCart={addToCart}
          price={item.unitPrice}
          subtotal={item.total}
          key={i}
        />
      ))}
    </OrderWrapper>
  );
}

export default OrderView;
