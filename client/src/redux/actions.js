import { ADD_DIETS, ADD_RECIPES, FILTER_DIETS, SEARCH_RECIPES } from "./reducer";

export function addRecipes(recipes){
  return {type: ADD_RECIPES, payload: recipes}
}

export function addDiets(diets){
  return {type: ADD_DIETS, payload: diets}
}

export function searchRecipes(recipes){
  return {type: SEARCH_RECIPES, payload: recipes}
}

export function filterDiets(diet){
  return {type: FILTER_DIETS, payload: diet }
}