import React from 'react'
import { NavLink } from 'react-router-dom'


export const Recipe = (props) => {

  return (
    <div>
      <NavLink to={`/detail/${props.id}`} >
      <h1>{props.title}</h1>
      <img width= '400px' alt={props.title} src={props.image}/>
      <h2>{props.dishTypes}</h2>
      <h3>Ready in {props.readyInMinutes} minutes</h3>
      <h3>Health Score {props.healthScore}</h3>
      </NavLink>
    </div>
  )
}
