import { useState, createContext } from "react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const cartState = {
    cartItems,
    setCartItems,
  };

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
}
