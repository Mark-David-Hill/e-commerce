import { useContext } from "react";

import Category from "../category/Category";
import { CartContext } from "../context/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const { categories } = useContext(CartContext);

  return (
    <div className="home-container">
      <div>
        <div className="hero-section">
          <h1>Akamarak Shopping</h1>
        </div>
        <div className="categories-wrapper">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Category key={category.id} categoryName={category.name} />
            ))
          ) : (
            <FontAwesomeIcon icon="fa-circle-notch" spin size="xl" />
          )}
        </div>
      </div>
    </div>
  );
}
