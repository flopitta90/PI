import React ,{useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import mustache from '../images/mustacheWhite.svg'
import menuIcon from '../images/menu.svg'
import crossIcon from '../images/cross.svg'
import searchIcon from '../images/search.svg'

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
  @media (hover: hover) {
    &:hover{
      color: #67eb8e;
    }
  }

  &.selected{
    text-decoration: underline;
    color: #67eb8e;
  }
  &.mobile{
    display: none;
    @media screen and (max-width: 960px){
      display: flex;
    }
  }
`

const Mustache = styled.img`
`
const Menu= styled.div`
  display: flex;
  justify-content: space-evenly;  

  @media screen and (max-width: 960px) {
        display: flex;
        position: absolute;
        background-color: black;
        top:100px;
        left:${({open}) => open ? '0' : '-100%'};
        width:100%;
        height: 90vh;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
        z-index: 999;
        }
`

const MenuIcon = styled.img`
display: none;
@media screen and (max-width: 960px) {
  display: flex;
  width: 32px;
  color: white; 
}
`

const Nav = () => {

const location = useLocation()
const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <NavDiv>
      <NavButtons to='/'>
        <span>italian</span>
        <Mustache height='30px' src={mustache}/>
        <span>kitchen</span>
      </NavButtons>
        <MenuIcon onClick={() => setMobileMenu(!mobileMenu)} src={mobileMenu ? crossIcon : menuIcon}/>
        <Menu open={mobileMenu}> 
      {location.pathname === '/home' ? <NavButtons onClick={() => setMobileMenu(!mobileMenu)} className='selected' to='/home'>recipes</NavButtons> : <NavButtons onClick={() => setMobileMenu(!mobileMenu)}  to='/home'>recipes</NavButtons>}
      {location.pathname === '/favorites' ? <NavButtons to='/favorites' onClick={() => setMobileMenu(!mobileMenu)} className='selected'>my favorites</NavButtons> : <NavButtons onClick={() => setMobileMenu(!mobileMenu)}  to='/favorites'>my favorites</NavButtons>}
      {location.pathname=== '/recipe' ? <NavButtons onClick={() => setMobileMenu(!mobileMenu)}  className='selected' to='/recipe'>add a recipe</NavButtons> : <NavButtons onClick={() => setMobileMenu(!mobileMenu)}  to='/recipe'>add a recipe</NavButtons>}
      {mobileMenu ? <NavButtons onClick={() => setMobileMenu(!mobileMenu)} to='/search' className='mobile'><img  width='60px'src={searchIcon}/></NavButtons> : null}
        </Menu>
    </NavDiv>
  )
}


export default Nav