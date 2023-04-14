import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
export const GET_RECIPE_ID = 'GET_RECIPE_ID'
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const GET_ALL_DIETS = 'GET_ALL_DIETS'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const FILTER_BY_SOURCE = 'FILTER_SOURCE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const CURRENT_PAGE = 'CURRENT_PAGE'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'


export const getAllRecipes = () => {
  return async(dispatch) => {
    try {
      let response = await axios.get('/recipes')
      const allRecipes =  response.data
      dispatch({
        type: GET_ALL_RECIPES,
        payload: allRecipes
      })
    } catch (e) {
      alert ('I cant get all the recipes',e.message)
    }
  }
};

export const getRecipeID = (id) => {
  return async(dispatch) => {
    try {
      let response = await axios.get(`/recipes/${id}`)
      const recipeID = response.data
      return dispatch({
        type: GET_RECIPE_ID,
        payload: recipeID
      })
    } catch (e) {
      alert ('I cant get that recipe',e.message)
    }
  }
};

export const getRecipeName = (name) => {
  return async(dispatch) => {
    try {
      let response = await axios.get(`/recipes?name=${name}`)
      const recipeName = response.data
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: recipeName
      })
    } catch (e) {
      alert (`The Recipe "${name}" does not exist`,e.message)
    }
  }
};

export const createRecipe = (payload) => {
  return async(dispatch) => {
      let response = await axios.post('/recipes',payload)
      return dispatch({
        type: CREATE_RECIPE,
        payload: response
      })
   
  }
};

export const getAllDiets = () => {
  return async(dispatch) => {
    try {
      let response = await axios.get('/diets')
      const allDiets = response.data
      return dispatch({
        type: GET_ALL_DIETS,
        payload: allDiets
      })
    } catch (e) {
      alert ('I cant get all the diets',e.message)
    }
  }
};

export const orderByName = (payload) => {
   return (dispatch) => {
    return dispatch({type: ORDER_BY_NAME, payload})
   }
};

export const orderByHealthScore = (payload) => {
  return (dispatch) => {
   return dispatch({type: ORDER_BY_HEALTHSCORE, payload})
  }
};

export const  filterByDiets = (payload) => {
  return (dispatch) => {
   return dispatch({type: FILTER_BY_DIETS, payload})
  }
};

export const filterBySource = (payload) => {
  return (dispatch) => {
   return dispatch({type: FILTER_BY_SOURCE, payload})
  }
};

export const deleteRecipe = (id) => {
  return async(dispatch) => {
    try {
      let response = await axios.delete(`/recipes/delete/${id}`)
      return dispatch({
        type: DELETE_RECIPE,
        payload: response
      })
      
    } catch (e) {
      alert ('Could not delete recipe')
    }
  }
};

export const currentPage = (payload) => {
  return(dispatch) => {
    return dispatch({type: CURRENT_PAGE, payload})
  }
}

export const clearDetail = () => {
  return(dispatch) => {
    return dispatch({
      type: CLEAR_DETAIL
    })
  }
}
