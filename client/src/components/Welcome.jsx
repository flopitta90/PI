import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import mustache from '../images/mustache.svg'

const Wrapper = styled.div`
 display: flex ;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`
const Title = styled.h1`
  font-family: 'Bowlby One SC', cursive;
  font-size: 50px;
  letter-spacing: 1px;
`

const Mustache= styled.button`
  border-style: none;
  background-color: transparent;
  position: relative;
  text-align: center;
  
  :hover{
    cursor: pointer;
    transform: scale(1.1);
  }
`

const Enter= styled.h3`
  position: absolute;
  top: 20%;
  left: 42%;
  color: #67eb8e;
  font-family: 'Bowlby One SC';
  font-size: 25px;
  letter-spacing: 1px;
  
`


const Welcome = () => { 

  const navigate = useNavigate()

  function goToHome(){
    navigate('/home')
  }

  return (
    <Wrapper>
      <Title>ITALIAN KITCHEN</Title>
      <Mustache onClick={goToHome}>
        <img width='600px' src={mustache}/>
        <Enter>enter</Enter>
      </Mustache>
    </Wrapper>
  )
}

 
 export default Welcome