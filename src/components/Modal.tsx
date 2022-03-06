import { useRef, Fragment, FormEvent } from "react";
import { Button, Input, toastConfig } from "./styledElements";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  productId: string;
  toggle: (arg: string) => void;
  display: string;
  deleteProduct: (id: string) => Promise<void>;
  addToCart: (params: { product: string; quantity: number }) => Promise<void>;
  UpdateProductModal: any;
}

function Modal({
  productId,
  toggle,
  display,
  deleteProduct,
  addToCart,
  UpdateProductModal,
}: ModalProps) {
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const handleAddToCart = (e: FormEvent) => {
    e.preventDefault();
    toggle("modal");
    const quantity = quantityRef.current?.value as string;
    if (quantity === "0") {
      return toast.error("Please enter a quantity", toastConfig);
    }
    console.log(productId, quantity);
    const params = { product: productId, quantity: +quantity };
    addToCart(params);
    const form = e.target as HTMLFormElement;
    return form.reset();
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
