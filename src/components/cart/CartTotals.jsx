import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

export default function CartTotals(props) {
  const { cartItems } = useContext(CartContext);
  const { getCartItemsCount } = props;

  const getSubtotal = () =>
    cartItems.reduce(
      (prev, current) => prev + current.product.price * current.count,
      0
    );

  const getShippingPrice = () =>
    cartItems.reduce((prev, current) => prev + 1.5 * current.count, 0);

  const getTotal = () => {
    return getSubtotal() + getShippingPrice();
  };

  return (
    <div className="cart-totals-wrapper">
      <p>
        {getCartItemsCount() === 0
          ? "No Items in Cart"
          : getCartItemsCount() === 1
          ? "1 Item in Cart"
          : `${getCartItemsCount()} Items in Cart`}
      </p>
      <div className="totals-addition-wrapper">
        <p>Subtotal: ${getSubtotal().toFixed(2)}</p>
        <p>+</p>
        <p>Shipping: ${getShippingPrice().toFixed(2)}</p>
        <p>=</p>
        <p>Total: ${getTotal().toFixed(2)}</p>
      </div>
    </div>
  );
}
