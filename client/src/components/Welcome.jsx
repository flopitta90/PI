import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect} from 'react-redux'
import styled from 'styled-components'


const Wrapper = styled.div`
 display: flex ;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`

const Welcome = () => { 

  const navigate = useNavigate()

  function goToHome(){
    navigate('/home')
  }

  return (
    <Wrapper>
      <h1>ITALIAN KITCHEN</h1>
      <button onClick={goToHome}>Enter</button>
    </Wrapper>
  )
}

 
 export default connect()(Welcome)