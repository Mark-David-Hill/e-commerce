import { useState, useEffect } from "react";

import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import Search from "./Search";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");
  const [orderCategory, setOrderCategory] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([
    "women's clothing",
    "men's clothing",
    "jewelery",
    "electronics",
  ]);

  const updateCategories = (checkboxWrapper) => {
    const checkedCategories = [];
    for (let i = 0; i < checkboxWrapper.children.length; i++) {
      const element = checkboxWrapper.children[i];
      if (element.type === "checkbox" && element.checked) {
        checkedCategories.push(element.value);
      }
    }
    setCategories(checkedCategories);
  };

  const idDesc = (a, b) => a.id - b.id;
  const idAsc = (a, b) => b.id - a.id;
  const alphabeticalDesc = (a, b) => a.title.localeCompare(b.title);
  const alphabeticalAsc = (a, b) => b.title.localeCompare(a.title);
  const priceDesc = (a, b) => a.price - b.price;
  const priceAsc = (a, b) => b.price - a.price;

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

  const categoryFilterCriteria = (product) =>
    (categories.includes("women's clothing") &&
      product.category === "women's clothing") ||
    (categories.includes("men's clothing") &&
      product.category === "men's clothing") ||
    (categories.includes("jewelery") && product.category === "jewelery") ||
    (categories.includes("electronics") && product.category === "electronics");

  useEffect(() => {
    console.log("use effect");

    if (props?.location?.state?.categories) {
      const chosenCategory = props.location.state.categories[0];
      const checkboxes = [
        document.getElementsByName("category1")[0],
        document.getElementsByName("category2")[0],
        document.getElementsByName("category3")[0],
        document.getElementsByName("category4")[0],
      ];
      const setCheckboxes = (checkedId) => {
        for (let i = 0; i < checkboxes.length; i++) {
          checkedId === i + 1
            ? (checkboxes[i].checked = true)
            : (checkboxes[i].checked = false);
        }
      };
      setCategories(chosenCategory);
      if (chosenCategory === "men's clothing") {
        setCheckboxes(1);
      } else if (chosenCategory === "jewelery") {
        setCheckboxes(2);
      } else if (chosenCategory === "electronics") {
        setCheckboxes(3);
      } else if (chosenCategory === "women's clothing") {
        setCheckboxes(4);
      }
      updateCategories(document.getElementsByClassName("checkbox-wrapper")[0]);
    }
    document.getElementsByClassName("checkbox-wrapper")[0] &&
      updateCategories(document.getElementsByClassName("checkbox-wrapper")[0]);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>
      <Search
        setSearchTerm={setSearchTerm}
        setOrderCategory={setOrderCategory}
        setOrderBy={setOrderBy}
        orderBy={orderBy}
      />
      <CategoryFilter updateCategories={updateCategories} />

      {products &&
        products
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
          })}
    </div>
  );
}
