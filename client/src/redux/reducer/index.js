import {
  GET_ALL_RECIPES,
  GET_RECIPE_ID,
  GET_RECIPE_NAME,
  CREATE_RECIPE,
  GET_ALL_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_HEALTHSCORE,
  FILTER_BY_DIETS,
  FILTER_BY_SOURCE,
  DELETE_RECIPE,
  CURRENT_PAGE,
  CLEAR_DETAIL
} from '../actions/index';

const inicialState = {
  allRecipes: [],
  recipes: [],
  recipe: [],
  diets: [],
  page: 1,
  order:'',
}

function rootReducer(state = inicialState, action){

  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
        page: 1
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
            recipes: orderingName,
            page: 1,
            order:`Ordering ${action.payload}`
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
            recipes: orderingHealthScore,
            page: 1,
            order:`Ordering ${action.payload}`
          };

        case FILTER_BY_DIETS:
          const allRecipes = state.allRecipes;
          const filterRecipe = action.payload === 'All' ? allRecipes.filter(r => r.diets.length > 0)
          : allRecipes.filter(r => r.diets.find(r => r.name ?  r.name === action.payload : r === action.payload))
        return{
          ...state,
          recipes: filterRecipe,
          page: 1
        };

        

        case FILTER_BY_SOURCE:
          const allRecipe2 = state.allRecipes
          const filterRecipe2 = action.payload === 'DB' ? allRecipe2.filter(r => r.createdInDb)
          : allRecipe2.filter(r => !r.createdInDb)
        return{
          ...state,
          recipes: filterRecipe2,
          page: 1
        };

        case DELETE_RECIPE:
          return{
            ...state,
          };
        
        case CURRENT_PAGE:
          return{
            ...state,
            page: action.payload
          }

          case CLEAR_DETAIL:
            return{
              ...state,
              recipes: [],
              recipe: []
            }
  
    default: return state
    
  }
}

export default rootReducer