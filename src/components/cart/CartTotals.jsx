import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

export default function CartTotals(props) {
  const { cartItems } = useContext(CartContext);
  const { getCartItemsCount } = props;

  const getSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.product.price * item.count;
    });
    return subtotal;
  };

  const getShippingPrice = () => {
    let shippingPrice = 0;
    cartItems.forEach((item) => {
      shippingPrice += 1.5 * item.count;
    });
    return shippingPrice;
  };

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
