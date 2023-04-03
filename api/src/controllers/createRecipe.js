const { Recipe, Diets } = require('../db');

module.exports = createRecipe = async(name, image, summary, healthScore, instructions, diets) => {
  try {
    const newRecipe = await Recipe.create({
      name,
      image: image ? image : 'busca una imagen',
      summary,
      healthScore,
      instructions,
      diets
    })

    const dietsRec = await Diets.findAll({
      where: { name: diets }
    })

    newRecipe.addDiets(dietsRec);
  } catch (e) {
    return next(e)
  }
};