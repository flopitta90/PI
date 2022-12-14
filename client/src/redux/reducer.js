export const ADD_RECIPES = 'ADD_RECIPES'
export const ADD_DIETS = 'ADD_DIETS'
export const FILTER_DIETS = 'FILTER_DIETS'
export const SORT ='SORT'
export const ADD_RECIPE = 'ADD_RECIPE'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const ADD_ID = 'ADD_ID'
export const SELECTED_SORT = 'SELECTED_SORT'
export const SELECTED_NAME = 'SELECTED_NAME'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const SET_PAGE = 'SET_PAGE'

const initialState = {
  myFavorites: [],
  allRecipes: [],
  allDiets:[],
  showingRecipes:[],
  selectedIds:[],
  selectedSort: 'none',
  name:'',
  currentPage: 0
}




function reducer (state = initialState, action){
  switch(action.type){
    case ADD_RECIPES:
      return {...state, allRecipes: [...state.allRecipes, ...action.payload], showingRecipes: [...action.payload]};

    case ADD_DIETS:
      return {...state, allDiets: [...state.allDiets, ...action.payload]};

    case FILTER_DIETS:
      return {...state, showingRecipes:[...action.payload]};
      
    case SORT: 
      if(action.payload === 'none'){
        return{...state}
      }
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
      };
    case ADD_RECIPE: 
      return{...state, 
        allRecipes:[...state.allRecipes, action.payload], 
        showingRecipes:[...state.showingRecipes, action.payload],
        myFavorites:[...state.myFavorites, action.payload]
      };  
    case ADD_FAVORITE:
      return{...state,
        myFavorites: [...state.myFavorites, action.payload]
      };
    case DELETE_FAVORITE:
      return{...state,
        myFavorites: [...state.myFavorites.filter(recipe => recipe.id !== action.payload)]
      }  
    case ADD_ID:
      return{
        ...state,
        selectedIds: [...action.payload]
      }  
    case SELECTED_NAME:
      return{
        ...state,
        name: action.payload
      }  
    case SELECTED_SORT:
      return{
        ...state,
        selectedSort: action.payload
      }  
    case UPDATE_RECIPE:
      return{...state,
      myFavorites: [...state.myFavorites.filter(recipe => recipe.id !== action.payload.id), action.payload],
      allRecipes: [...state.allRecipes.filter(recipe => recipe.id !== action.payload.id), action.payload],
    }  
    case DELETE_RECIPE:
      return{ ...state,
      myFavorites: [...state.myFavorites.filter(recipe => recipe.id !== action.payload.id)],
      allRecipes: [...state.allRecipes.filter(recipe => recipe.id !== action.payload.id)]
    }
    case SET_PAGE:
      return{...state,
      currentPage: action.payload}
    default: return state  
  }
}

export default reducer