import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from './Pagination'
import { Recipe } from './Recipe'
import apron from '../images/apron.gif'
import styled from 'styled-components'

const Recipes= styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const Title = styled.h1`
  font-family: 'Bowlby One SC', cursive;
  font-size: 60px;
  letter-spacing: 2px;
  &.apron{
    font-size: 30px;
    color:#67eb8e;
  }
`
const Background= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`
export const Favorites = () => {

  React.useEffect(()=> {
    window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  })
},[])

  const myFavorites = useSelector(state => state.myFavorites)
  const [showingFavorites, setShowingFavorites] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  React.useEffect(()=>{
    setShowingFavorites([...myFavorites.slice(currentPage*9, currentPage*9 + 9)])
 },[currentPage])

 React.useEffect(()=>{
   setCurrentPage(0)
   setShowingFavorites([...myFavorites.slice(currentPage*9, currentPage*9 + 9)])
},[myFavorites])

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

  return showingFavorites.length ? <div>
      <Title></Title>
       <Recipes>
      {showingFavorites?.map(recipe => {
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
     <Pagination amount={myFavorites.length} currentPage={currentPage} handlePages={handlePages}/> 
    </div> : <Background>
      <Title className='apron'>grab your apron and give love to a recipe</Title>
      <img width= '350 px'src={apron}/>
    </Background>
  
}
