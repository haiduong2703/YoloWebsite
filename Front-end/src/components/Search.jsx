import React, { useState } from "react";
import HeaderContext from "./HeaderContext";
import { useHistory, useLocation } from "react-router-dom";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const location = useLocation();
  const handleSearch = (event) => {
    event.preventDefault();
    // Thực hiện hành động tìm kiếm ở đây
    // sessionStorage.setItem("keysearch", searchTerm);
    // console.log("Searching for:", searchTerm);
    // const url = new URL(window.location.href);
    // url.searchParams.set("keysearch", searchTerm);
    // window.history.pushState({}, "", url);
    history.push(`/catalog?keysearch=${searchTerm}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Nhập tên sản phẩm cần tìm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
