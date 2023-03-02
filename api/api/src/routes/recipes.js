/* [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
[ ] Resumen del plato
[ ] Nivel de "comida saludable" (health score)
[ ] Paso a paso */
const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { getAll } = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  let recetas = await getAll();

  try {
    if (name) {
      //si name existe (si lo enviaron por query)
      let recipeName = [];
      recetas.map((e) => {
        if (e.name.toLowerCase().includes(name.toLowerCase())) {
          recipeName.push(e);
          //pregunto si cada nombre me lo enviaron por query
        }
      });

      if (recipeName.length) {
        //si quedaron recetas guardadas
        let newRecipe = {}; //
        let nuevasRecetas = [];
        let pasos = [];
        recipeName.map((receta) => {
          receta.steps.map((paso) => pasos.push(paso));
        });

        recipeName.map((r) => {
          nuevasRecetas.push(
            (newRecipe = {
              image: r.image,
              name: r.name,
              dietsType: r.dietsType,
              healthScore: r.healthScore,
              steps: pasos,
              id: r.id,
            })
          );
        });

        res.send(nuevasRecetas);
      } else {
        res.status(404).send("recipe not found");
      }
    } else {
      if (recetas.length) {
        res.send(recetas);
      } else {
        res.status(404).send("recipes not found");
      }
    }
  } catch (error) {
    return res.status(400).send("recipes not found");
  }
});

/* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas. */

router.post("/", async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, dieta } = req.body;

    if (!name || !summary || !healthScore || !steps || !dieta) {
      res.status(404).send("faltan datos");
    } else {
      let score = Number(healthScore);
      const newReceta = await Recipe.create({
        name,
        image,
        summary,
        healthScore: score,
        steps,
      });
      //guardo en un variable la dieta creada del modelo dieta para generar la relacion con el mod recipe
      const dietsTypeDb = await Diet.create({
        name: dieta,
      });
      //la funcion adddiet se crea cuando se hace la relacion en la db
      newReceta.addDiet(dietsTypeDb);

      res.status(200).send("created recipe");
    }
  } catch (error) {
    res.status(400).send("invalid recipe");
  }
});

router.put("/", async (req, res) => {
  const { id } = req.query;
  const dieta = req.body.dieta;
  const dietas = await Diet.update(
    {
      name: dieta,
    },

    {
      where: {
        id: id,
      },
    }
  );

  console.log("dietas", dietas);
  res.send("dieta actualizada");
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  await Diet.destroy({
    where: {
      id: id,
    },
  });
  res.send("dieta borrada");
});

module.exports = router;
