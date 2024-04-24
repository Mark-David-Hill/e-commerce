import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartContext } from "../context/CartProvider";

import ProductCard from "./ProductCard";

export default function ProductsList(props) {
  const { cartItems } = useContext(CartContext);
  const { currentCategories, orderCategory, orderBy, searchTerm } = props;
  const [numResults, setNumResults] = useState(0);

  const idDesc = (a, b) => a.id - b.id;
  const idAsc = (a, b) => b.id - a.id;
  const alphabeticalDesc = (a, b) => a.title.localeCompare(b.title);
  const alphabeticalAsc = (a, b) => b.title.localeCompare(a.title);
  const priceDesc = (a, b) => a.price - b.price;
  const priceAsc = (a, b) => b.price - a.price;

  const categoryFilterCriteria = (product) =>
    (currentCategories.includes("women's clothing") &&
      product.category === "women's clothing") ||
    (currentCategories.includes("men's clothing") &&
      product.category === "men's clothing") ||
    (currentCategories.includes("jewelery") &&
      product.category === "jewelery") ||
    (currentCategories.includes("electronics") &&
      product.category === "electronics");

  const sortCriteria =
    orderCategory === "id"
      ? orderBy === "asc"
        ? idAsc
        : idDesc
      : orderCategory === "alphabet"
      ? orderBy === "asc"
        ? alphabeticalAsc
        : alphabeticalDesc
      : orderCategory === "price"
      ? orderBy === "asc"
        ? priceAsc
        : priceDesc
      : undefined;

  useEffect(() => {
    setNumResults(0);
    if (cartItems) {
      cartItems.forEach((item) => {
        searchTerm &&
          (item.product.title.toLowerCase().includes(searchTerm) ||
            item.product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          setNumResults((prev) => prev + 1);
      });
    }
  }, [searchTerm, cartItems, numResults]);

  return (
    <div className="products-list-wrapper">
      {currentCategories.length === 0 ? (
        <h3>No results. Please select a category</h3>
      ) : searchTerm.trim() !== "" && numResults === 0 ? (
        <h3>No products match your search. Please try again.</h3>
      ) : cartItems.length > 0 ? (
        cartItems
          .map((item) => item.product)
          .filter(categoryFilterCriteria)
          .sort(sortCriteria)
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                searchTerm={searchTerm}
              />
            );
          })
      ) : (
        <FontAwesomeIcon icon="fa-circle-notch" spin size="xl" />
      )}
    </div>
  );
}
