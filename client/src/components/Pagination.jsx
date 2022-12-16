import React from 'react'
import styled from 'styled-components'

const BttPage = styled.button`
  background-color: black;
  color:#67eb8e;
  border: none;
  margin: 5px;
  padding: 10px 0px;
  width: 40px;
  font-family: 'Bowlby One SC', cursive;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
      return arrButtons.map(btt => <BttPage onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</BttPage>)
  }

  return (
    <Wrapper>{buttonsToShow()}</Wrapper>
  )
}
