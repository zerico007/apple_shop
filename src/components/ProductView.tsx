import { Fragment, useState, useRef, FormEvent } from "react";
import styled from "styled-components";
import { Button, FormDiv, Input } from "./styledElements";
import Modal from "./Modal";
import ProductVideo from "./ProductVideo";
import { AxiosRequestConfig } from "axios";

const ProductDiv = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    just0fy-content: center;
  }
  margin: 20px auto 20px auto;
  padding: 40px;
  border: none;
  border-radius: 0.5rem;

  width: 50vw;
  height: auto;
  background: white; ;
`;

const ImageDiv = styled.div`
  width: auto;
  height: auto;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

interface ProductViewProps {
  img_url: string;
  price: number;
  title: string;
  id: string;
  videoURL: string;
  user: User;
  deleteProduct: (id: string) => Promise<void>;
  available: boolean;
  addToCart: (params: { product: string; quantity: number }) => Promise<void>;
  updateProductAvailability: (path: string) => Promise<void>;
  updateProduct: (
    e: FormEvent,
    id: string,
    params: any,
    config?: AxiosRequestConfig
  ) => Promise<void>;
  mobile: boolean;
}

function ProductView({
  img_url,
  price,
  title,
  id,
  videoURL,
  user,
  deleteProduct,
  available,
  updateProductAvailability,
  mobile,
  updateProduct,
  addToCart,
}: ProductViewProps) {
  const [closeButton, setCloseButton] = useState(false);
  const [mountVideo, setMountVideo] = useState(false);
  const [display, setDisplay] = useState("");
  const [updatedImage, setUpdatedImage] = useState<File | null>(null);

  const newPrice = useRef<HTMLInputElement>(null);
  const newTitle = useRef<HTMLInputElement>(null);

  const showCloseButton = () => {
    setTimeout(() => setCloseButton(!closeButton), 1500);
  };

  const toggle = (arg: string) => {
    const thing = document.querySelector(`.${arg}-${id}`) as HTMLElement;
    thing.classList.toggle("on");
  };

  const handleAvailability = () => {
    const path = available
      ? `/products/${id}/unavailable`
      : `/products/${id}/available`;
    updateProductAvailability(path);
  };

  const handleUpdateProduct = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    updatedImage &&
      data.append("productImage", updatedImage, updatedImage.name);
    newTitle.current?.value !== title &&
      data.append("newName", newTitle.current?.value as string);
    +newPrice.current?.value! !== price &&
      data.append("newPrice", newPrice.current?.value as string);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    toggle("modal");
    setDisplay("");
    updatedImage
      ? updateProduct(e, id, data, config)
      : updateProduct(e, id, data);
  };

  const isUserAdmin = user.role === "administrator";

  const UpdateProductModal = () => {
    return (
      <FormDiv style={{ top: "0" }}>
        <form
          className="update-product-form"
          onSubmit={handleUpdateProduct}
          encType="multipart/form-data"
        >
          <Input
            type="text"
            id="product-title"
            name="product-title"
            ref={newTitle}
            defaultValue={title}
          />
          <Input
            type="number"
            id="product-price"
            name="product-price"
            ref={newPrice}
            defaultValue={price}
          />
          <Input
            onChange={(e) => setUpdatedImage(e.target.files?.[0] as File)}
            type="file"
            name="productImage"
            id="productImage"
          />
          <Button style={{ width: "160px" }} type="submit">
            {" "}
            Confirm Update
          </Button>
        </form>
      </FormDiv>
    );
  };

  return (
    <Fragment>
      <Modal
        productId={id}
        toggle={toggle}
        display={display}
        deleteProduct={deleteProduct}
        UpdateProductModal={UpdateProductModal}
        addToCart={addToCart}
      />
      {mountVideo && (
        <ProductVideo
          videoURL={videoURL}
          productId={id}
          showCloseButton={showCloseButton}
          closeButton={closeButton}
          mountVideo={mountVideo}
          setMountVideo={setMountVideo}
          mobile={mobile}
        />
      )}
      <ProductDiv>
        <div
          className="left-side"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: mobile ? "center" : "flex-start",
            width: "50%",
          }}
        >
          <ImageDiv>
            {img_url && (
              <img
                src={img_url}
                alt={title}
                className="product-img"
                loading="lazy"
              />
            )}
          </ImageDiv>
          {isUserAdmin && (
            <Button
              style={{
                width: "150px",
                marginLeft: mobile ? "0" : "2rem",
              }}
              onClick={() => {
                toggle("modal");
                setDisplay("update");
              }}
            >
              Update Product
            </Button>
          )}
          {isUserAdmin && (
            <Button
              style={{
                width: "150px",
                marginLeft: mobile ? "0" : "2rem",
              }}
              onClick={() => handleAvailability()}
            >
              Update Availability
            </Button>
          )}
        </div>
        <div
          className="right-side"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
          }}
        >
          <div className="product-title">
            <p style={{ textAlign: "center" }}>
              <strong>{title}</strong>
            </p>
          </div>
          <div className="product-price">
            <strong>Price: ${new Intl.NumberFormat().format(price)}</strong>
          </div>
          <Button
            className={
              available ? "add-to-order-btn" : "add-to-order-btn out-of-stock"
            }
            style={{ width: mobile ? "130px" : "100px" }}
            onClick={() => {
              toggle("modal");
              setDisplay("order");
            }}
            disabled={!available}
          >
            {available ? "Add to cart" : "Out of Stock"}
          </Button>
          <Button
            style={{ gridArea: "video" }}
            onClick={() => {
              showCloseButton();
              setMountVideo(!mountVideo);
            }}
          >
            Video <i className="fab fa-youtube"></i>
          </Button>

          {isUserAdmin && (
            <Button
              style={{ gridArea: "delete" }}
              onClick={() => {
                toggle("modal");
                setDisplay("delete");
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </ProductDiv>
    </Fragment>
  );
}

export default ProductView;
