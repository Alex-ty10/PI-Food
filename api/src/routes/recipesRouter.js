const { Router } = require('express');
const router = Router();
const getApiRecipes = require ('../controllers/getApiRecipes');//para traer toda la data
const getDbRecipes =  require ('../controllers/getDbRecipes');
const getDataByID = require ('../controllers/getDataByID');//para filtrar por id
const getDataByNameApi = require ('../controllers/getDataByNameApi');//para filtrar por name
const getDataByNameDb =  require ('../controllers/getDataByNameDb');
const createRecipe =  require ('../controllers/createRecipe');//para crear mi receta
const deleteRecipe = require('../controllers/deleteRecipe');


//ruta all recipes y filtrado por name
router.get('/', async (req, res, next) => {
  try {
    const { name } =  req.query;
    if(!name){
      const apiData = await getApiRecipes();
      const dbData = await getDbRecipes();

      if(!apiData && !dbData){
        console.log('no hay datos')
        return res.status(404).json({ msg: "We can't seem to find the page you're looking for"})
      }

      allData = [...dbData, ...apiData];
        console.log(allData.length +' hay datos los devuelvo');
        return res.status(200).json(allData)
    }

    const apiDataByName = await getDataByNameApi(name);
    const dbDataByName = await getDataByNameDb(name);

    if(!apiDataByName && !dbDataByName) {
      console.log('no hay datos me pasaron nombre')
      return res.status(404).json({ msg: "This recipe doesn't exist" })
    }

    let allDataByName = [...dbDataByName, ...apiDataByName];
    console.log(allDataByName.length + 'hay datos por name')
    return res.status(200).json(allDataByName)

} catch (e) {
  return next(e)
  /* return res.status(404).send('problemas en allrecipes') */
}
});

//ruta buscadora por id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).send('No hay id')
    const recipeId = await getDataByID(id)
    return res.status(200).json(recipeId)
  } catch (e) {
    return next(e)
  }
  
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).send('Recipe ID was not provided');
    }
    await deleteRecipe(id);
    return res.status(200).send(`Recipe has been deleted`);
  } catch (e) {
    return next(e);
  }
});


//ruta creadora de la receta
router.post('/', async (req, res, next) => {
  try {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
  
    if(!name || !image || !summary || !healthScore || !instructions || !diets){
      return res.status(404).send('Missing data')
    };
    if(healthScore < 1 || healthScore > 100){
      return res.status(404).send(`The healthScore ${healthScore} is not allowed`)
    };
    const createdRec =  await createRecipe(name, image, summary, healthScore, instructions, diets)
    return res.status(200).send(`The Recipe ${name} was created successfully`)
  } catch (e) {
    return next(e)
  }
})


module.exports = router;