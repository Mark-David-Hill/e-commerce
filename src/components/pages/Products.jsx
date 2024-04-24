import { useState, useEffect, useContext } from "react";

import { CartContext } from "../context/CartProvider";
import CategoryFilter from "../category/CategoryFilter";
import ProductsList from "../products/ProductsList";
import Search from "../products/Search";

export default function Products(props) {
  const { categories } = useContext(CartContext);
  const [orderBy, setOrderBy] = useState("desc");
  const [orderCategory, setOrderCategory] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategories, setCurrentCategories] = useState([]);

  useEffect(() => {
    if (props?.location?.state?.currentCategories) {
      const chosenCategory = props.location.state.currentCategories[0];
      setCurrentCategories([chosenCategory]);
    } else {
      const newCategories = categories.map((category) => category.name);
      setCurrentCategories(newCategories);
    }
  }, [categories, props?.location?.state?.currentCategories]);

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="search-section">
        <Search
          setSearchTerm={setSearchTerm}
          setOrderCategory={setOrderCategory}
          setOrderBy={setOrderBy}
          orderBy={orderBy}
        />
        <CategoryFilter
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
      </div>
      <ProductsList
        currentCategories={currentCategories}
        orderCategory={orderCategory}
        orderBy={orderBy}
        searchTerm={searchTerm}
      />
    </div>
  );
}
