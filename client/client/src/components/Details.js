import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, Clean } from "../actions/actions";
import imagen from "../img/cooking.png";
import "./detail.css";

let prevId = 1;

export const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailRecipe = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(Clean());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={prevId++} className="container2">
      <div className="detail-p">
        {detailRecipe ? (
          <div className="recipe-detail">
            <h2 className="name1">{detailRecipe.name}</h2>

            {detailRecipe.image ? (
              <div>
                <img className="image" src={detailRecipe.image} alt="recipe" />
              </div>
            ) : (
              <div>
                <img className="image" src={imagen} alt="recipe" />
              </div>
            )}
            <div>
              <div className="text1">
                <strong>DishTypes</strong>: {`${detailRecipe.dishTypes}`}
              </div>

              <div className="text1">
                <strong>DietsType</strong>:
                {detailRecipe.dietsType
                  ? detailRecipe.dietsType.map((d) => <div>{d}</div>)
                  : detailRecipe.diets?.map((d) =>
                      d.name.map((n) => <div>{n}</div>)
                    )}
              </div>
              {/* las dietas de la api llegaban con el nombre dietstype y las de la db con el nombre diets pero dentro de un onj llamado name  */}

              <div className="text1">
                <strong>HealthScore</strong>: {`${detailRecipe.healthScore}`}
              </div>

              <div className="text1">
                <strong>Summary</strong>:{" "}
                {`${detailRecipe.summary?.replace(/<[^>]*>/g, "")}`}
              </div>

              <div className="text1">
                <strong>Steps</strong>
                <ul>
                  {detailRecipe.steps &&
                    detailRecipe.steps.map((d) =>
                      typeof d !== "object" ? (
                        <li key={prevId++}> {d} </li>
                      ) : (
                        <li key={prevId++}> {`${d.number} - ${d.step} `} </li>
                      )
                    )}
                </ul>
              </div>
              {/* los pasos de la db estan llegando en un objeto y los de la api en un string */}
              <div>
                <Link to="/Home">
                  <button className="back-button">Back</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Details;
