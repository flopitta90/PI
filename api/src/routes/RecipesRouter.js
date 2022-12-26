const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const router = Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req,res)=> {
  try {
    const { title } = req.query
    if(title) {
      const result = await Recipe.findAll({where: {
        title: {[Op.iLike]:`%${title}%`},
      },include:Diet})
      if(result.length < 1) {
        throw new Error('There are no recipes with that name, check the spelling or try with another name')
      } else {
          return res.status(200).send(result)
      } 
    }
    const allRecipes = await Recipe.findAll({include: Diet})
    return res.status(200).send(allRecipes)

  } catch (error) {
    return res.status(400).send({error: error.message})
  }
})


router.post('/bulk', async (req, res)=>{
  try {
    const data = req.body
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
          return recipe
    })
    recipes.forEach(async element => { 
      const newRecipe = await Recipe.create(element)
      const newDiets = await element.diets.map(async diet => {
          const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
          return newDiet
        }
      )
      const result = await Promise.all(newDiets)
      await newRecipe.addDiets(result)
    });
   res.status(200).send('Las recetas se han creado exitosamente')
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
  
})


router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const result = await Recipe.findByPk(id)
    if(result){
      try {
        return res.status(200).send(result)
      } catch (error) {
        return res.status(400).send({error: error.message})
      }
    }
    res.status(400).send(`No se ha encontrado la receta con id ${id}`)
})

  
router.post('/',async(req,res)=>{
  let {title, image, summary, diets, healthScore, analyzedInstructions,readyInMinutes,ingredients,dishTypes} = req.body
  if(!title|| !summary ||!diets){
    return res.status(400).send('No se han completado los campos necesarios')
  }else{
    try {
      if(ingredients.length === 0){ingredients = undefined}
      const newRecipe = await Recipe.create({title, image, summary, healthScore, analyzedInstructions,readyInMinutes,ingredients, dishTypes})
      const newDiets = await diets.map(async diet => {
        const [newDiet, created] = await Diet.findOrCreate({where: {name: diet}})
        return newDiet
      })
      const result = await Promise.all(newDiets)
      await newRecipe.addDiets(result)
      const newRecipeDiet = await Recipe.findOne({where: {id : newRecipe.id}, include: Diet})
      res.status(200).send(newRecipeDiet)
    } catch (error) {
      return res.status(400).send({error: error.message})
    }
  }
})


  module.exports = router