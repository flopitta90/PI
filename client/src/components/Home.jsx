import React from 'react'
import { connect } from 'react-redux'
import { Recipe } from './Recipe'

const Home = ({allRecipes}) => {
  return (
    <div>
      {allRecipes[0].map(recipe => {
        return <Recipe
        key={recipe.id}
        title={recipe.title}
        image={recipe.image}
        summary={recipe.summary}
        healthScore={recipe.healthScore}
        dishTypes={recipe.dishTypes}
        analizedInstructions={recipe.analizedInstructions}
        readyInMinutes={recipe.readyInMinutes}
        diets={recipe.diets}
        />
      })}
    </div>
  )
}

function mapStateToProps(state){
  return {allRecipes: state.allRecipes}
}

export default connect(mapStateToProps)(Home)