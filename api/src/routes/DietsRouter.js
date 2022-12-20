const { Router } = require('express');
const {Diet} = require('../db')
const router = Router();


router.get('/', async(req,res) => {
  try {
    const diets = await Diet.findAll()
    res.status(200).send(diets)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

module.exports = router