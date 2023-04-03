//const axios = require ('axios');
const { Diets } = require ('../db');
const getApiRecipes = require ('./getApiRecipes')


module.exports = getDietsApi = async() => {

  let allDiets = await Diets.findAll();
  try {
    if(allDiets.length === 0){
      let dietsArray = []
      const apiData = await getApiRecipes();

      apiData.forEach(r => {
        r.diets.forEach(d => {
          if(!dietsArray.includes(d)){
            dietsArray.push(d)
          }
        })
      });

      console.log(dietsArray)
      
      dietsArray.forEach(d => {
        Diets.findOrCreate({
          where: { name: d }
        })
      })

      allDiets = await Diets.findAll();
      console.log(allDiets.length + ' Todo bien');
    }
    return allDiets
  } catch (e) {
    return e
  }
};

