/* eslint-disable react/style-prop-object */
import React from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import style from "../style/landing.css";

const LandingPage = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/Home");
  }
  return (
    <div class="container text-center">
      <div>
        <Nav></Nav>
        <div>
          <div class="s-grid gap-2" onClick={handleClick}>
            <span type="button" class="btn btn-outline-warning ">
              FOOD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
