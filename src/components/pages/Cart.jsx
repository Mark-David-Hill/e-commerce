import { useContext } from "react";

import { CartContext } from "../context/CartProvider";
import CartCheckout from "../cart/CartCheckout";
import CartItems from "../cart/CartItems";
import CartTotals from "../cart/CartTotals";

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  const getCartItemsCount = () => {
    const totalItemCount =
      cartItems.length > 0
        ? cartItems.reduce((prev, current) => prev + current.count, 0)
        : 0;
    return totalItemCount;
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <CartTotals getCartItemsCount={getCartItemsCount} />
      <CartCheckout getCartItemsCount={getCartItemsCount} />
      <CartItems />
    </div>
  );
}
