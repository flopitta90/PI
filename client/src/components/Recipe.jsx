import React , { useEffect, useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { deleteFav, addFav } from '../redux/actions'


const RecipeDiv = styled.div`
  background-color: black;
  width: 300px;
  margin-bottom: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
`
const Specifics = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-family: 'Bowlby One SC';
  letter-spacing: 2px;
  font-size: 15px;
`
const Img = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
`
const DietsWrapper= styled.div`
position: absolute;
top:0;
height: 85%;
width: 100%;
color: transparent;
@media (hover: hover) {
  &:hover{
    position: absolute;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-bottom: 10px;
    height: 85%;
    color: #67eb8e;
    transition: 0.5s all ease;
  }
}
@media screen and (max-width: 960px){
  display: none;
}
`
const Diets = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  padding: 10px;
 
`
const FavButton = styled.button`
  border: none;
  background-color: transparent;
  position: relative;
  margin: 20px;
  font-size: 25px;
  `

export const Recipe = (props) => {

  const [isFav, setIsFav] = useState(false)
  const dispatch = useDispatch()
  const myFavorites = useSelector(state => state.myFavorites)

  useEffect(()=>{
    if(myFavorites.find(favorite => favorite.id === props.id)){
      setIsFav(true)
    }
  },[])

  const favHandler = () => {
    if(isFav) {setIsFav(false)
    dispatch(deleteFav(props.id))}

    if(!isFav) {setIsFav(true)
    dispatch(addFav(props))}
  }

  return (
    <RecipeDiv>
      <Specifics to={`/detail/${props.id}`}>
      <Img alt={props.title} src={props.image}/>
      <h2>{props.title}</h2>
      <DietsWrapper>
      <h2>{props.title}</h2>
      {props.diets?.map(diet => <Diets key={diet.name}>{diet.name}</Diets>)}
      </DietsWrapper>
      </Specifics>

      {isFav ? (
        <FavButton onClick={favHandler}>❤️</FavButton>
        ) : (
          <FavButton onClick={favHandler}>🤍</FavButton>)
        }
    </RecipeDiv>
  )
}
