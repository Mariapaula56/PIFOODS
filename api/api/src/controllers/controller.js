const axios = require("axios");

const { Recipe, Diet } = require("../db");
const { ApiKey } = require("../db");

const getApiInfo = async () => {
  const getApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&addRecipeInformation=true&number=100`
  );

  const infoApi = await getApi.data.results.map((receta) => {
    //extraigo solo las recetas

    let pasos = [];
    //saco los steps aparte y los guarde en el array pasos
    receta.analyzedInstructions.map(
      (ins) =>
        ins.steps.map((a) => {
          pasos.push({ number: a.number, step: a.step });
        })
      //mapeo cada paso y lo pusheo a la var
    );

    return {
      //trae solo la informacion que voy a usar en las rutas
      id: receta.id,
      name: receta.title,
      image: receta.image,
      summary: receta.summary,
      healthScore: receta.healthScore,
      dishTypes: receta.dishTypes,
      dietsType: receta.diets,
      steps: pasos, //aqui puse los pasos
    };
  });

  return infoApi;
};

//traemos la informacion de la bd
const getDb = async () => {
  return await Recipe.findAll({
    include: {
      //incluimos el modelo para poder hacer la relacion
      model: Diet,
      attributes: ["name"],
      // through: {
      //   attributes: [],
      // },
    },
  });
};

const getDbById = async (id) => {
  //traigo los id de la db
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      // through: {
      //   attributes: [],
      // },
    },
  });
};

//concateno y hago una funcion que me traiga la info de la api y de la db
const getAll = async () => {
  const infoApi1 = await getApiInfo();
  const infoDb = await getDb();
  const allInfo = infoApi1.concat(infoDb);
  return allInfo;
};

module.exports = {
  getApiInfo,
  getDb,
  getAll,
  getDbById,
};
//exporto las funciones para usarlas en la rutas
