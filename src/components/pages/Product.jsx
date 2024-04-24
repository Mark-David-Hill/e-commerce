import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddToCartButton from "../cart/AddToCartButton";
import { CartContext } from "../context/CartProvider";

export default function Product(props) {
  const { cartItems } = useContext(CartContext);
  const { id } = props.match.params;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProductData(json))
      .catch((err) => {
        console.error("Get Product Error: ", err);
      });
  }, [id, cartItems]);

  return (
    <div className="product-container">
      {productData ? (
        <div className="product-wrapper">
          <img src={productData.image} width={"20%"} alt="Product" />
          <div className="product-text-wrapper">
            <h1>{productData.title}</h1>
            <p>Category: {productData.category}</p>
            <p>Price: ${productData.price}</p>
            <p>
              Rating: {productData.rating.rate} stars out of{" "}
              {productData.rating.count} reviews{" "}
            </p>
            <h2>About this item:</h2>
            <p>{productData.description}</p>
            {<AddToCartButton productId={cartItems[id - 1].product.id} />}
          </div>
        </div>
      ) : (
        <FontAwesomeIcon icon="fa-circle-notch" spin size="xl" />
      )}
    </div>
  );
}
