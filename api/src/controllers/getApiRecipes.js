const axios = require ('axios');
require('dotenv').config();
const { API_KEY, API_URL } = process.env;


const instructionsArray = (instructions) => {
  return instructions.flatMap((instruction) => {
    return instruction.steps.map((step) => {
      return {number: step.number, step: step.step};
    });
  });
};


module.exports = getApiRecipes = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    //const { data } = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);

    const allRecipes = data.results.map(r => {
      return {
        id: r.id,
        name: r.title,
        image: r.image,
        summary: r.summary,
        healthScore: r.healthScore,
        instructions: instructionsArray(r.analyzedInstructions),
        diets: r.diets,
        createdInDb: false
      }
    })
    
    return allRecipes
  } catch (e) {
    return e
  }
}
