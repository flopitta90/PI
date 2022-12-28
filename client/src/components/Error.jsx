import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  font-family: 'Bowlby One SC';
  display: flex;
  align-items: center;
  justify-content: space-around;
  letter-spacing: 1px;
    
  div{
    background-color:white;
  }
  @media screen and (max-width: 960px){
    flex-direction: column;
    img{
      width: 99%;
    }
  }
`
const Title= styled.h1`
  font-size: 60px; 
  color:#67eb8e; 
  
`
const SubTitle = styled.h1`
  font-size: 40px;
  
`

export const Error = () => {

  return (
    <Div>
      <div>
     <Title>404</Title>
     <h2>There's nothing to see here...</h2>
     <SubTitle>go back to YOUR KITCHEN!</SubTitle>
      </div>
     <img alt='gif' src='https://media.tenor.com/G7dQBkopG94AAAAC/chef-angry.gif'/>
    </Div>
  )
}
