export const ADD_RECIPES = 'ADD_RECIPES'


const initialState = {
  myFavorites: [],
  allRecipes: []
}

function reducer (state = initialState, action){
  switch(action.type){
    case ADD_RECIPES:
      return {...state, allRecipes: [...state.allRecipes, action.payload]};
    default: return state  
  }
}

export default reducer