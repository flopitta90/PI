import { ADD_RECIPES } from "./reducer";

export function addRecipes(recipes){
  return {type: ADD_RECIPES, payload: recipes}
}