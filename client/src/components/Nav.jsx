import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  color: white;
  font-family: 'Bowlby One SC';
  font-size: 20px;
  letter-spacing: 1px;
  max-height: 100px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  &:hover{
    color: #67eb8e;
  }

  &.selected{
    text-decoration: underline;
    color: #67eb8e;
  }
 
`

const Mustache = styled.img`
`
const Menu= styled.div`
  display: flex;
  justify-content: space-between;
`

const Nav = () => {

const location = useLocation()

  return (
    <NavDiv>
      <NavButtons to='/'>
        <span>italian</span>
        <Mustache height='30px' src={mustache}/>
        <span>kitchen</span>
      </NavButtons>
        <Menu> 
     {location.pathname === '/home' ? <NavButtons className='selected' to='/home'>recipes</NavButtons> : <NavButtons to='/home'>recipes</NavButtons>}
      {location.pathname === '/favorites' ? <NavButtons to='/favorites' className='selected'>my favorites</NavButtons> : <NavButtons to='/favorites'>my favorites</NavButtons>}
      {location.pathname=== '/recipe' ? <NavButtons className='selected' to='/recipe'>add a recipe</NavButtons> : <NavButtons to='/recipe'>add a recipe</NavButtons>}
        </Menu>
    </NavDiv>
  )
}


export default Nav