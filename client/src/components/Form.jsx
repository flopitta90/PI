import React ,{ useState } from 'react'
import validate from './validation.js' 
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'


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
      padding: 10px;
    }
`
const Fields = styled.form`
  text-align: justify;
  textarea{
    height: 50px;
    font-size: 16px;
  }

  input{
    max-height: 20px;
    font-size: 16px
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
const Link = styled(NavLink)`
text-decoration: none;
text-align: center;
background-color : black;
color:#67eb8e ;
border: none;
font-family: 'Bowlby One SC', cursive;
font-size: smaller;
font-weight: lighter;
padding: 10px;
margin: 5px;
@media (hover: hover) {
  &:hover{
    background-color: #67eb8e;
    color: black;
  }
}
    

`
export const Form = ({handleSubmit, recipeData, setRecipeData}) => {
  const allRecipes = useSelector(state => state.allRecipes)
  const allDiets = useSelector(state => state.allDiets)
  

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


  const handleSubmitNew= (e) => {

    e.preventDefault();

    if(Object.keys(errors).length === 0){
      handleSubmit()
    }else{
      window.alert('Please complete all the required fields or modify as neccesary')
    }
  };

  return (
    <NewRecipeForm>
      <Fields>

        <div>
          <label>Title</label>
          <input type='text' 
          name='title'
          placeholder='Title required'
          value={recipeData.title}
          onChange={handleChange}
          autoFocus/>
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
                <input type='checkbox' name='diets' value={diet.name} onChange={whenSelected} checked={Boolean(recipeData.diets.find(element => element === diet.name)) || false}/>
                <label >{diet.name}</label>
                </div>
          })}  
          <Link to='/diets' target='_blank'>info diets</Link>
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
        <Submit disabled= {Object.keys(errors).length > 0 || Object.keys(recipeData).length === 0} onClick={handleSubmitNew}>Submit</Submit>
    </NewRecipeForm>
  )
}
