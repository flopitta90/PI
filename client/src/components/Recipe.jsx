import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const RecipeDiv = styled.div`
  background-color: black;
  width: 30%;
  margin-bottom: 30px;
  position: relative;
`
const Specifics = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-family: 'Bowlby One SC';
  letter-spacing: 2px;
  font-size: 15px;
`
const DietsWrapper= styled.div`
position: absolute;
top:0;
height: 100%;
width: 100%;
color: transparent;
 &:hover{
  position: absolute;
  bottom: 0;
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 10px;
  height: 100%;
  color: #67eb8e;
  transition: 0.5s all ease;

}
`
const Diets = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  padding: 10px;
 
`

export const Recipe = (props) => {

  return (
    <RecipeDiv>
      <Specifics to={`/detail/${props.id}`} >
      <img width= '100%' alt={props.title} src={props.image}/>
      <h2>{props.title}</h2>
      <DietsWrapper>
      <h2>{props.title}</h2>
      {props.diets.map(diet => <Diets key={diet.name}>{diet.name}</Diets>)}
      </DietsWrapper>
      </Specifics>
    </RecipeDiv>
  )
}
