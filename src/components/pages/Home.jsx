import { useContext } from "react";

import Category from "../category/Category";
import { CartContext } from "../context/CartProvider";

export default function Home() {
  const { categories } = useContext(CartContext);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Akamarak Shopping</h1>
      </div>
      <div className="categories-wrapper">
        {categories &&
          categories.map((category) => (
            <Category key={category.id} categoryName={category.name} />
          ))}
      </div>
    </div>
  );
}
