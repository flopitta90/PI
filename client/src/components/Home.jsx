import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FilterSort from './FilterSort'
import { Pagination } from './Pagination'
import { Recipe } from './Recipe'

const Wrapper = styled.div`
  display: flex;
  max-width: 1300px;
  margin:auto;
`
const Showing= styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 80%;
  right: 0;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`
const FilterWrapper = styled.div`
width: 20%;

  @media screen and (max-width: 960px){
    display: none;
  }
`
const Title = styled.h1`
  font-family: 'Bowlby One SC', cursive;
  font-size: 60px;
  letter-spacing: 2px;
`
const Recipes= styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  h3{
    font-family: 'Bowlby One SC', cursive;
    font-size: 30px;
    letter-spacing: 1px;
    background-color:black;
    color: white;
    padding: 5px;
  }
`

const Home = ({showingRecipes}) => {

  React.useEffect(()=> {
    window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  })
},[])

  const [currentPage, setCurrentPage] = React.useState(0)
  const[showingRecipesPages , setShowingRecipes] = React.useState([])
  
  React.useEffect(()=>{
     setShowingRecipes([...showingRecipes.slice(currentPage*9, currentPage*9 + 9)])
  },[currentPage])

  React.useEffect(()=>{
    setCurrentPage(0)
    setShowingRecipes([...showingRecipes.slice(currentPage*9, currentPage*9 + 9)])
 },[showingRecipes])

  const handlePages = (num) => {
   if(parseInt(num))
    setCurrentPage(num-1)
    else{
      if(num === 'prev'){
        setCurrentPage(currentPage-1)
      }
      else if(num === 'next'){
        setCurrentPage(currentPage+1)
      }
    }
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }


  return (
    <Wrapper>
      <FilterWrapper>
       <FilterSort/>
      </FilterWrapper>
      <Showing>
        {/* <Title>recipes</Title> */}
        <Recipes>
      {showingRecipesPages.length < 1 ? <h3>there are no recipes that matches your search</h3> : 
      showingRecipesPages?.map(recipe => {
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
      </Recipes>
      <Pagination amount={showingRecipes.length} currentPage={currentPage} handlePages={handlePages}/>
      </Showing>
    </Wrapper>
  )
}

function mapStateToProps(state){
  return {
    showingRecipes: state.showingRecipes,
    allRecipes: state.allRecipes
  }
}

export default connect(mapStateToProps)(Home)