import React from 'react'
import { connect } from 'react-redux'
import FilterSort from './FilterSort'
import { Pagination } from './Pagination'
import { Recipe } from './Recipe'



const Home = ({showingRecipes}) => {

  const [currentPage, setCurrentPage] = React.useState(0)
  const[showingRecipesPages , setShowingRecipes] = React.useState([])
  
  React.useEffect(()=>{
     setShowingRecipes([...showingRecipes.slice(currentPage*9, currentPage*9 + 9)])
  },[currentPage, showingRecipes])



  const handlePages = (id) => {
    setCurrentPage(id-1)
  }


  return (
    <div>
      <FilterSort/>
      {showingRecipesPages?.map(recipe => {
        return <Recipe
        key={recipe.id}
        id={recipe.id}
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
      <Pagination amount={showingRecipes.length} currentPage={currentPage} handlePages={handlePages}/>
    </div>
  )
}

function mapStateToProps(state){
  return {
    showingRecipes: state.showingRecipes,
    allRecipes: state.allRecipes
  }
}

export default connect(mapStateToProps)(Home)