import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search(props) {
  const { setSearchTerm, setOrderCategory, setOrderBy, orderBy } = props;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    setOrderCategory(event.target.value.toLowerCase());
  };

  return (
    <div className="search-wrapper">
      <div className="filter-wrapper">
        <button onClick={() => setOrderBy(orderBy === "desc" ? "asc" : "desc")}>
          {orderBy === "desc" ? (
            <FontAwesomeIcon icon="fa-sort-up" />
          ) : (
            <FontAwesomeIcon icon="fa-sort-down" />
          )}
        </button>
        <select name="filter-by" id="filter-by" onChange={handleSelect}>
          <option value="id">Sort By ID:</option>
          <option value="price">By Price</option>
          <option value="alphabet">Alphabetical</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search Products"
        onChange={handleSearch}
      />
    </div>
  );
}
