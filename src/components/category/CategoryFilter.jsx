export default function CategoryFilter(props) {
  const { updateCategories } = props;

  return (
    <div className="category-filter">
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
        <label htmlFor="category2"> Jewelry</label>
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
      </div>
    </div>
  );
}
