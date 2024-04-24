export default function CategoryFilter(props) {
  const { categories, setCategories } = props;

  const updateCategories = (selectedCategory) => {
    if (categories.includes(selectedCategory)) {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      setCategories((prevCategories) => [...prevCategories, selectedCategory]);
    }
  };

  return (
    <div className="category-filter">
      <p>Categories:</p>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="category1"
          name="category1"
          value="men's clothing"
          checked={categories.includes("men's clothing")}
          onChange={() => updateCategories("men's clothing")}
        />
        <label htmlFor="category1"> Men's Clothing</label>
        <input
          type="checkbox"
          id="category2"
          name="category2"
          value="jewelery"
          checked={categories.includes("jewelery")}
          onChange={() => updateCategories("jewelery")}
        />
        <label htmlFor="category2"> Jewelry</label>
        <input
          type="checkbox"
          id="category3"
          name="category3"
          value="electronics"
          checked={categories.includes("electronics")}
          onChange={() => updateCategories("electronics")}
        />
        <label htmlFor="category3"> Electronics</label>
        <input
          type="checkbox"
          id="category4"
          name="category4"
          value="women's clothing"
          checked={categories.includes("women's clothing")}
          onChange={() => updateCategories("women's clothing")}
        />
        <label htmlFor="category4"> Women's Clothing</label>
      </div>
    </div>
  );
}
