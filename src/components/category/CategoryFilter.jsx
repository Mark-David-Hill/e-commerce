export default function CategoryFilter(props) {
  const { currentCategories, setCurrentCategories } = props;

  const updateCategories = (selectedCategory) => {
    if (currentCategories.includes(selectedCategory)) {
      setCurrentCategories((prevCategories) =>
        prevCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      setCurrentCategories((prevCategories) => [
        ...prevCategories,
        selectedCategory,
      ]);
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
          checked={currentCategories.includes("men's clothing")}
          onChange={() => updateCategories("men's clothing")}
        />
        <label htmlFor="category1"> Men's Clothing</label>
        <input
          type="checkbox"
          id="category2"
          name="category2"
          value="jewelery"
          checked={currentCategories.includes("jewelery")}
          onChange={() => updateCategories("jewelery")}
        />
        <label htmlFor="category2"> Jewelry</label>
        <input
          type="checkbox"
          id="category3"
          name="category3"
          value="electronics"
          checked={currentCategories.includes("electronics")}
          onChange={() => updateCategories("electronics")}
        />
        <label htmlFor="category3"> Electronics</label>
        <input
          type="checkbox"
          id="category4"
          name="category4"
          value="women's clothing"
          checked={currentCategories.includes("women's clothing")}
          onChange={() => updateCategories("women's clothing")}
        />
        <label htmlFor="category4"> Women's Clothing</label>
      </div>
    </div>
  );
}
