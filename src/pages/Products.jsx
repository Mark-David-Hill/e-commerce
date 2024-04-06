import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");
  const [categories, setCategories] = useState([
    "women's clothing",
    "men's clothing",
    "jewelery",
    "electronics",
  ]);
  // const checkboxWrapper =
  //   document.getElementsByClassName("checkbox-wrapper")[0];

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  };

  const updateCategories = (checkboxWrapper) => {
    let checkedCategories = [];
    for (let i = 0; i < checkboxWrapper.children.length; i++) {
      const element = checkboxWrapper.children[i];
      if (element.type === "checkbox" && element.checked) {
        checkedCategories.push(element.value);
      }
    }
    setCategories(checkedCategories);
  };

  useEffect(() => {
    if (props?.location?.state?.categories) {
      let chosenCategory = props.location.state.categories[0];
      setCategories(chosenCategory);
      if (chosenCategory === "women's clothing") {
        document.getElementsByName("category1")[0].checked = true;
        document.getElementsByName("category2")[0].checked = false;
        document.getElementsByName("category3")[0].checked = false;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "men's clothing") {
        document.getElementsByName("category1")[0].checked = false;
        document.getElementsByName("category2")[0].checked = true;
        document.getElementsByName("category3")[0].checked = false;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "jewelery") {
        document.getElementsByName("category1")[0].checked = false;
        document.getElementsByName("category2")[0].checked = false;
        document.getElementsByName("category3")[0].checked = true;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "electronics") {
        document.getElementsByName("category1")[0].checked = false;
        document.getElementsByName("category2")[0].checked = false;
        document.getElementsByName("category3")[0].checked = false;
        document.getElementsByName("category4")[0].checked = true;
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
      <select name="filter-by" id="filter-by">
        <option value="id">Sort By Id</option>
        <option value="alphabet">Alphabetical</option>
      </select>
      <input type="text" placeholder="Search Products" />
      <button onClick={() => setOrderBy(orderBy === "desc" ? "asc" : "desc")}>
        {orderBy === "desc" ? "⌄" : "^"}
      </button>
      <p>Categories:</p>
      <div
        className="checkbox-wrapper"
        onClick={() =>
          updateCategories(
            document.getElementsByClassName("checkbox-wrapper")[0]
          )
        }
      >
        <input
          defaultChecked="true"
          type="checkbox"
          id="category1"
          name="category1"
          value="women's clothing"
        />
        <label htmlFor="category1"> Women's Clothing</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category2"
          name="category2"
          value="men's clothing"
        />
        <label htmlFor="category2"> Men's Clothing</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category3"
          name="category3"
          value="jewelery"
        />
        <label htmlFor="category3"> Jewelery</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category4"
          name="category4"
          value="electronics"
        />
        <label htmlFor="category4"> Electronics</label>
        <br />
      </div>
      {products &&
        products
          .filter(
            (product) =>
              (categories.includes("women's clothing") &&
                product.category === "women's clothing") ||
              (categories.includes("men's clothing") &&
                product.category === "men's clothing") ||
              (categories.includes("jewelery") &&
                product.category === "jewelery") ||
              (categories.includes("electronics") &&
                product.category === "electronics")
          )
          .map((product) => {
            return (
              <div className="product-card-wrapper" key={product.id}>
                <img src={product.image} alt="" />
                <h3>{product.title}</h3>
                <p>{truncate(product.description)}</p>
                <button>Add to Cart</button>
                <NavLink to={`/products/${product.id}`}>
                  View More Details
                </NavLink>
              </div>
            );
          })}
    </div>
  );
}
