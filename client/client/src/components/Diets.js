import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecetas } from "../actions/actions";

export const Diets = () => {
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);
  const recetas = useSelector((state) => state.recetas);
  console.log("recetas", recetas);
  /*  console.log("dietas", dietas); */

  useEffect(() => {
    dispatch(getRecetas());
  }, []);
  /*  return (
    <div>
      {dietas?.map((d) => {
        return <h3>{d}</h3>;
      })}
    </div>
  ); */
  let scores = recetas?.map((r) => {
    return r.healthScore;
  });
  console.log("score", scores);
  return (
    <div>
      <h1>recetas</h1>
      {scores?.map((s) => (
        <div>{s}</div>
      ))}
    </div>
  );
};
export default Diets;
