import React ,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { addNewRecipe } from '../redux/actions.js'
import { Form } from './Form.jsx'

const Title = styled.h1`
  font-family: 'Bowlby One SC';
  font-size: 40px;
  letter-spacing: 2px;

`
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const New = () => {
  React.useEffect(()=> {
    window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  })
},[])
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recipeData, setRecipeData] = useState({
    id: undefined,
    title: '',
    image: undefined,
    summary: '',
    healthScore: undefined,
    dishTypes: undefined,
    analyzedInstructions:undefined,
    readyInMinutes: undefined,
    ingredient: undefined,
    ingredients:[],
    diets:[]
  }) 

  const handleSubmit= () => {

      const recipe = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData)
      };
   
      fetch('https://pi-production-b6af.up.railway.app/recipes', recipe)
        .then(response => response.json())
        .then(result => {dispatch(addNewRecipe(result))
        if(result.id) {
          navigate(`/detail/${result.id}`)
        } else {
          window.alert('There was an error')
        }
      })
  };


  return (
    <FormWrapper>
    <Title>add your own recipe!</Title>
    <Form handleSubmit={handleSubmit} recipeData={recipeData} setRecipeData={setRecipeData}/>
    </FormWrapper>
  )
}


