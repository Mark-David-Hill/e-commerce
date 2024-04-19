import { useContext, useState } from "react";
import { CartContext } from "./context/CartProvider";

import ConfirmationModal from "./modals/ConfirmationModal";
import ProductCard from "./ProductCard";

export default function CartItems() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);

  const removeConfirmationMessage =
    "Are you sure you want to remove this from the cart? (yes/no)";

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
    <div className="cart-items-container">
      <ConfirmationModal
        modalIsOpen={removeModalIsOpen}
        setModalIsOpen={setRemoveModalIsOpen}
        message={removeConfirmationMessage}
        handleClickYes={handleRemove}
      />
      <div className="cart-items-wrapper">
        {cartItems
          .filter((item) => item.count > 0)
          .sort((a, b) => b.orderAddedId - a.orderAddedId)
          .map((item) => {
            return (
              <div className="cart-item-wrapper" key={item.product.id}>
                <ProductCard
                  key={item.product.id}
                  product={item.product}
                  isForCart={true}
                  setIdToRemove={setIdToRemove}
                  openRemoveModal={openRemoveModal}
                  item={item}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
