const { Router } = require("express");
const router = Router();

/* Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados */

const axios = require("axios");

const { ApiKey } = require("../db");
const { getDbById } = require("../controllers/controller");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let condition =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      );
    // testeo los id ara poder diferenciar los id que vienen de la api o de la db
    if (condition === true) {
      let idRecipeDb = await getDbById(id);
      res.status(200).json(idRecipeDb);
    } else {
      const idRecipeApi = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${ApiKey}`
      );

      let pasos = [];

      idRecipeApi.data.analyzedInstructions.map((ins) =>
        ins.steps.map((a) => {
          pasos.push(`${a.number} - ${a.step}`);
        })
      );

      let details = {
        image: idRecipeApi.data.image,
        name: idRecipeApi.data.title,
        dishTypes: idRecipeApi.data.dishTypes,
        dietsType: idRecipeApi.data.diets,
        summary: idRecipeApi.data.summary,
        healthScore: idRecipeApi.data.healthScore,
        steps: pasos,
      };
      res.send(details);
    }
  } catch (error) {
    res.status(404).send("recipe not found");
  }
});
module.exports = router;
