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
  margin-right: 40px;
`

const Mustache = styled.img`
  color:#67eb8e;
`
const Menu= styled.div`
  display: flex;
  justify-content: space-between;
`

const Nav = () => {
  return (
    <NavDiv>
      <NavButtons to='/'>
        <Mustache height='50px' src={mustache}/></NavButtons>
        <Menu> 
      <NavButtons to='/home'>home</NavButtons>
      <NavButtons to='/favorites'>my favorites</NavButtons>
      <NavButtons to='/recipe'>add a recipe</NavButtons>
        </Menu>
    </NavDiv>
  )
}


export default Nav