import React from "react";

import photo from "../img/cooking.png";
import "./home.css";
let prevId = 1;

export default function Card(props) {
  return (
    <div className="card-container-card">
      <div>
        {props.image ? (
          <img className="image" src={`${props.image}`} alt="recipe"></img>
        ) : (
          <img className="image" src={photo} alt="recipe"></img>
        )}
      </div>
      <div className="card-body">
        <div>
          <strong>{props.name}</strong>
        </div>
        <div>
          <strong>Diets:</strong>

          {props.dietsType?.map((d) => {
            return <div key={prevId++}> {d} </div>;
          })}
        </div>
        <div>
          <strong>HealthScore:</strong> {`${props.healthScore}`}
        </div>
      </div>
    </div>
  );
}
