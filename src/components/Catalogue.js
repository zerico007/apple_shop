import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProductView from './ProductView';
import SearchBar from './SearchBar';
import {IMAGES_URL} from '../constants';

const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        position: relative;
        top: 120px;
        overflow: hidden;
        width: 100vw;
        margin-left: auto;
        margin-right: auto;
    `;

function Catalogue({products, user, deleteProduct, updateProductAvailability, mobile, updateProduct}) {

    const [search, setSearch ] = useState('');

    const updateSearch = (term) => {
        setSearch(term);
    };

    return (
        <Wrapper>
            <SearchBar updateSearch={updateSearch} search={search}/>
            { search === '' &&
            products.map((product, i) => (
                <ProductView price={product.price} 
                title={product.name} 
                img_url={product.productImage && `${IMAGES_URL}/${product.productImage}`}
                id={product.id}
                videoURL={product.videoURL}
                available={product.available}
                updateProductAvailability={updateProductAvailability}
                updateProduct={updateProduct}
                user={user}
                deleteProduct={deleteProduct}
                mobile={mobile}
                key={i}
                />
            ))}
            { search !== '' && products.map((product, i) => 
            product.name.toLowerCase().includes(search.toLowerCase()) &&  (
                <ProductView price={product.price} 
                    title={product.name} 
                    img_url={product.productImage && `http://localhost:5000/${product.productImage}`}
                    id={product.id}
                    videoURL={product.videoURL}
                    user={user}
                    key={i}
                />
            ))}
        </Wrapper>
        
    )
}

export default Catalogue;
