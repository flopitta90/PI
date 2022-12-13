import React ,{ useState } from 'react'
import validate from './validation.js' 
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Error = styled.p`
  color: red;
`

export const New = () => {

  const allDiets = useSelector(state => state.allDiets)

  const [recipeData, setRecipeData] = useState({
    title: '',
    image: '',
    summary: '',
    healthScore: undefined,
    dishTypes:'',
    analyzedInstructions:'',
    readyInMinutes: undefined,
    ingredient:'',
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
    }))
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
      }))
    }
    else{
       setRecipeData({...recipeData, 
        diets : [...recipeData.diets, e.target.value]
        })
        setErrors(
          validate({...recipeData,
          diets : [...recipeData.diets, e.target.value]  
        }))
    }
  }

  const handleSubmit= (e) => {

    e.preventDefault();


    const recipe = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
    };
    fetch('http://localhost:3001/recipes', recipe)
        .then(response => response.json())
        .then(result => console.log(result));

};


  return (
    <div>
      <h1>Create your own recipe!</h1>
      <form>
        <label>Title</label>
        <input type='text' 
        name='title'
        placeholder='Title required'
        value={recipeData.title}
        onChange={handleChange}/>
        <Error>{errors.title}</Error>

        <label>Summary</label>
        <textarea type='text' 
        name='summary'
        placeholder='Summary required'
        value={recipeData.summary}
        onChange={handleChange}/>
        <Error>{errors.summary}</Error>

        <label>Health Score</label>
        <input type='number' 
        name='healthScore'
        placeholder='0-100'
        value={recipeData.healthScore}
        onChange={handleChange}/>
        <Error>{errors.healthScore}</Error>

        <label>Dish type/s</label>
        <input type='text' 
        name='dishTypes'
        placeholder='ex: Main dish / Breakfast'
        value={recipeData.dishTypes}
        onChange={handleChange}/>

        <label>Instructions</label>
        <textarea type='text' 
        name='analyzedInstructions'
        value={recipeData.analyzedInstructions}
        onChange={handleChange}/>

        <label>How many minutes to be ready?</label>
        <input type='text' 
        name='readyInMinutes'
        placeholder=''
        value={recipeData.readyInMinutes}
        onChange={handleChange}/>
        
        <fieldset>
        {recipeData.ingredients.map(ingredient => 
          <div key={ingredient}>
          <span>{ingredient}</span> 
          <button value={ingredient} name='ingredients' onClick={onClose}>x</button>
          </div>)}
        
          <legend>Ingredients</legend>
          <input type='text' 
          name='ingredient'
          value={recipeData.ingredient}
          onChange={handleChange}
          />
          <button onClick={addIngredient}>add ingredient</button>
        </fieldset>

        <fieldset>
        <legend>Choose to what type of diets your recipe belongs to:</legend>
          {allDiets.map(diet => {
            return <div key={diet.name}>
              <input type='checkbox' name='diets' value={diet.name} onChange={whenSelected} checked={recipeData.diets.find(element => element === diet.name) || false}/>
              <label >{diet.name}</label>
            </div>
        })}  
        </fieldset>
        <Error>{errors.diets}</Error>
        
        <label>Image</label>
        <input type="text" placeholder='Put url of your image here' onChange={handleChange} name='image' value={recipeData.image}/>
        <Error>{errors.image}</Error>
        {recipeData.image ? <img width='200px'src={recipeData.image} /> : null}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}


