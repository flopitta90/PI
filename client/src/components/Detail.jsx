import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const Detail = ({allRecipes}) => {

  const {id} = useParams()
  
  const recipe = allRecipes.find(recipe => recipe.id === parseInt(id))
  
  return (
    allRecipes.length < 1 ? <h1>loading</h1> :
    <div>
      <h1>{recipe.title}</h1>
      <img width='500px' src={recipe.image} alt={recipe.title} />
      <p dangerouslySetInnerHTML={ { __html: recipe.summary }}/>
      <h3>STEPS</h3>
      <p>{recipe.analyzedInstructions}</p>
    </div>
  )
}
function mapStateToProps(state){
  return {allRecipes: state.allRecipes}
}
export default connect(mapStateToProps)(Detail)