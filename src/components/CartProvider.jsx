import { useState, createContext, useEffect } from "react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const cartState = {
    cartItems,
    setCartItems,
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const items = [];
        json.forEach((product) => {
          const itemObj = {
            count: 0,
            product: product,
          };
          items.push(itemObj);
        });
        // console.log(items.find((item) => item.product.id === 5));
        setCartItems(items);
      });
  }, []);

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
}
