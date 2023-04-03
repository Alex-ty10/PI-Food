import {
  GET_ALL_RECIPES,
  GET_RECIPE_ID,
  GET_RECIPE_NAME,
  CREATE_RECIPE,
  GET_ALL_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_HEALTHSCORE,
  FILTER_BY_DIETS,
  FILTER_BY_SOURCE
} from '../actions/index';

const inicialState = {
  allRecipes: [],
  recipes: [],
  recipe: [],
  diets: [],
}

function rootReducer(state = inicialState, action){

  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };

      case GET_RECIPE_ID:
        return{
          ...state,//copia estado importante no olvidar
          recipe: action.payload
        };

        case GET_RECIPE_NAME:
        return{
          ...state,
          recipes: action.payload
        };

        case CREATE_RECIPE:
        return{
          ...state,
        };

        case GET_ALL_DIETS:
        return{
          ...state,
          diets: action.payload
        };

        case ORDER_BY_NAME:
          const orderingName = action.payload === 'A - Z' ?
          state.recipes.sort((a ,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
            return 0
          })
          :
          state.recipes.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
            return 0
          })
          return {
            ...state,
            countries: orderingName,
          };

         /*  case GET_COUNTRY_NAME:
            const allCountries3 = state.allCountries;
            const filtrados = allCountries3.filter((producto) => producto.name.toLowerCase().includes(action.payload));
            console.log('este es' + filtrados)
        return{
          ...state,
          countries: filtrados
        }; */
        case ORDER_BY_HEALTHSCORE:
          const orderingHealthScore = action.payload === 'More' ?
          state.recipes.sort((a, b) => Number(b.healthScore) - Number(a.healthScore))
          :
          state.recipes.sort((a, b) => Number(a.healthScore) - Number(b.healthScore))
          return{
            ...state,
            countries: orderingHealthScore
          };

        case FILTER_BY_DIETS:
          const allRecipes = state.allRecipes;
          const filterRecipe = action.payload === 'All' ? allRecipes.filter(r => r.diets.length > 0)
          : allRecipes.filter(r => r.recipes.find(r => r.name === action.payload))
        return{
          ...state,
          countries: filterRecipe
        };

        

        case FILTER_BY_SOURCE:
          const allRecipe2 = state.allRecipes
          const filterRecipe2 = action.payload === 'DB' ? allRecipe2.filter(r => r.createdInDB)
          : allRecipe2.filter(r => !r.createdInDB)
        return{
          ...state,
          countries: filterRecipe2
        };
  
    default: return state
    
  }
}

export default rootReducer