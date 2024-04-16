import CartCheckout from "../CartCheckout";
import CartItems from "../CartItems";
import CartTotals from "../CartTotals";

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
