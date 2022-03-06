import { useRef, useState, FormEvent } from "react";
import { FormDiv, Button, Input } from "./styledElements";

function CreateProduct({ addProduct }: { addProduct: any }) {
  const [image, setImage] = useState<File | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("productImage", image as Blob, image?.name);
    data.append("name", nameRef.current?.value as string);
    data.append("price", priceRef.current?.value as string);
    data.append("videoURL", videoRef.current?.value as string);
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
          onChange={(e) => setImage(e.target.files?.[0] as File)}
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
