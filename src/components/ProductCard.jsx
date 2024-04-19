import { useContext } from "react";
import { CartContext } from "./context/CartProvider";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddToCartButton from "./AddToCartButton";

export default function ProductCard(props) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const {
    product,
    searchTerm,
    setIdToRemove,
    openRemoveModal,
    item,
    isForCart = false,
  } = props;

  const truncate = (str) => {
    return str.length > 119 ? str.substring(0, 116) + "..." : str;
  };

  const adjustCount = (id, shouldIncrement) => {
    if (
      !shouldIncrement &&
      cartItems.find((item) => item.product.id === id).count <= 1
    ) {
      setIdToRemove(id);
      openRemoveModal();
      return;
    }

    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === id) {
          return {
            ...item,
            count: shouldIncrement
              ? item.count + 1
              : item.count > 0
              ? item.count - 1
              : item.count,
          };
        }
        return item;
      });
    });
  };

  return (
    <div
      className="product-card-wrapper"
      style={{
        display:
          !searchTerm ||
          (searchTerm &&
            (product.title.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm)))
            ? "flex"
            : "none",
      }}
    >
      <NavLink to={`/products/${product.id}`}>
        <img src={product.image} alt="" />{" "}
      </NavLink>
      <div className="product-card-content">
        <div className="name-and-count-wrapper">
          <h3>{product.title}</h3>
          {isForCart && (
            <div className="cart-item-buttons-wrapper">
              <div className="plus-minus-buttons-wrapper">
                <button
                  onClick={() => adjustCount(item.product.id, false)}
                  disabled={item.count < 1}
                >
                  {item.count === 1 ? (
                    <FontAwesomeIcon icon="fa-trash" color="black" />
                  ) : (
                    "-"
                  )}
                </button>
                <button onClick={() => adjustCount(item.product.id, true)}>
                  +
                </button>
              </div>
              <p>x {item.count}</p>
            </div>
          )}
        </div>
        <h2>${product.price}</h2>
        <p>{truncate(product.description)}</p>
        <div className="product-card-buttons">
          <NavLink to={`/products/${product.id}`}> View More Details</NavLink>
          {!isForCart && <AddToCartButton productId={product.id} />}
        </div>
      </div>
    </div>
  );
}
