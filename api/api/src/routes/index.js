const { Router } = require("express");

const router = Router();
const recipes = require("./recipes");
const diets = require("./diets");
const recipe = require("./recipe");

router.use("/recipes", recipes);
router.use("/diets", diets);
router.use("/recipe", recipe);
module.exports = router;
