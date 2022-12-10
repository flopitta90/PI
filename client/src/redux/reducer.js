export const ADD_RECIPES = 'ADD_RECIPES'
export const ADD_DIETS = 'ADD_DIETS'
export const SEARCH_RECIPES = 'SEARCH_RECIPES'


const initialState = {
  myFavorites: [],
  allRecipes: [],
  allDiets:[],
  showingRecipes:[],
}

function reducer (state = initialState, action){
  switch(action.type){
    case ADD_RECIPES:
      return {...state, allRecipes: [...state.allRecipes, ...action.payload], showingRecipes: [...action.payload]};
    case ADD_DIETS:
      return {...state, allDiets: [...state.allDiets, ...action.payload]};
    case SEARCH_RECIPES:
      return {...state, showingRecipes: [...action.payload]}  
    default: return state  
  }
}

export default reducer