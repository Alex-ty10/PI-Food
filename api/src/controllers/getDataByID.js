const axios =  require('axios');
require('dotenv').config();
const {API_KEY, API_URL} = process.env;
const { Recipe, Diets } =  require ('../db')

const instructionsArray = (instructions) => {
  return instructions.flatMap((instruction) => {
    return instruction.steps.map((step) => {
      return {number: step.number, step: step.step};
    });
  });
};

module.exports = getDataByID = async (id) => {
  try {
    //pregunto si el id posee un -, ya que los ids creados con uudi4 los poseen y los de la api no
    if(id.includes('-')){
      const dataDB = await Recipe.findOne({
        where: {id: id},
        include: {
          model: Diets,
          attributes: ['name']
        }
      })
      return dataDB
    }
    const { data } =  await axios.get(`${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`)
    const dataApi = {
      id: data.id,
      name: data.title,
      image: data.image,
      summary: data.summary,
      healthScore: data.healthScore,
      instructions: instructionsArray(data.analyzedInstructions),
      diets: data.diets
    }
    //console.log(data + ' aqui estoyyyyyyyyyyyy')
    return dataApi

  } catch (e) {
    return e
  }
}