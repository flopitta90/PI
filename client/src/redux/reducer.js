export const ADD_RECIPES = 'ADD_RECIPES'
export const ADD_DIETS = 'ADD_DIETS'
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const FILTER_DIETS = 'FILTER_DIETS'
export const SORT ='SORT'


const initialState = {
  myFavorites: [],
  allRecipes: [],
  allDiets:[],
  showingRecipes:[],
  filteredDiets: [],
}




function reducer (state = initialState, action){
  switch(action.type){
    case ADD_RECIPES:
      return {...state, allRecipes: [...state.allRecipes, ...action.payload], filteredDiets:[...action.payload], showingRecipes: [...action.payload]};
    case ADD_DIETS:
      return {...state, allDiets: [...state.allDiets, ...action.payload]};
    case SEARCH_RECIPES:
      return {...state, filteredDiets:[...action.payload], showingRecipes: [...action.payload]};
    case FILTER_DIETS:
      return {...state, showingRecipes:[...action.payload]};
    case SORT: 
      if(action.payload === 'as by id'){
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> a.id - b.id)]}
      }
      if(action.payload === 'des by id'){
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> b.id - a.id)]}
      }
      if(action.payload === 'as by score'){
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> a.healthScore - b.healthScore)]}
      }
      if(action.payload === 'des by score'){
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> b.healthScore - a.healthScore)]} 
      }
      if(action.payload === 'az'){
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> a.title.localeCompare(b.title))]}
      }else{
        return {...state, showingRecipes: [...state.showingRecipes.sort((a,b)=> b.title.localeCompare(a.title))]}
      }
    default: return state  
  }
}

export default reducer