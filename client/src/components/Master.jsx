import React from 'react'
import { connect, useDispatch } from 'react-redux'
import {addRecipes, addDiets} from '../redux/actions'

const Master = (props) => {
  const dispatch = useDispatch()
  React.useEffect(()=>{
    fetch(`https://pi-production-b6af.up.railway.app/recipes`)
      .then((response) => response.json())
      .then((data)=> dispatch(addRecipes(data)))
    }, [dispatch])

    React.useEffect(()=>{
      fetch(`https://pi-production-b6af.up.railway.app/diets`)
        .then((response) => response.json())
        .then((data)=> dispatch(addDiets(data)))
      }, [dispatch])
  

  return (
    <div>{props.children}</div>
  )
}


export default connect()(Master)