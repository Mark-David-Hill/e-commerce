import { useContext, useState } from "react";
import { CartContext } from "../CartProvider";

import ConfirmationModal from "../modals/ConfirmationModal";
import AlertModal from "../modals/AlertModal";
import CartItems from "../CartItems";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);

  const checkoutConfirmationMessage =
    "Are you sure you want to checkout and purchase these items?";

  const openConfirmationModal = () => {
    setCheckoutModalIsOpen(true);
  };

  const handleCheckout = () => {
    setAlertModalIsOpen(true);
    setCartItems((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          count: 0,
        };
      });
    });
  };

  const getCartItemsCount = () => {
    let totalItemCount = 0;
    cartItems.forEach((item) => {
      totalItemCount += item.count;
    });
    return totalItemCount;
  };

  const getSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.product.price * item.count;
    });
    return subtotal;
  };

  const getShippingPrice = () => {
    let shippingPrice = 0;
    cartItems.forEach((item) => {
      shippingPrice += 1.5 * item.count;
    });
    return shippingPrice;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingPrice();
  };

  const alertModalMessage =
    "Your order has been processed. Please allow for 1-3 business days for your items to be shipped.";

  return (
    <div className="cart-container">
      <h1>Here's the cart page</h1>
      <ConfirmationModal
        modalIsOpen={checkoutModalIsOpen}
        setModalIsOpen={setCheckoutModalIsOpen}
        message={checkoutConfirmationMessage}
        handleClickYes={handleCheckout}
      />

      <AlertModal
        modalIsOpen={alertModalIsOpen}
        setModalIsOpen={setAlertModalIsOpen}
        message={alertModalMessage}
      />
      <p>
        {getCartItemsCount() === 0
          ? "No Items in Cart"
          : getCartItemsCount() === 1
          ? "1 Item in Cart"
          : `${getCartItemsCount()} Items in Cart`}
      </p>
      <p>Subtotal: ${getSubtotal().toFixed(2)}</p>
      <p>Shipping: ${getShippingPrice().toFixed(2)}</p>
      <p>Total: ${getTotal().toFixed(2)}</p>
      <button
        onClick={openConfirmationModal}
        disabled={getCartItemsCount() < 1}
      >
        Proceed to Checkout
      </button>
      <CartItems />
    </div>
  );
}
