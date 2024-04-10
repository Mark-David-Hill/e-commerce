import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../components/CartProvider";

export default function ProductCard(props) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { product, searchTerm } = props;

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  };

  const handleClick = (product) => {
    const itemObj = {
      count: 1,
      product: product,
    };
    console.log(itemObj);
    setCartItems((prev) => [...prev, itemObj]);
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
      <img src={product.image} alt="" />
      <p>${product.price}</p>
      <h3>{product.title}</h3>
      <p>{truncate(product.description)}</p>
      {cartItems
        .map((item) => {
          return item.product.id;
        })
        .includes(product.id) ? (
        <NavLink to="/cart">Go to Checkout</NavLink>
      ) : (
        <button onClick={() => handleClick(product)}>Add to Cart</button>
      )}
      <NavLink to={`/products/${product.id}`}>View More Details</NavLink>
    </div>
  );
}
