const { Recipe } = require('../db');

module.exports = async (id) => {
  const recipe = await Recipe.findByPk(id);
  if (!recipe) {
    throw new Error(`Recipe with id ${id} not found`);
  }
  await recipe.destroy();
};

