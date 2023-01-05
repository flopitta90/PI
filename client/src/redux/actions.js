import { ADD_DIETS, ADD_RECIPE, ADD_RECIPES, FILTER_DIETS, SORT, ADD_FAVORITE, DELETE_FAVORITE, ADD_ID, SELECTED_NAME, SELECTED_SORT, UPDATE_RECIPE, DELETE_RECIPE} from "./reducer";

export function addRecipes(recipes){
  return {type: ADD_RECIPES, payload: recipes}
}

export function addDiets(diets){
  return {type: ADD_DIETS, payload: diets}
}

export function filterDiets(diet){
  return {type: FILTER_DIETS, payload: diet }
}

export function sort(sortBy){
  return {type: SORT, payload: sortBy}
}

export function addNewRecipe(recipe){
  return {type: ADD_RECIPE, payload: recipe}
}

export function addFav(recipe){
  return {type: ADD_FAVORITE, payload: recipe}
}

export function deleteFav(id){
  return {type: DELETE_FAVORITE, payload: id}
}

export function addDietId(id){
  return{type: ADD_ID, payload: id}
}

export function setName(name){
  return{type: SELECTED_NAME, payload: name}
}

export function setSelectedSort(sort){
  return{type: SELECTED_SORT, payload: sort}
}

export function updateRecipe(updatedRecipe){
  return {type: UPDATE_RECIPE, payload: updatedRecipe}
}
export function deleteRecipe(deletedRecipe){
  return {type: DELETE_RECIPE, payload: deletedRecipe}
}