const getApiRecipes = require('./getApiRecipes');


module.exports = getDataByNameApi = async(name) => {
  try {
    const allRecipes = await getApiRecipes();
    const nameRecipe = allRecipes.filter(r =>
    r.name.toLowerCase().includes(name.toLowerCase())
  )
  return nameRecipe
  } catch (e) {
    return e
  }
}