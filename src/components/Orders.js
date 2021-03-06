import React from 'react';
import styled from '@emotion/styled';
import OrderView from './OrderView';
import {IMAGES_URL} from '../constants';

function Orders({orders, mobile}) {

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
            {!orders.length && <h2 style={{marginLeft: 'auto', marginRight: 'auto'}}>No orders placed yet!</h2>}
            {orders?.map((order, i) => (
                <OrderView 
                title={order.product}
                img_url={`${IMAGES_URL}/${order.productImage}`}
                price={order.unitPrice}
                total={order.Total}
                quantity={order.quantity}
                user={order.user && order.user}
                date={order.dateCreated}
                mobile={mobile}
                key={i}
                />
            ))}
        </Wrapper>
    )
}

export default Orders;