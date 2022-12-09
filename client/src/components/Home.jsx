import React from 'react'
import { connect } from 'react-redux'
import { Pagination } from './Pagination'
import { Recipe } from './Recipe'


const Home = ({allRecipes}) => {

  const [currentPage, setCurrentPage] = React.useState(0)
  const[showingRecipes , setShowingRecipes] = React.useState([])
  
  
  React.useEffect(()=>{
     setShowingRecipes([...allRecipes.slice(currentPage*9, currentPage*9 + 9)])
  },[currentPage, allRecipes])

  const handlePages = (id) => {
    setCurrentPage(id-1)
  }


  return (
    <div>
      {showingRecipes?.map(recipe => {
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
      <Pagination amount={allRecipes.length} currentPage={currentPage} handlePages={handlePages}/>
    </div>
  )
}

function mapStateToProps(state){
  return {allRecipes: state.allRecipes}
}

export default connect(mapStateToProps)(Home)