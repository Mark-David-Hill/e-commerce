import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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

  const truncate = (str) => {
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  };

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

  const handleSelect = (event) => {
    setOrderCategory(event.target.value.toLowerCase());
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const idDesc = (a, b) => a.id - b.id;
  const idAsc = (a, b) => b.id - a.id;
  const alphabeticalDesc = (a, b) => a.title.localeCompare(b.title);
  const alphabeticalAsc = (a, b) => b.title.localeCompare(a.title);
  const priceDesc = (a, b) => a.price - b.price;
  const priceAsc = (a, b) => b.price - a.price;

  useEffect(() => {
    if (props?.location?.state?.categories) {
      const chosenCategory = props.location.state.categories[0];
      setCategories(chosenCategory);
      if (chosenCategory === "men's clothing") {
        document.getElementsByName("category1")[0].checked = true;
        document.getElementsByName("category2")[0].checked = false;
        document.getElementsByName("category3")[0].checked = false;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "jewelery") {
        document.getElementsByName("category1")[0].checked = false;
        document.getElementsByName("category2")[0].checked = true;
        document.getElementsByName("category3")[0].checked = false;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "electronics") {
        document.getElementsByName("category1")[0].checked = false;
        document.getElementsByName("category2")[0].checked = false;
        document.getElementsByName("category3")[0].checked = true;
        document.getElementsByName("category4")[0].checked = false;
      } else if (chosenCategory === "women's clothing") {
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
      <select name="filter-by" id="filter-by" onChange={handleSelect}>
        <option value="id">Sort By ID:</option>
        <option value="price">By Price</option>
        <option value="alphabet">Alphabetical</option>
      </select>
      <input
        type="text"
        placeholder="Search Products"
        onChange={handleSearch}
      />
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
          value="men's clothing"
        />
        <label htmlFor="category1"> Men's Clothing</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category2"
          name="category2"
          value="jewelery"
        />
        <label htmlFor="category2"> Jewelery</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category3"
          name="category3"
          value="electronics"
        />
        <label htmlFor="category3"> Electronics</label>
        <input
          defaultChecked="true"
          type="checkbox"
          id="category4"
          name="category4"
          value="women's clothing"
        />
        <label htmlFor="category4"> Women's Clothing</label>
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
          .sort(
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
              : undefined
          )
          .map((product) => {
            return (
              <div
                className="product-card-wrapper"
                key={product.id}
                style={{
                  display:
                    !searchTerm ||
                    (searchTerm &&
                      (product.title.toLowerCase().includes(searchTerm) ||
                        product.description.toLowerCase().includes(searchTerm)))
                      ? "flex"
                      : "none",
                }}
              >
                <img src={product.image} alt="" />
                <p>${product.price}</p>
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
