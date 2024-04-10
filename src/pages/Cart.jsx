import { useContext } from "react";
import { CartContext } from "../components/CartProvider";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1>Here's the cart page</h1>
      {cartItems.map((item) => {
        return <p>{item}</p>;
      })}
    </div>
  );
}
