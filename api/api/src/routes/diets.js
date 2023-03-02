const { Router } = require("express");
const router = Router();
const { getAll } = require("../controllers/controller");

router.get("/", async (req, res) => {
  try {
    const recetas = await getAll();

    let dietas = []; //solo los nombres de dietas

    recetas.map((r) => {
      r.dietsType
        ? r.dietsType.map((d) => {
            dietas.push(d);
          })
        : r.diets.map((d) => {
            d.name.map((e) => {
              dietas.push(e);
            });
          });
    });

    //creo una variable donde voy a filtrar las dietas para que no queden nombre repetidos
    let filteredDiets = dietas.filter((item, index) => {
      return dietas.indexOf(item) === index;
    });

    res.send(filteredDiets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
