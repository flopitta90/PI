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
  //we divide the quantity of showingrecipes by 9(as it is the amount showed on each page)
  let QttButtons = Math.ceil(props.amount / 9) // we use math.ceil to get the int number, taking into acount the floaters recipes
  let count = 0 // count will increase everytime we push a button on our array of buttons that will be rendered
  let buttons = props.currentPage //we will start the count on the currentPage
  let arrButtons = []//we will render all the buttons of this array
  if(props.currentPage > 0) arrButtons.push('prev') // if our current page its 1 we want to see the previous button (the first page its 0)
  while(count < 5 && buttons < QttButtons){ 
    count +=1
    buttons+=1
    arrButtons.push(buttons)
  }
  if(props.currentPage +5 < QttButtons) arrButtons.push('next') //if the amount of pages its less than the current page plus the 5 buttons we will add the next button
  
  const handleClick = (e) =>{
    props.handlePages(e.target.id)
  }

  const buttonsToShow = () => {
      return arrButtons.map(btt => {
        //if the currentPAge + 1 equals the number on the button, it has a different button
        if(parseInt(btt) === parseInt(props.currentPage)+1 ){ return <BttPageS onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</BttPageS>}
          return <BttPage onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</BttPage>})
  }

  return (
    <Wrapper>{buttonsToShow()}</Wrapper>
  )
}
