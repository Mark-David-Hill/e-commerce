import { NavLink } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";

export default function ProductCard(props) {
  const { product, searchTerm, isForCart = false } = props;

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
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
      <NavLink to={`/products/${product.id}`}> View More Details</NavLink>
      {!isForCart && <AddToCartButton productId={product.id} />}
    </div>
  );
}
