import React, {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { updateRecipe } from '../redux/actions';
import { Form } from './Form'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.allRecipes)
  
  const recipeToUpdate = allRecipes.find(recipe => recipe.id === parseInt(id))
  const [recipeData, setRecipeData] = useState({
    id: recipeToUpdate.id,
    title: recipeToUpdate.title,
    image: recipeToUpdate.image,
    summary: recipeToUpdate.summary,
    healthScore: recipeToUpdate.healthScore,
    dishTypes: recipeToUpdate.dishTypes,
    analyzedInstructions: recipeToUpdate.analyzedInstructions,
    readyInMinutes: recipeToUpdate.readyInMinutes,
    ingredient: undefined,
    ingredients:recipeToUpdate.ingredients,
    diets: recipeToUpdate.diets.map(diet => diet.name)
  })

  const handleSubmit= () => {

    const recipe = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
    };
 
    fetch(`https://pi-production-b6af.up.railway.app/recipes/${id}`, recipe)
      .then(response => response.json())
      .then((data) => {dispatch(updateRecipe(data))
        if(data.id){ 
          navigate(`/detail/${id}`)
          window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          })
        }
        else{
          window.alert('There was an error updating your recipe')
        }
      })
};

  return (
    <Div>
    <h1>Edit the recipe</h1>
    <Form handleSubmit={handleSubmit} recipeData={recipeData} setRecipeData={setRecipeData}/>
    </Div>
  )
}
