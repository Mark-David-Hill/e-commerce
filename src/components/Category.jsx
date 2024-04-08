import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import electronics from "../assets/electronics.jpg";
import jewelry from "../assets/jewelry.jpg";
import womens from "../assets/womens.jpg";
import mens from "../assets/mens.jpg";

export default function Category(props) {
  const { categoryName } = props;

  return (
    <div className="category-container">
      <img
        src={
          categoryName === "electronics"
            ? electronics
            : categoryName === "jewelry"
            ? jewelry
            : categoryName === "men's clothing"
            ? mens
            : categoryName === "women's clothing"
            ? womens
            : null
        }
        alt=""
      />
      <div className="category-wrapper">
        <h2>{categoryName}</h2>
        <NavLink
          to={{
            pathname: "/products",
            state: {
              categories: [categoryName],
            },
          }}
        >
          View Products
        </NavLink>
      </div>
    </div>
  );
}
