//] Input de búsqueda para encontrar recetas por nombre
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipesName } from "../actions/actions";
import "./searchbar.css";

export const SearchBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(searchRecipesName(name));
  }

  return (
    <div class="row">
      <div className="input-icons">
        <form class=" s-flex" role="search">
          <input
            class="col-sm-8 form-control me-2"
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            class="col-sm-4 btn btn-warning"
            type="button"
            onClick={(e) => handleOnClick(e)}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default SearchBar;
