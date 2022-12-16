import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const RecipeDiv = styled.div`
  background-color: black;
  width: 30%;
  margin-bottom: 30px;
`
const Specifics = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-family: 'Bowlby One SC';
  letter-spacing: 2px;
  font-size: 15px;
`
const DietsWrapper= styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 10px;
`
const Diets = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  padding: 10px;
  color: #67eb8e;
`

export const Recipe = (props) => {

  return (
    <RecipeDiv>
      <Specifics to={`/detail/${props.id}`} >
      <img width= '100%' alt={props.title} src={props.image}/>
      <h2>{props.title}</h2>
      <DietsWrapper>
      {props.diets.map(diet => <Diets key={diet.name}>{diet.name}</Diets>)}
      </DietsWrapper>
      </Specifics>
    </RecipeDiv>
  )
}
