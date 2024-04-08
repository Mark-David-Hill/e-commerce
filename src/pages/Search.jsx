export default function Search(props) {
  const { setSearchTerm, setOrderCategory, setOrderBy, orderBy } = props;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const handleSelect = (event) => {
    setOrderCategory(event.target.value.toLowerCase());
  };

  return (
    <div className="search-wrapper">
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
    </div>
  );
}
