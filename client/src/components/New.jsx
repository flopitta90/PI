import React ,{ useState } from 'react'
import validate from './validation.js' 
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { addNewRecipe , searchRecipes} from '../redux/actions.js'

const Title = styled.h1`
  font-family: 'Bowlby One SC';
  font-size: 40px;
  letter-spacing: 2px;

`
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Error = styled.p`
  color: red;
  text-align: center;
`
const NewRecipeForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  font-weight: bold;
  align-items: center;
  background-color: #f8f8f8;
  padding: 40px;
  @media screen and (max-width: 960px){
      width: 90%;
    }
`
const Fields = styled.form`
  text-align: justify;
  textarea{
    height: 50px;
  }

  input{
    max-height: 20px;
  }

  div{
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
   
    div{
      flex-direction: row;
      margin: 5px;
      @media screen and (max-width: 960px){
      flex-direction: column;
      margin: 0px;
      .img{
        align-items: center;
      }
    }
   
    }
  }

  fieldset{
    width: 45%;
    display: flex;
    flex-direction :column ;
    @media screen and (max-width: 960px){
      width: 90%;
    }
    .ingredients{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    button{
      background-color : black;
      color:#67eb8e ;
      border: none;
      font-family: 'Bowlby One SC', cursive;
      padding: 10px;
      margin: 5px;
      @media (hover: hover) {
        &:hover{
          background-color: #67eb8e;
          color: black;
        }
      }
    }
    .x{
      padding: 2px;
      font-family: 'Courier New', Courier, monospace;
      font-weight: bold;
    }
    .diets{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
`

const Submit = styled.button`
  margin: 10px;
  background-color : black;
 color:#67eb8e ;
 border: none;
 padding: 10px;
 font-family: 'Bowlby One SC', cursive;
 width: 20%;
 @media (hover: hover) {
   &:hover{
     background-color: #67eb8e;
     color: black;
     border: solid black;
    }
}
@media screen and (max-width: 960px){
      width: 90%;
    }
`


export const New = () => {
  const allRecipes = useSelector(state => state.allRecipes)
  const allDiets = useSelector(state => state.allDiets)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recipeData, setRecipeData] = useState({
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

  const [errors, setErrors] = useState({
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    diets:''
  })

  
  const handleChange = (event) => {
    setRecipeData({...recipeData,
        [event.target.name]: event.target.value,
    })
    setErrors(
        validate({...recipeData,
        [event.target.name]: event.target.value 
    }, allRecipes))
}   

  const addIngredient = (event) => {
    event.preventDefault()
    setRecipeData({...recipeData, 
     ingredients: [...recipeData.ingredients, recipeData.ingredient],
     ingredient:''
    })
  }

  const onClose = (e)=>{
    e.preventDefault()
    setRecipeData({...recipeData, 
     [e.target.name]: [...recipeData[e.target.name].filter(ingredient => ingredient !== e.target.value )],
    })
  }

 function whenSelected(e){
    const result = recipeData.diets.find(element => element === e.target.value)
    if(result){
     setRecipeData({...recipeData, 
      diets : recipeData.diets.filter(item => item !== e.target.value)
      })
      setErrors(
        validate({...recipeData,
        diets : recipeData.diets.filter(item => item !== e.target.value)
      }, allRecipes))
    }
    else{
       setRecipeData({...recipeData, 
        diets : [...recipeData.diets, e.target.value]
        })
        setErrors(
          validate({...recipeData,
          diets : [...recipeData.diets, e.target.value]  
        }, allRecipes))
    }
  }

 

  const handleSubmit= (e) => {

    e.preventDefault();

    if(Object.keys(errors).length === 0){
      const recipe = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData)
      };
   
      fetch('http://localhost:3001/recipes', recipe)
        .then(response => response.json())
        .then(result => {dispatch(addNewRecipe(result))
        if(result.id) {
          navigate(`/detail/${result.id}`)
        } else {
          window.alert('There was an error')
        }
      })
    }else{
      window.alert('Please complete all the required fields or modify as neccesary')
    }
  };


  return (
    <FormWrapper>
    <NewRecipeForm>
      <Title>add your own recipe!</Title>
      <Fields>

        <div>
          <label>Title</label>
          <input type='text' 
          name='title'
          placeholder='Title required'
          value={recipeData.title}
          onChange={handleChange}/>
        </div>
          <Error>{errors.title}</Error>

        <div>
          <label>Summary</label>
          <textarea type='text' 
          name='summary'
          placeholder='Summary required'
          value={recipeData.summary}
          onChange={handleChange}/>
        </div>
          <Error>{errors.summary}</Error>

        <div>
          <label>Instructions</label>
          <textarea type='text' 
          name='analyzedInstructions'
          value={recipeData.analyzedInstructions}
          onChange={handleChange}/>
        </div>

        <div>
          <label>Health Score</label>
          <input type='number' 
          name='healthScore'
          placeholder='0-100'
          value={recipeData.healthScore}
          onChange={handleChange}/>
        </div>
          <Error>{errors.healthScore}</Error>

        <div>
          <label>Dish type/s</label>
          <input type='text' 
          name='dishTypes'
          placeholder='ex: Main dish / Breakfast'
          value={recipeData.dishTypes}
          onChange={handleChange}/>
        </div>


        <div>
          <label>How many minutes to be ready?</label>
          <input type='number' 
          name='readyInMinutes'
          placeholder=''
          value={recipeData.readyInMinutes}
          onChange={handleChange}/>
        </div>

        <div>
          <div>
          <fieldset>
          <legend>Choose to what type of diets your recipe belongs to:</legend>
            {allDiets.map(diet => {
              return <div className='diets'>
                <input type='checkbox' name='diets' value={diet.name} onChange={whenSelected} checked={recipeData.diets.find(element => element === diet.name) || false}/>
                <label >{diet.name}</label>
                </div>
          })}  
          <Error>{errors.diets}</Error>
          </fieldset>

          <fieldset>
            <legend>Ingredients</legend>
          {recipeData.ingredients.map(ingredient => 
            <div className='ingredients' key={ingredient}>
            <span>{ingredient}</span> 
            <button className='x' value={ingredient} name='ingredients' onClick={onClose}>x</button>
            </div>)}
          
            <input type='text' 
            name='ingredient'
            value={recipeData.ingredient}
            onChange={handleChange}
            />
            <button onClick={addIngredient}>add ingredient</button>
          </fieldset>
          </div>
        </div>

        <div>    
          <label>Image</label>
          <input type="text" placeholder='Paste url of your image here' onChange={handleChange} name='image' value={recipeData.image}/>
          <Error>{errors.image}</Error>
          <div className='img'>
          {recipeData.image ? <img alt= {recipeData.title} width='200px'src={recipeData.image} /> : null}
          </div>
        </div>      

      </Fields>
        <Submit onClick={handleSubmit}>Submit</Submit>
    </NewRecipeForm>
    </FormWrapper>
  )
}


