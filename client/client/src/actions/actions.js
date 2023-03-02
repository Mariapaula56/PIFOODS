import axios from "axios";

export const GET_RECETAS = "GET_RECETAS";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const ORDEN_BY_NAME = "ORDER_BY_NAME";
export const ORDEN_BY_SCORE = "ORDEN_BY_SCORE";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const GET_DIETS = "GET_DIETS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_RECIPE = "ADD_RECIPE";
export const CLEAN = "CLEAN";

export const getRecetas = () => {
  return (dispatch) =>
    axios
      .get("http://localhost:3001/recipes") //me traigo la ruta con un .get y despacho el type y el payload para dispara la accion
      .then((response) => {
        dispatch({
          type: GET_RECETAS,
          payload: response.data, //la respuesta la recibo en un data
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export function searchRecipesName(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );

      return dispatch({ type: SEARCH_RECIPE, payload: response.data });
    } catch {
      return alert("Reccipe not Found");
    }
  };
}

export const getDiets = () => {
  return (dispatch) =>
    axios
      .get("http://localhost:3001/diets")
      .then((response) => {
        dispatch({
          type: GET_DIETS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export function filterByDiets(dieta) {
  return {
    type: FILTER_BY_DIETS,
    payload: dieta,
  };
}

export function ordenByName(orden) {
  return {
    type: ORDEN_BY_NAME,
    payload: orden,
  };
}

export function ordenByScore(orden) {
  return {
    type: ORDEN_BY_SCORE,
    payload: orden,
  };
}

export function getDetails(id) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/recipe/${id}`)
      .then((response) => {
        dispatch({
          type: GET_DETAILS,
          payload: response.data, //la respuesta la recibo en un data
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export function addRecipes(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes", payload);

    return response;
  };
}
export function Clean() {
  return {
    type: CLEAN,
  };
}
