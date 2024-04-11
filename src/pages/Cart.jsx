import { useContext } from "react";
import { CartContext } from "../components/CartProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const adjustCount = (id, shouldIncrement) => {
    if (
      !shouldIncrement &&
      cartItems.find((item) => item.product.id === id).count <= 1
    ) {
      const choice = prompt(
        "Are you sure you want to remove this from the cart? (yes/no)"
      );
      if (choice.toLowerCase() !== "y" && choice.toLowerCase() !== "yes") {
        return;
      } else {
        alert("Item was removed from cart");
      }
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

  return (
    <div className="cart-container">
      <h1>Here's the cart page</h1>
      {cartItems
        .filter((item) => item.count > 0)
        .map((item) => {
          return (
            <div key={item.product.id}>
              <p>
                {item.product.title} x {item.count}
              </p>
              {/* <button onClick={() => removeItem(item.product.id)}>
                Remove from Cart
              </button> */}
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
