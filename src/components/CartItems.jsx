import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ConfirmationModal from "./modals/ConfirmationModal";
import ProductCard from "./ProductCard";

export default function CartItems() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);

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

  return (
    <div className="cart-items-wrapper">
      <ConfirmationModal
        modalIsOpen={removeModalIsOpen}
        setModalIsOpen={setRemoveModalIsOpen}
        message={removeConfirmationMessage}
        handleClickYes={handleRemove}
      />
      {cartItems
        .filter((item) => item.count > 0)
        .sort((a, b) => b.orderAddedId - a.orderAddedId)
        .map((item) => {
          return (
            <div key={item.product.id}>
              <ProductCard
                key={item.product.id}
                product={item.product}
                isForCart={true}
              />
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
              <p>x {item.count}</p>
            </div>
          );
        })}
    </div>
  );
}
