import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {addRecipes} from '../redux/actions'

const Welcome = () => { 

  const dispatch = useDispatch()

 
  useEffect(()=>{
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data)=> dispatch(addRecipes(data)))
    }, [])
  
  const navigate = useNavigate()

  function goToHome(){
    navigate('/home')
  }

  return (
    <div>
      <h1>henry foods</h1>
      <button onClick={goToHome}>ingresar</button>
    </div>
  )
}

 
 export default connect()(Welcome)