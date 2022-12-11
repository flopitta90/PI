import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDiets, searchRecipes, sort } from '../redux/actions'
import { useEffect } from 'react'


const FilterSort = () => {

 const dispatch = useDispatch()
 const allDiets = useSelector(state => state.allDiets)
 const filteredDiets = useSelector(state=> state.filteredDiets)
 const [selectedIds, setSelectedIds] = useState([])
 const [name , setName] = React.useState('')
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
  },[selectedIds, dispatch, name])


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
    dispatch(sort(e.target.value))
  }




  return (
    <div>
        <div>
          <input placeholder='Search a recipe' type='text' onChange={handleInput} value={name}/>
          <button onClick={handleClick}>Search</button>
        </div>
      <fieldset>
          <legend>Filter by diets</legend>
          {allDiets.map(diet => {
            return <div key={diet.name}>
              <input type='checkbox' id={diet.id} value={diet.id} onChange={whenSelected} checked={selectedIds.find(element => element === diet.id)|| false}/>
              <label >{diet.name}</label>
            </div>
        })}
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <select onChange={handleSort}>
          <option value='as by id'>Ascendant by id</option>
          <option value='des by id'>Descendant by id</option>
          <option value='as by score'>Ascendant by Health Score</option>
          <option value='des by score'>Descendant by Health Score</option>
          <option value='az'>Alphabetically A-Z</option>
          <option value='za'>Alphabetically Z-A</option>
        </select>
      </fieldset>
      <button onClick={handleClear}>Clear search</button>
    </div>
  )
}

export default FilterSort
