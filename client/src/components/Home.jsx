import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { searchRecipes } from '../redux/actions'
import { Pagination } from './Pagination'
import { Recipe } from './Recipe'
import { Search } from './Search'


const Home = ({showingRecipes, allRecipes}) => {

  const [currentPage, setCurrentPage] = React.useState(0)
  const[showingRecipesPages , setShowingRecipes] = React.useState([])
  
  const dispatch = useDispatch()

  React.useEffect(()=>{
     setShowingRecipes([...showingRecipes.slice(currentPage*9, currentPage*9 + 9)])
  },[currentPage, showingRecipes])

 const searchByName =  (name) => {
  if(name){
    if(allRecipes.find(recipe => recipe.title.toLowerCase().includes(name))){
      fetch(`http://localhost:3001/recipes?title=${name}`)
        .then((response) => response.json())
        .then((data)=> {dispatch(searchRecipes(data))})
    } else {
        window.alert('There are no recipes with that name, check the spelling or try with another name')
    }
  }else{
    fetch(`http://localhost:3001/recipes`)
    .then((response) => response.json())
    .then((data)=> dispatch(searchRecipes(data)))
  }
}

  const handlePages = (id) => {
    setCurrentPage(id-1)
  }


  return (
    <div>
      <Search searchByName={searchByName}/>
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