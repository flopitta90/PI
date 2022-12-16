import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import mustache from '../images/mustacheWhite.svg'

const NavDiv= styled.nav`
  display: flex;
  height: 100px;
  background-color:black;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;

`
const NavButtons=styled(NavLink)`
  text-decoration: none;
  color:#67eb8e;
  font-family: 'Bowlby One SC';
  font-size: 20px;
  letter-spacing: 1px;
  max-height: 100px;
`

const Mustache = styled.img`
  color:#67eb8e;
`

const Nav = () => {
  return (
    <NavDiv>
      <NavButtons to='/'>
        <p>italian kitchen</p>
        <Mustache height='50px' src={mustache}/></NavButtons>
      <NavButtons to='/home'>home</NavButtons>
      <NavButtons to='/favorites'>my favorites</NavButtons>
      <NavButtons to='/recipe'>add a recipe</NavButtons>
    </NavDiv>
  )
}


export default Nav