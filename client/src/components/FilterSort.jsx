import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDietId, filterDiets, setSelectedSort, setName, sort } from '../redux/actions'
import { useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper= styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  padding: 30px 20px;
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;
  align-items: center;
  @media screen and (max-width: 960px){
    width: 80%;
  }
`
const FieldSet = styled.fieldset`
  border-style: solid 4px;
  border-color: black;
  width: 100%;
  margin: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  `

const Input = styled.input`
  background-color: transparent;
  border: solid;
  border-color: black;
  font-size: 16px;
`
const Buttons =styled.button`
 background-color : black;
 color:#67eb8e ;
 border: none;
 margin-top: 5px;
 padding: 10px;
 font-family: 'Bowlby One SC', cursive;
 width: 100%;
`
const Link = styled(NavLink)`
  font-size: 13.3333px;
  font-weight: lighter;
  text-decoration: none;
  background-color : black;
  color:#67eb8e ;
  margin-top: 5px;
  padding: 10px 0px;
  font-family: 'Bowlby One SC', cursive;
  width: 100%;
  cursor: pointer;
    &.mobile{
      display: none;
      @media screen and (max-width: 960px){
        display: flex;
        align-items: center;
        justify-content: center;
      }  
    }
`
const Div =styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Select = styled.select`
  border: solid;
  border-color: black;
  background-color: transparent;
  font-size: 11px;
`

const FilterSort = () => {

  const dispatch = useDispatch()
  const allDiets = useSelector(state => state.allDiets)
  const allRecipes = useSelector(state => state.allRecipes)
  const selectedSort = useSelector(state=> state.selectedSort)
  const selectedIds = useSelector(state=> state.selectedIds)
  const name = useSelector(state=> state.name)
  const payload = allRecipes.filter(recipe => filteredDietsFunc(recipe.diets, selectedIds) && recipe.title.toLowerCase().includes(name))
    
  useEffect(()=> {
    window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  })
},[])
  function whenSelected(e){
    const id = parseInt(e.target.value)
    const result = selectedIds.find(element => element === id)
    if(result){
      dispatch(addDietId(selectedIds.filter(item => item !== id)))
    }
    else{
      dispatch(addDietId([...selectedIds, id]))
    }
  }
  
  useEffect(()=>{
    dispatch(filterDiets(payload))
    dispatch(sort(selectedSort))
  },[selectedIds, dispatch, name, selectedSort,allRecipes])


  function filteredDietsFunc(diets, selectedDiets){
    for (const id of selectedDiets) {
    const result = diets.find(diet => diet.id === id)
    if(!result) return false
    }
    return true
  }

  function handleClear(){
    dispatch(addDietId([]))
    dispatch(setName(''))
  }
 
  const handleInput =(event) => {
  const name = event.target.value.toLowerCase()
  dispatch(setName(name))
}


  const handleSort = (e) =>{
    dispatch(setSelectedSort(e.target.value))
  }

  return (
    <Wrapper>
        <FieldSet>
          <legend>Search by Name</legend>
          <Input type='text' onChange={handleInput} value={name}/>
        </FieldSet>
        
      <FieldSet>
          <legend>Filter by diets</legend>
          {allDiets.map(diet => {
            return <div key={diet.name}>
              <Input type='checkbox' id={diet.id} value={diet.id} onChange={whenSelected} checked={selectedIds.find(element => element === diet.id)|| false}/>
              <label >{diet.name}</label>
            </div>
        })}
      </FieldSet>
      <FieldSet>
        <legend>Sort</legend>
        <Select onChange={handleSort}>
          <option value='none'>none</option>
          <option value='as by id'>Ascendant by id</option>
          <option value='des by id'>Descendant by id</option>
          <option value='as by score'>Ascendant by Health Score</option>
          <option value='des by score'>Descendant by Health Score</option>
          <option value='az'>Alphabetically A-Z</option>
          <option value='za'>Alphabetically Z-A</option>
        </Select>
      </FieldSet>
      <Div>
      <Link className='mobile' to='/home'>search</Link>
      <Buttons onClick={handleClear}>Clear search</Buttons>
      <Link to='/diets'>info diets</Link>
      </Div>
    </Wrapper>
  )
}

export default FilterSort
