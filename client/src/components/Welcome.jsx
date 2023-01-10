import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import mustache from '../images/italian.gif'

const Wrapper = styled.div`
 display: flex ;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: auto;
  background-color: black;
  height: 100vh;
`


const Mustache= styled.button`
  border-style: none;
  background-color: transparent;
  position: relative;
  text-align: center;
  @media (hover: hover) {
    &:hover{
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px){
    width: 100%;
    margin-top: 10%;
  }
`

const MustacheImg = styled.img`
   width: 400px ;
   @media screen and (max-width: 600px){
    width: 350px;
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
  @media screen and (max-width: 600px){
    position: absolute;
    top: 8%;
    left: 38%
  }
`


const Welcome = () => { 

  const navigate = useNavigate()

  function goToHome(){
    navigate('/home')
  }

  return (
    <Wrapper>
      <Mustache onClick={goToHome}>
        <MustacheImg src={mustache}/>
      </Mustache>
    </Wrapper>
  )
}

 
 export default Welcome