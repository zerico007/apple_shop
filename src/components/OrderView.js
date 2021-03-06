import React, { Fragment } from 'react';
import styled from '@emotion/styled';

function OrderView ({title, img_url, price, total, quantity, date, mobile, user}) {
    const OrderDiv = styled.div`
        position: relative;
        z-index: 3;
        display: grid;
        grid-template-areas:
            'user title'
            'pic price'
            'pic quantity'
            'pic total'
            'pic date';
        @media (max-width: 768px){
            display: flex;
            flex-direction: column;
            align-items: center;
            
        }
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        margin: 20px auto 20px auto;
        padding: 40px;
        border: none;
        border-radius: 0.5rem;
        width: 40vw;
        height: 100%;
        background: white;
    `;

    const ImageDiv = styled.div`
        grid-area: pic;
        width: 200px;
        height: 100%;
    `;
    const TitleDiv = styled.div`
        grid-area: title;
    `;
    const PriceDiv = styled.div`
        grid-area: price;
    `;

    const QuantityDiv = styled.div`
        grid-area: quantity;
    `;

    const TotalDiv = styled.div`
        border-top: solid 2px #212a31;
        grid-area: total;
    `;

    const DateDiv = styled.div`
        grid-area: date;
        display: flex;
        justify-content: center;
        text-align: ${mobile ? `center` : `left`};
    `;
    return (
            <OrderDiv>
                {user && <p className="username" style={{gridArea: 'user'}}><strong>Username: </strong><em>{user}</em></p>}
                <ImageDiv>
                    <img src={img_url} alt={title} loading='lazy' className="product-img"/>
                </ImageDiv>
                <TitleDiv>
                    <strong>{title}</strong>
                </TitleDiv>
                <QuantityDiv>
                    <strong>Quantity: {quantity}</strong>
                </QuantityDiv>
                <PriceDiv>
                    <strong>Unit Price: {price}</strong>
                </PriceDiv>
                <TotalDiv>
                    <strong>TOTAL: {total}</strong>
                </TotalDiv>
                <DateDiv><strong>Date Order Placed: {date?.toString()}</strong></DateDiv>
            </OrderDiv>
    )
}

export default OrderView;