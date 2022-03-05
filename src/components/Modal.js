import React, { useRef, Fragment } from "react";
import { Button, Input, toastConfig } from "./styledElements";
import { toast, ToastContainer } from "react-toastify";

function Modal({
  productId,
  toggle,
  display,
  deleteProduct,
  addToCart,
  UpdateProductModal,
}) {
  const quantityRef = useRef();

  const handleAddToCart = (e) => {
    e.preventDefault();
    toggle("modal");
    const quantity = quantityRef.current.value;
    if (quantity === "0")
      return toast.error("Please enter a quantity", toastConfig);
    console.log(productId, quantity);
    const params = { product: productId, quantity };
    addToCart(params);
    e.target.reset();
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className={`modal modal-${productId}`} style={{ top: "0px" }}>
        <div className="modal-content">
          {display === "order" && (
            <Fragment>
              <h3 className="order-modal">How many would you like to add?</h3>
              <form onSubmit={handleAddToCart}>
                <Input
                  type="number"
                  name="quantity"
                  defaultValue="1"
                  ref={quantityRef}
                  style={{ textAlign: "center" }}
                />
                <br />
                <Button type="submit" style={{ width: "130px" }}>
                  Confirm
                </Button>
              </form>
            </Fragment>
          )}
          {display === "delete" && (
            <Fragment>
              <h3 className="delete-modal">
                Are you sure you want to delete this product?
              </h3>
              <Button
                onClick={() => deleteProduct(productId)}
                style={{ width: "120px", alignSelf: "center" }}
              >
                Confirm Delete
              </Button>
            </Fragment>
          )}
          {display === "update" && (
            <Fragment>
              <UpdateProductModal />
            </Fragment>
          )}
          <Button
            style={{ alignSelf: "center" }}
            onClick={() => toggle("modal")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default Modal;
