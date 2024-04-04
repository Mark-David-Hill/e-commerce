import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("use effect");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <div className="products-container">
      <h1>Here's the products page</h1>
      {products &&
        products.map((product) => {
          return (
            <div className="product-card-wrapper">
              <img src={product.image} alt="" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <button>Add to Cart</button>
              <button>View More Details</button>
            </div>
          );
        })}
    </div>
  );
}
