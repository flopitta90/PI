import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Welcome = () => {

const navigate = useNavigate()

function goToHome(){
  navigate('/home')
}

  return (
    <div>
      <h1>henry foods</h1>
      <button onClick={goToHome}>ingresar</button>
    </div>
  )
}
