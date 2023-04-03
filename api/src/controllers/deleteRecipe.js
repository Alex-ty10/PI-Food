const { Recipe } = require ('../db');

module.exports = deleteRecipe = async(name) => {
  const recipe = await Recipe.findOne({ where:{name}});
  await recipe.destroy();
};