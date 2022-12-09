export const ADD_RECIPES = 'ADD_RECIPES'
export const ADD_DIETS = 'ADD_DIETS'


const initialState = {
  myFavorites: [],
  allRecipes: [],
  allDiets:[],
}

function reducer (state = initialState, action){
  switch(action.type){
    case ADD_RECIPES:
      return {...state, allRecipes: [...state.allRecipes, ...action.payload]};
    case ADD_DIETS:
      return {...state, allDiets: [...state.allDiets, ...action.payload]}  
    default: return state  
  }
}

export default reducer