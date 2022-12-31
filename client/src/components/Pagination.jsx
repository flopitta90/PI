import React from 'react'
import styled from 'styled-components'

const BttPage = styled.button`
  background-color: black;
  color:#67eb8e;
  border: none;
  padding: 10px 0px;
  width: 40px;
  font-family: 'Bowlby One SC', cursive;
`
const BttPageS = styled.button`
  background-color:black;
  color: white;
  text-shadow:
    0 0 1px #fff,
    0 0 10px #fff,
    0 0 25px #fff,
    0 0 45px #0fa,
    0 0 92px #0fa,
    0 0 151px #0fa;
  border: none;
  padding: 10px 0px;
  width: 40px;
  font-family: 'Bowlby One SC', cursive;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  justify-content: center;
`


export const Pagination = (props) => {
  let QttButtons = Math.ceil(props.amount / 9)
  let count = 0
  let buttons = props.currentPage
  let arrButtons = []
  if(props.currentPage > 0) arrButtons.push('prev')
  while(count < 5 && buttons < QttButtons){
    count +=1
    buttons+=1
    arrButtons.push(buttons)
  }
  if(props.currentPage +5 < QttButtons) arrButtons.push('next')
  
  const handleClick = (e) =>{
    props.handlePages(e.target.id)
  }

  const buttonsToShow = () => {
      return arrButtons.map(btt => {
        if(parseInt(btt) === parseInt(props.currentPage)+1 ){ return <BttPageS onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</BttPageS>}
          return <BttPage onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</BttPage>})
  }

  return (
    <Wrapper>{buttonsToShow()}</Wrapper>
  )
}
