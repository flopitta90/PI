const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const router = Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios')

router.get('/', async (req,res)=> {
  try {
    const { title } = req.query
    //we check if query has title
    if(title) {
      const result = await Recipe.findAll({where: {
        //we look for all the recipes that contain the title. 
        //with the signs % we are saying that we dont need it to be the complete title of our recipe.
        //with the i we assure to ignore the case (lower or upper)
        // and we are asking to include the diets.
        title: {[Op.iLike]:`%${title}%`},
      },include:Diet})
      //we check if there are no results, we want to send a message that we couldn't find any recipe
      if(result.length < 1) {
        throw new Error('There are no recipes with that name, check the spelling or try with another name')
        // else we send the array of recipes found
      } else {
          return res.status(200).send(result)
      } 
    }
    //if no title in the query means we will send all the recipes
    const allRecipes = await Recipe.findAll({include: Diet})
    return res.status(200).send(allRecipes)

  } catch (error) {
    return res.status(400).send({error: error.message})
  }
})


router.post('/bulk', async (req, res)=>{
  try {
    const data = req.body
    //we take all the data than we want from each reacipe.
    const recipes = data.results.map(item => {
          const recipe = {
            title: item.title,
            image: item.image,
            summary: item.summary,
            healthScore: item.healthScore,
            dishTypes: item.dishTypes.join(', '),
            analyzedInstructions: (item.analyzedInstructions[0].steps.map(element => 'Step ' + element.number + ': ' + element.step)).join("\n"),
            readyInMinutes: item.readyInMinutes,
            diets: item.diets,
            ingredients: item.extendedIngredients.map(ing => ing.original)
          }
          //we return the shorter recipe
          return recipe
    })
    //we create one instance of Recipe for each one of the array recipes.
    recipes.forEach(async element => { 
      const newRecipe = await Recipe.create(element)
      // from the array diets, we create or find the instance of Diet
      const newDiets = await element.diets.map(async diet => {
          const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
          return newDiet
        }
      )
      // we resolve all the promises from the diets array
      const result = await Promise.all(newDiets)
      //we add the diets to each recipes as they have relation manyToMany
      await newRecipe.addDiets(result)
    });
   res.status(200).send('The recipes have been succesfully created')
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
  
})


router.get('/:id', async (req,res)=>{
    const {id} = req.params
    //we check if there is an id and we look for the recipe by its Primary Key
    const result = await Recipe.findByPk(id)
    //if we find it we will send it in the response.
    if(result){
      try {
        return res.status(200).send(result)
      } catch (error) {
        return res.status(400).send({error: error.message})
      }
    }
    res.status(400).send(`The recipe with id ${id} does not exist`)
})
  
router.post('/',async(req,res)=>{
  let {title, image, summary, diets, healthScore, analyzedInstructions,readyInMinutes,ingredients,dishTypes} = req.body
  //we check that we have the minimum data to create a recipe
  if(!title|| !summary ||!diets){
    return res.status(400).send('You need to complete the required information from your recipe')
  }else{
    try {
      //in order to get the default values from the model. if the array coming from the body its empty, we change it to undefined
      if(ingredients.length === 0){ingredients = undefined}
      // we create the new recipe and we add the diets 
      const newRecipe = await Recipe.create({title, image, summary, healthScore, analyzedInstructions,readyInMinutes,ingredients, dishTypes})
      const newDiets = await diets.map(async diet => {
        const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
        return newDiet
      })
      const result = await Promise.all(newDiets)
      await newRecipe.addDiets(result)
      //we send on our response the recipe with the diets included
      const newRecipeDiet = await Recipe.findOne({where: {id : newRecipe.id}, include: Diet})
      res.status(200).send(newRecipeDiet)
    } catch (error) {
      return res.status(400).send({error: error.message})
    }
  }
})

router.put('/:id', async (req,res)=>{
  const {id} = req.params
  let {title, image, summary, diets, healthScore, analyzedInstructions,readyInMinutes,ingredients,dishTypes} = req.body
  if(!title ||!summary ||!diets){
    return res.status(400).send('You need to complete the required information from your recipe')
  }else{
    try {
      const recipe = await Recipe.findByPk(id)
      const updatedRecipe = await recipe.update({title, image, summary, healthScore, analyzedInstructions,readyInMinutes,ingredients, dishTypes})
      await recipe.setDiets([])
      const updatedDiets = await diets.map(async diet => {
        const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
        return newDiet
      })
      const result = await Promise.all(updatedDiets)
      await updatedRecipe.addDiets(result)

      const updatedRecipeDiet = await Recipe.findOne({where: {id : id}, include: Diet})
      res.status(200).send(updatedRecipeDiet)
    } catch (error) {
      return res.status(400).send({error: error.message})
    }
  }
  
})

router.delete('/:id', async(req,res)=>{
  const {id} = req.params
  try {
    const recipe = await Recipe.findByPk(id)
    await recipe.destroy()
    return res.status(200).send(recipe)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

// router.post('/bulkApi', async(req,res)=>{
//   try {
//     const data = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=e8395995beaf43db975258c9fe69fd6e&cuisine=italian&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&number=100&limitLicense=true',
//     { headers: { "Accept-Encoding": "gzip,deflate,compress" }})
    
//     let info = await data.data.results.map((ele) =>{  
//       return{
//           title: ele.title,
//           summary: ele.summary,
//           healthScore: ele.healthScore,
//           image: ele.image,
//           dishTypes: ele.dishTypes.join(', '),
//           analyzedInstructions: (ele.analyzedInstructions[0].steps.map(element => 'Step ' + element.number + ': ' + element.step)).join("\n"),
//           readyInMinutes: ele.readyInMinutes,
//           diets: ele.diets,
//           ingredients: ele.extendedIngredients.map(ing => ing.original)
//       }
//     }) 

//     info.forEach(async element => { 
//       const newRecipe = await Recipe.create(element)
//       const newDiets = element.diets.map(async diet => {
//           const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
//           return newDiet
//         }
//       )
//       const result = await Promise.all(newDiets)
//       await newRecipe.addDiets(result)
//     });
//    res.status(200).send('Las recetas se han creado exitosamente')
//   } catch (error) {
//     return res.status(400).send({error: error.message})
//   }
// })

  module.exports = router