import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";

import ConfirmationModal from "../modals/ConfirmationModal";
import AlertModal from "../modals/AlertModal";

export default function CartCheckout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);

  const checkoutConfirmationMessage =
    "Are you sure you want to checkout and purchase these items?";
  const alertModalMessage =
    "Your order has been processed. Please allow for 1-3 business days for your items to be shipped.";

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

  return (
    <div className="cart-checkout-wrapper">
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
      <button
        onClick={openConfirmationModal}
        disabled={getCartItemsCount() < 1}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
