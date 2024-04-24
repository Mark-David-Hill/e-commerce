import CartCheckout from "../cart/CartCheckout";
import CartItems from "../cart/CartItems";
import CartTotals from "../cart/CartTotals";

export default function Cart() {
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <CartTotals />
      <CartCheckout />
      <CartItems />
    </div>
  );
}
