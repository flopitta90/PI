const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const recipes = require('../../bd_from_api.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get('/recipes', async (req,res)=> {
  const { title } = req.query

  try {
    if(title) {
      const result = await Recipe.findAll({where: {
        title: {[Op.iLike]:`%${title}%`}
      }})
      if(result.length < 1) {
        return res.status(200).send('No se han encontrado recetas con ese nombre')
      } else {
          return res.status(200).send(result)
      } 
    }

    const allRecipes = await Recipe.findAll()
    return res.status(200).send(allRecipes)

  } catch (error) {
    return res.status(400).send({error: error.message})
  }
})

router.post('/recipes/bulk', async (req, res)=>{
try {
  const data = req.body
  const recipes = data.results.map(item => {
        const recipe = {
          title: item.title,
          image: item.image,
          summary: item.summary,
          healthScore: item.healthScore,
          dishTypes: item.dishTypes.join(', '),
          analyzedInstructions: (item.analyzedInstructions[0].steps.map(element => 'Step ' + element.number + ': ' + element.step)).join(' '),
          readyInMinutes: item.readyInMinutes,
          diets: item.diets
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
    console.log(result)
    await newRecipe.addDiets(result)
  });
 res.status(200).send('Las recetas se han creado exitosamente')
} catch (error) {
  return res.status(400).send({error: error.message})
}

})

router.get('/recipes/:id', async (req,res)=>{
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

router.post('/recipes',async(req,res)=>{
  const {title, image, summary, diets, healthScore, analizedInstructions,readyInMinutes} = req.body
  if(!title|| !summary ||!diets){
    return res.status(400).send('No se han completado los campos necesarios')
  }else{
    try {
      const newRecipe = await Recipe.create({title, image, summary, healthScore, analizedInstructions,readyInMinutes})
      const dietsData = diets.map(el => {return {name: el}})
      const newDiets = await Diet.bulkCreate(dietsData)
      newRecipe.addDiets(newDiets)
      res.status(200).send(newRecipe)
    } catch (error) {
      return res.status(400).send({error: error.message})
    }
  }
})



router.get('/diets', async(req,res) => {
  try {
    const diets = await Diet.findAll()
    res.status(200).send(diets)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})
 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
