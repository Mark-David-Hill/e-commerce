import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product(props) {
  const { id } = props.match.params;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProductData(json));
  }, [id]);

  return (
    <div className="product-container">
      {productData ? (
        <div>
          <h1>{productData.title}</h1>
          <p>Category: {productData.category}</p>
          <p>Price: ${productData.price}</p>
          <p>
            Rating: {productData.rating.rate} out of {productData.rating.count}{" "}
            reviews{" "}
          </p>
          <p>{productData.description}</p>
          <button>Add to Cart</button>
          <img src={productData.image} width={"20%"} alt="Product" />
        </div>
      ) : (
        <FontAwesomeIcon icon="fa-circle-notch" spin size="xl" />
      )}
    </div>
  );
}
