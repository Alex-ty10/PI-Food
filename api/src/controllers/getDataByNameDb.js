const { Recipe, Diets } = require ('../db');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = getDataByNameDb = async(name) => {
  try {
    const data = await Recipe.findAll({
      where: {
        name:{
          [op.iLike]: `%${name}%`
        }
      },
      include: [{
        model: Diets,
        atributes: ['name'],
        through:{
         attributes: {exclude: ['createdAt', 'updatedAt']}
        }
        
      }]
    });
    return data;
  } catch (e) {
    return next(e)
  }
};