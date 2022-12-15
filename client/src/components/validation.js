function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const validate = (recipeData, allRecipes)=>{
  let errors={}
  const titleExists = allRecipes.find(recipe => recipe.title === recipeData.title)
  if(titleExists){
    errors.title = 'That title already exists'
  }
  if(recipeData.title.length < 3){
    errors.title = 'Title is too short'
  }
  if(recipeData.title.length > 50){
    errors.title = 'Title is too long'
  }
  
  if(recipeData.image){
    if(!isImage(recipeData.image)){
      errors.image = 'The url does not belong to an image'
    }
  }
  if(!recipeData.summary){
    errors.summary ="A recipe's summary is needed"
  }
  if(recipeData.healthScore){
    if(typeof parseInt(recipeData.healthScore) !== 'number' || recipeData.healthScore > 100 || recipeData.healthScore < 0){
      errors.healthScore = 'The score must be a number and should be between 0-100'
    }
  }
  if(recipeData.diets.length < 1){
    errors.diets = 'You must assign at least one type of diet'
  }
  return errors
}

export default validate