import { useContext } from "react";
import { CartContext } from "../components/CartProvider";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeItem = (id) => {
    console.log("remove item with id #", id);
    // setCartItems((prev) => {
    //   return prev.map((item) => {
    //     if (item.product.id === id) {
    //       return null;
    //     }
    //     return item;
    //   });
    // });
  };

  const adjustCount = (id, shouldIncrement) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === id) {
          return {
            ...item,
            count: shouldIncrement
              ? item.count + 1
              : item.count > 1
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
              <button onClick={() => removeItem(item.product.id)}>
                Remove from Cart
              </button>
              <button
                onClick={() => adjustCount(item.product.id, false)}
                disabled={item.count <= 1}
              >
                -
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
