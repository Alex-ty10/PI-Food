const { Recipe, Diets } = require ('../db')

module.exports = getDbRecipes = async() => {

 try {
  const RecipesDb = await Recipe.findAll({
    include: [{
      model: Diets,
      attributes: [ 'name' ],
      through:{
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
    }]
  })

  return RecipesDb
 } catch (e) {
  return next(e)
 }
}