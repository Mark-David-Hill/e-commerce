import { useState, useEffect } from "react";

import ProductsList from "../products/ProductsList";
import CategoryFilter from "../category/CategoryFilter";
import Search from "../products/Search";

export default function Products(props) {
  const [orderBy, setOrderBy] = useState("desc");
  const [orderCategory, setOrderCategory] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!props?.location?.state?.categories) {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
          setCategories(json);
        });
    } else {
      const chosenCategory = props.location.state.categories[0];
      setCategories([chosenCategory]);
    }
  }, [props?.location?.state?.categories]);

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
        <CategoryFilter categories={categories} setCategories={setCategories} />
      </div>
      <ProductsList
        categories={categories}
        orderCategory={orderCategory}
        orderBy={orderBy}
        searchTerm={searchTerm}
      />
    </div>
  );
}
