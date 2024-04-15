// Set up datetime here

import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { CartContext } from "../components/CartProvider";

export default function AddToCartButton(props) {
  const { setCartItems, cartItems } = useContext(CartContext);
  const { productId } = props;

  const handleClick = () => {
    if (cartItems.length > 0) {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              count: 1,
            };
          }
          return item;
        });
      });
    }
  };

  return (
    <div>
      {cartItems[productId - 1]?.count > 0 ? (
        <NavLink to="/cart">Go to Checkout</NavLink>
      ) : (
        <button onClick={() => handleClick(cartItems[productId - 1])}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
