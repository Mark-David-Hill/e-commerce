import { useContext, useState } from "react";
import { CartContext } from "../components/CartProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ConfirmationModal from "../components/modals/ConfirmationModal";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);

  const checkoutConfirmationMessage =
    "Are you sure you want to checkout and purchase these items?";
  const removeConfirmationMessage =
    "Are you sure you want to remove this from the cart? (yes/no)";

  const adjustCount = (id, shouldIncrement) => {
    if (
      !shouldIncrement &&
      cartItems.find((item) => item.product.id === id).count <= 1
    ) {
      setIdToRemove(id);
      openRemoveModal();
      return;
    }

    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === id) {
          return {
            ...item,
            count: shouldIncrement
              ? item.count + 1
              : item.count > 0
              ? item.count - 1
              : item.count,
          };
        }
        return item;
      });
    });
  };

  const openConfirmationModal = () => {
    setCheckoutModalIsOpen(true);
  };

  const openRemoveModal = () => {
    setRemoveModalIsOpen(true);
  };

  const handleRemove = () => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === idToRemove) {
          return {
            ...item,
            count: 0,
          };
        }
        return item;
      });
    });
  };

  const handleCheckout = () => {
    alert(
      `Your order has been processed. Please allow for 1-3 business days for your items to be shipped. Subtotal: $${getSubtotal()}, Shipping: $${getShippingPrice()}, Total: $${getTotal()}`
    );
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

  return (
    <div className="cart-container">
      <h1>Here's the cart page</h1>
      <ConfirmationModal
        modalIsOpen={checkoutModalIsOpen}
        setModalIsOpen={setCheckoutModalIsOpen}
        message={checkoutConfirmationMessage}
        handleClickYes={handleCheckout}
      />
      <ConfirmationModal
        modalIsOpen={removeModalIsOpen}
        setModalIsOpen={setRemoveModalIsOpen}
        message={removeConfirmationMessage}
        handleClickYes={handleRemove}
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
      {cartItems
        .filter((item) => item.count > 0)
        .sort((a, b) => b.orderAddedId - a.orderAddedId)
        .map((item) => {
          return (
            <div key={item.product.id}>
              <p>
                {item.product.title} x {item.count}
              </p>
              <button
                onClick={() => adjustCount(item.product.id, false)}
                disabled={item.count < 1}
              >
                {item.count === 1 ? (
                  <FontAwesomeIcon icon="fa-trash" color="black" />
                ) : (
                  "-"
                )}
              </button>
              <button onClick={() => adjustCount(item.product.id, true)}>
                +
              </button>
            </div>
          );
        })}
    </div>
  );
}
