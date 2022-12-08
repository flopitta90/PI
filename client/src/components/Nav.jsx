import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/favorites'>My Favorites</NavLink>
      <NavLink to='/recipe'>Add a Recipe</NavLink>
    </div>
  )
}


export default Nav