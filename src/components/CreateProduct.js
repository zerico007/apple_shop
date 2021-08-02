import React, { useRef, useState } from "react";
import { FormDiv, Button, Input } from "./styledElements";

function CreateProduct({ addProduct }) {
  const [image, setImage] = useState();

  const nameRef = useRef();
  const priceRef = useRef();
  const videoRef = useRef();

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("productImage", image, image.name);
    data.append("name", nameRef.current.value);
    data.append("price", priceRef.current.value);
    data.append("videoURL", videoRef.current.value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    addProduct(e, data, config);
  };

  return (
    <FormDiv>
      <form
        className="create-product-form"
        encType="multipart/form-data"
        onSubmit={handleCreateProduct}
      >
        <Input
          ref={nameRef}
          type="text"
          name="productName"
          id="productName"
          placeholder="Enter a product name"
          required
        />
        <Input
          ref={priceRef}
          type="number"
          name="price"
          id="price"
          placeholder="Set a product price"
          required
        />
        <Input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="productImage"
          id="productImage"
          placeholder="Upload a product image"
          required
        />
        <Input
          ref={videoRef}
          type="text"
          name="videoURL"
          id="videoURL"
          placeholder="Paste a video URL for the product ad"
          required
        />
        <Button style={{ width: "260px" }} type="submit">
          Create Product
        </Button>
      </form>
    </FormDiv>
  );
}

export default CreateProduct;
