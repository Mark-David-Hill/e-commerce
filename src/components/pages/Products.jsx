import { useState, useEffect } from "react";

import ProductsList from "../ProductsList";
import CategoryFilter from "../CategoryFilter";
import Search from "../Search";

export default function Products(props) {
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

  useEffect(() => {
    const checkboxWrapper =
      document.getElementsByClassName("checkbox-wrapper")[0];
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
      updateCategories(checkboxWrapper);
    }
    checkboxWrapper && updateCategories(checkboxWrapper);
  }, [props?.location?.state?.categories]);

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
      <ProductsList
        categories={categories}
        orderCategory={orderCategory}
        orderBy={orderBy}
        searchTerm={searchTerm}
      />
    </div>
  );
}
