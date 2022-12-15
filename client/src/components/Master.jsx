import React from 'react'
import { connect, useDispatch } from 'react-redux'
import {addRecipes, addDiets} from '../redux/actions'

const Master = (props) => {
  const dispatch = useDispatch()
  React.useEffect(()=>{
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data)=> dispatch(addRecipes(data)))
    }, [dispatch])

    React.useEffect(()=>{
      fetch(`http://localhost:3001/diets`)
        .then((response) => response.json())
        .then((data)=> dispatch(addDiets(data)))
      }, [dispatch])
  

  return (
    <div>{props.children}</div>
  )
}


export default connect()(Master)