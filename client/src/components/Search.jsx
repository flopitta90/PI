import React from 'react'


export const Search = ({searchByName}) => {

  const [name , setName] = React.useState('')

const handleInput =(event) => {
  setName(event.target.value)
}

const handleClick = (e)=>{
  searchByName(name)
  setName('')
}

  return (
    <div>
      <input placeholder='Search a recipe' type='text' onChange={handleInput} value={name}/>
      <button onClick={handleClick}>Search</button>
      <button onClick={handleClick}>Clear Search</button>
    </div>
  )
}
