import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../components/CartProvider";

export default function ProductCard(props) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { product, searchTerm } = props;

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  };

  const handleClick = (id) => {
    setCartItems((prev) => [...prev, id]);
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
      <h4>{cartItems && cartItems}</h4>
      <button onClick={() => handleClick(product.id)}>Add to Cart</button>
      <NavLink to={`/products/${product.id}`}>View More Details</NavLink>
    </div>
  );
}
