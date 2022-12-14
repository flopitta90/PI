import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import loading from '../images/loading.gif'
import {Error} from './Error'
import { Update } from './Update'
import iconEdit from '../images/edit.svg'
import icondelete from '../images/delete.svg'
import { deleteRecipe } from '../redux/actions'

const Title =styled.h1`
   font-family: 'Bowlby One SC';
   font-size: 90px;
   letter-spacing: 3px;
   @media screen and (max-width: 960px){
    font-size: 40px;
    padding: 5px;
   }
`
const SummaryAndImage = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  justify-content: space-evenly;
  @media screen and (max-width: 960px){
    flex-direction: column;
    img{
      width: 100%;
    }
  }
`
const Summary=styled.p`
  width: 600px;
  text-align: justify;
  padding-right: 5%;
  font-size: 17px;
  font-weight: bolder;
  text-decoration: none;
  a{
    text-decoration: none;
    color: white;
  }
  @media screen and (max-width: 960px){
    width: 90%;
    padding:10px;
  }
`
const SubTitleWrapper= styled.div`
background-color: #67eb8e;
`

const Wrapper= styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  font-weight: bolder;
  

  li{
    width: 900px;
    line-height: 28px;
    @media screen and (max-width: 960px){
      width: 90%;
    }
  }  
  p{
    width: 900px;
    line-height: 28px;
    background-color: #f8f8f8;
    padding: 0px 20px;
    @media screen and (max-width: 960px){
      width: 90%;
    }
  }

`
const Fieldset = styled.hr`
  border: solid;
  border-color: black;
  width: 400px;
  display: inline-block;
  margin-left: 30px;
  @media screen and (max-width: 960px){
    width: 130px;
  }
`
const SubTitle = styled.span`
  font-family: 'Bowlby One SC', cursive;
  font-size: 28px;
  @media screen and (max-width: 960px){
    font-size: 20px;
  }
`
const Ingredient = styled.li`
background-color: #f8f8f8;
padding: 0px 20px;
`
const Button =styled.button`
   background-color : black;
      color:#67eb8e ;
      border: none;
      font-family: 'Bowlby One SC', cursive;
      padding: 15px;
      margin: 5px;
      margin-bottom: 50px;
      @media (hover: hover) {
        &:hover{
          background-color: #424141;
        }
      }
`
const Detail = ({allRecipes}) => {
  
  React.useEffect(()=> {
    window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  })
  },[])

  const {id} = useParams()
  const [edit , setEdit]= useState(false)
  const recipe = allRecipes.find(recipe => recipe.id === parseInt(id))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(!recipe) {return <Error/>}

  const wantDelete =() =>{
    if(window.confirm('Are you sure you want to delete this recipe?')){
      const recipe = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
 
    fetch(`https://pi-production-b6af.up.railway.app/recipes/${id}`, recipe)
      .then(response => response.json())
      .then((data) => {dispatch(deleteRecipe(data))
        if(data.id){ 
          navigate(`/home`)
          window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          })
        }
        else{
          window.alert('There was an error updating your recipe')
        }
      })
    }else{
      console.log('uff')
    }
  }
  
  return (
    allRecipes.length < 1 ? <img  width = '350px'src={loading}/> :
    <div>
      <Title>{recipe.title}</Title>
      <SummaryAndImage>
      <img src={recipe.image} alt={recipe.title} width='500px' />
      <Summary dangerouslySetInnerHTML={ { __html: recipe.summary } }/>
      </SummaryAndImage>

       <SubTitleWrapper>
          <Wrapper>
            <SubTitle>Ready in {recipe.readyInMinutes} minutes</SubTitle>
          </Wrapper>

          <Wrapper>
            <SubTitle>Health Score: {recipe.healthScore}</SubTitle>
          </Wrapper>

          <Wrapper>
            <SubTitle>{recipe.dishTypes}</SubTitle>
          </Wrapper>
        </SubTitleWrapper>

        <Wrapper>
          <div>
            <SubTitle>Ingredients</SubTitle>
            <Fieldset/>
          </div>
          <div>
            {recipe.ingredients.map(ing => <Ingredient key={ing}>{ing}</Ingredient>)}
          </div>
        </Wrapper>
        
        <Wrapper>
          <div>
            <SubTitle>Instructions</SubTitle>
            <Fieldset/>
          </div>
          <p>{recipe.analyzedInstructions}</p>
        </Wrapper>
        <Button 
        onClick={()=> {setEdit(!edit)}}><img width= '20px'src={iconEdit}/></Button>
        <Button onClick={wantDelete}><img width= '20px' src={icondelete}/></Button>
        {edit ? <Update/> : null}
      
    </div>
  )
}
function mapStateToProps(state){
  return {allRecipes: state.allRecipes}
}
export default connect(mapStateToProps)(Detail)