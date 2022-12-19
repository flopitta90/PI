import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDiets, searchRecipes, sort } from '../redux/actions'
import { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper= styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  padding: 30px 20px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;
  align-items: center;
`
const FieldSet = styled.fieldset`
  border-style: solid 4px;
  border-color: black;
  width: 100%;
  margin: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  `

const Input = styled.input`
  background-color: transparent;
  border: solid;
  border-color: black;
`
const Buttons =styled.button`
 background-color : black;
 color:#67eb8e ;
 border: none;
 margin-top: 5px;
 padding: 10px;
 font-family: 'Bowlby One SC', cursive;
 width: 100%;
:hover{
  background-color: #67eb8e;
  color: black;
  border: solid black;
}
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
 const filteredDiets = useSelector(state=> state.filteredDiets)
 const [selectedIds, setSelectedIds] = useState([])
 const [name , setName] = useState('')
 const [selectedSort, setSelectedSort] = useState('as by id')
 const allRecipes = useSelector(state => state.allRecipes)
 const payload = filteredDiets.filter(recipe => filteredDietsFunc(recipe.diets, selectedIds))
 
  

  function whenSelected(e){
    const id = parseInt(e.target.value)
    const result = selectedIds.find(element => element === id)
    if(result){
      setSelectedIds(selectedIds.filter(item => item !== id))
    }
    else{
      setSelectedIds([...selectedIds, id])
    }
  }
  
  useEffect(()=>{
    dispatch(filterDiets(payload))
    dispatch(sort(selectedSort))
  },[selectedIds, dispatch, name, selectedSort])


  function filteredDietsFunc(diets, selectedDiets){
    for (const id of selectedDiets) {
    const result = diets.find(diet => diet.id === id)
    if(!result) return false
    }
    return true
  }

  function handleClear(){
    setSelectedIds([])
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data)=> dispatch(searchRecipes(data)))
  }
  
  const searchByName =  (name) => {
    if(name){
      if(allRecipes.find(recipe => recipe.title.toLowerCase().includes(name))){
        fetch(`http://localhost:3001/recipes?title=${name}`)
          .then((response) => response.json())
          .then((data)=> {
            dispatch(searchRecipes(data))
            setSelectedIds([...selectedIds])
          })
      } else {
          window.alert('There are no recipes with that name, check the spelling or try with another name')
      }
    }
  }  

  const handleInput =(event) => {
  setName(event.target.value)
}

  const handleClick = (e)=>{
  searchByName(name)
  setName('')
}

  const handleSort = (e) =>{
    setSelectedSort(e.target.value)
  }

  return (
    <Wrapper>
        <FieldSet>
          <legend>Search by Name</legend>
          <Input type='text' onChange={handleInput} value={name}/>
          <Buttons onClick={handleClick}>Search</Buttons>
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
          <option value='as by id'>Ascendant by id</option>
          <option value='des by id'>Descendant by id</option>
          <option value='as by score'>Ascendant by Health Score</option>
          <option value='des by score'>Descendant by Health Score</option>
          <option value='az'>Alphabetically A-Z</option>
          <option value='za'>Alphabetically Z-A</option>
        </Select>
      </FieldSet>
      <Buttons onClick={handleClear}>Clear search</Buttons>
    </Wrapper>
  )
}

export default FilterSort
