const { Router } = require('express');
const RecipesRouter = require('./RecipesRouter')
const DietsRouter = require('./DietsRouter')



// const recipes = require('../../bd_from_api.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/recipes', RecipesRouter)
router.use('/diets', DietsRouter)
 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
