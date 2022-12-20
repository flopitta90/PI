 const response = require('./example.json')
 
 
 const recipes = response.results.map(item => {
  const db = {
    title: item.title,
    image: item.image,
    summary: item.summary,
    diets: item.diets,
    healthScore: item.healthScore,
    dishTypes: item.dishTypes.join(', '),
    analyzedInstructions: (item.analyzedInstructions[0].steps.map(element => 'Step ' + element.number + ': ' + element.step)).join(' '),
    readyInMinutes: item.readyInMinutes
  }
  return db
})


 module.exports = recipes