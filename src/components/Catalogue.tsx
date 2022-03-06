import React, { useState } from "react";
import styled from "styled-components";
import ProductView from "./ProductView";
import SearchBar from "./SearchBar";
import { IMAGES_URL } from "../constants";

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

interface CatalogueProps {
  products: any;
  user: User;
  deleteProduct: any;
  updateProductAvailability: any;
  updateProduct: any;
  addToCart: any;
  mobile: boolean;
}

function Catalogue({
  products,
  user,
  deleteProduct,
  updateProductAvailability,
  mobile,
  updateProduct,
  addToCart,
}: CatalogueProps) {
  const [search, setSearch] = useState("");

  const updateSearch = (term: string) => {
    setSearch(term);
  };

  return (
    <Wrapper>
      <SearchBar updateSearch={updateSearch} search={search} />
      {search === "" &&
        products.map((product: any, i: number) => (
          <ProductView
            price={product.price}
            title={product.name}
            img_url={
              product.productImage && `${IMAGES_URL}/${product.productImage}`
            }
            id={product.id}
            videoURL={product.videoURL}
            available={product.available}
            updateProductAvailability={updateProductAvailability}
            updateProduct={updateProduct}
            addToCart={addToCart}
            user={user}
            deleteProduct={deleteProduct}
            mobile={mobile}
            key={i}
          />
        ))}
      {search !== "" &&
        products.map(
          (product: any, i: number) =>
            product.name.toLowerCase().includes(search.toLowerCase()) && (
              <ProductView
                price={product.price}
                title={product.name}
                img_url={
                  product.productImage &&
                  `${IMAGES_URL}/${product.productImage}`
                }
                id={product.id}
                videoURL={product.videoURL}
                available={product.available}
                updateProductAvailability={updateProductAvailability}
                updateProduct={updateProduct}
                addToCart={addToCart}
                user={user}
                deleteProduct={deleteProduct}
                mobile={mobile}
                key={i}
              />
            )
        )}
    </Wrapper>
  );
}

export default Catalogue;
