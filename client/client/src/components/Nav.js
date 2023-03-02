/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { useHistory } from "react-router-dom";
import style from "../style/nav.css";

const Nav = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/Home");
  }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Recipes
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li class=" nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleClick}
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <SearchBar />
              </a>
            </li>
          </ul>
          <form class="d-flex" role="search"></form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
