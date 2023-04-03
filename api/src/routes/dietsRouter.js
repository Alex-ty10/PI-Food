const { Router } = require('express');
const router = Router();
const getDietsApi = require('../controllers/getDietsApi');

router.get('/', async(req, res, next) => {
  try {
    const diets = await getDietsApi()
    
    if(!diets) res.status(404).send('Cant find the diets')

    console.log(diets.length + ' todo bien')
    return res.status(200).json(diets)
  } catch (e) {
    return next(e)
  }
})


module.exports = router;