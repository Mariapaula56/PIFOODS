import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import Card from "./Card";
import Pagination from "./pagination";
import "./home.css";

import {
  filterByDiets,
  getRecetas,
  ordenByName,
  ordenByScore,
  SEARCH_RECIPE,
} from "../actions/actions";

let prevId = 1;

export const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recetas);
  const recipe = useSelector((state) => state.receta);
  const isActive = useSelector((state) => state.isActive);

  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  //estado local
  const [cardPerPage] = useState(9);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;

  var currentData = allRecipes.slice(indexOfFirstCard, indexOfLastCard);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecetas());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(ordenByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function sortHandle(e) {
    e.preventDefault();
    dispatch(ordenByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch({ type: SEARCH_RECIPE, payload: [] });
    dispatch(getRecetas());
    setCurrentPage(1);
  }

  function handleFilter(e) {
    dispatch(filterByDiets(e.target.value));
  }

  return (
    <div className="container1">
      <div className="Nav">
        <button className="all-button" onClick={handleClick}>
          Recipes
        </button>
        <SearchBar />
        <div className="orden-button ">
          <select className="orden-az" onChange={(e) => handleSort(e)}>
            <option value="orden">Orden</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select className="score-button" onChange={(e) => sortHandle(e)}>
            <option value="score">HealthScore</option>
            <option value="Min">Min to Max Score</option>
            <option value="Max">Max to Min Score</option>
          </select>
          <select className="diets-button" onChange={(e) => handleFilter(e)}>
            <option value="dietas">Diets</option>
            <option value="gluten free">gluten free</option>
            <option value="dairy free">dairy free</option>
            <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="paleolithic">paleolithic</option>
            <option value="primal">primal</option>
            <option value="whole 30">whole 30</option>
            <option value="pescatarian">pescatarian</option>
            <option value="ketogenic">ketogenic</option>
            <option value="fodmap friendly">fodmap friendly</option>
          </select>
        </div>
        <Link className="create-button" to="/recipeCreate">
          Create Recipe
        </Link>
      </div>

      <div className="recipe">
        {recipe.length > 0 ? (
          recipe.map((r) => {
            console.log("receta", r);
            return (
              <div className="card-container">
                <div className="recipe-card" key={prevId++}>
                  <div className="container-card">
                    <Link to={`/recipe/${r.id}`}>
                      <Card
                        image={r.image}
                        name={r.name}
                        dietsType={r.dietsType}
                        healthScore={r.healthScore}
                        id={r.id}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-container">
            {currentData?.map((r) => {
              return (
                <div className="recipe-card" key={prevId++}>
                  <div className="container-card">
                    <Link to={`/recipe/${r.id}`}>
                      <Card
                        key={r.id}
                        image={r.image}
                        name={r.name}
                        dietsType={
                          r.dietsType
                            ? r.dietsType.map((d) => <div>{d}</div>)
                            : r.diets?.map((d) =>
                                d.name.map((n) => <div>{n}</div>)
                              )
                        }
                        healthScore={r.healthScore}
                        id={r.id}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {isActive
        ? recipe.length > 8 && (
            <Pagination
              cardPerPage={cardPerPage}
              totalCards={allRecipes.length}
              pagination={pagination}
            />
          )
        : currentData && (
            <Pagination
              cardPerPage={cardPerPage}
              totalCards={allRecipes.length}
              pagination={pagination}
            />
          )}
    </div>
  );
};
export default Home;
