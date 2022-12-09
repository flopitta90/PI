import React from 'react'

export const Pagination = (props) => {

  const qtyButtons = Math.ceil(props.amount / 9)
  let buttons= 0
  let arrButtons =[]
  while(buttons < qtyButtons){
    buttons+=1
    arrButtons.push(buttons)
  }
  const handleClick = (e) =>{
    props.handlePages(e.target.id)
  }
  return (
   qtyButtons? arrButtons.map(btt => <button onClick={handleClick} key={btt + 'b'} id={btt}>{btt}</button>): null
  )
}
