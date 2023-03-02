import {
  GET_RECETAS,
  SEARCH_RECIPE,
  ORDEN_BY_NAME,
  ORDEN_BY_SCORE,
  GET_DETAILS,
  GET_DIETS,
  FILTER_BY_DIETS,
  ADD_RECIPE,
  CLEAN,
} from "../actions/actions";

const initialState = {
  recetas: [],
  allrecetas: [],
  details: {},
  diets: [],
  receta: [],

  // recipeByIngredient: [],
  isActive: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECETAS: {
      return {
        ...state,
        recetas: [...action.payload],
        allrecetas: action.payload,
        isActive: false,
      };
    }
    case SEARCH_RECIPE:
      return {
        ...state,
        receta: action.payload,
        isActive: true,
      };

    case ORDEN_BY_NAME: {
      let sortedArr =
        action.payload === "asc"
          ? state.recetas.sort(function (a, b) {
              //al sort le ponemos lo que quiere que ordene
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                //el name que hay en recipes compara el que encuentra primero con el que encuentra despues
                return 1; //retorna la posicion 1 porque el b es mayor que el a entonces retorn el 1
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0; //si son iguales lo deja igual
            })
          : state.recetas.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recetas: sortedArr,
        isActive: false,
      };
    }

    case ORDEN_BY_SCORE: {
      let sortedArrScore =
        action.payload === "Max"
          ? state.recetas.sort(function (a, b) {
              //al sort le ponemos lo que quiere que ordene
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0; //si son iguales lo deja igual
            })
          : state.recetas.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recetas: sortedArrScore,
        isActive: false,
      };
    }

    case GET_DETAILS: {
      return {
        ...state,
        details: action.payload,
        isActive: false,
      };
    }

    case GET_DIETS: {
      return {
        ...state,
        diets: action.payload,
      };
    }

    case FILTER_BY_DIETS: {
      const allrecetas = state.allrecetas;
      //guardo las recetas que contengan el nombre de cierta dieta que me llega por payload
      const filteredByDiets = allrecetas.filter((r) =>
        r.dietsType?.some(
          (d) => d.toLowerCase() === action.payload.toLowerCase()
        )
      );

      return {
        ...state,
        recetas: filteredByDiets,
        isActive: false,
      };
    }

    case ADD_RECIPE:
      return {
        ...state,
        isActive: false,
      };

    case CLEAN:
      return {
        ...state,
        details: {},
        isActive: false,
      };

    default:
      return state;
  }
};

export default rootReducer;
