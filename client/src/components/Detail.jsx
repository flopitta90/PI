import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Title =styled.h1`
   font-family: 'Bowlby One SC';
   font-size: 100px;
   letter-spacing: 3px;
`
const SummaryAndImage = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  text-decoration: none;
  justify-content: space-between;
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
`
const Wrapper= styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  font-weight: bolder;

  li{
    width: 500px;
    line-height: 28px;
  }  
  p{
    width: 500px;
    line-height: 28px;
  }
`
const Fieldset = styled.hr`
  border: solid;
  border-color: black;
  width: 400px;
  display: inline-block;
  margin-left: 30px;
`
const SubTitle = styled.span`
  font-family: 'Bowlby One SC', cursive;
  font-size: 28px;
`
const Ingredient = styled.li`
 
`

const Detail = ({allRecipes}) => {

  const {id} = useParams()
  
  const recipe = allRecipes.find(recipe => recipe.id === parseInt(id))
  console.log(recipe)
  
  return (
    allRecipes.length < 1 ? <h1>loading</h1> :
    <div>
      <Title>{recipe.title}</Title>
      <SummaryAndImage>
      <img src={recipe.image} alt={recipe.title} width='500px' />
      <Summary dangerouslySetInnerHTML={ { __html: recipe.summary } }/>
      </SummaryAndImage>
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
          <SubTitle>Directions</SubTitle>
          <Fieldset/>
        </div>
        <p>{recipe.analyzedInstructions}</p>
      </Wrapper>
      
    </div>
  )
}
function mapStateToProps(state){
  return {allRecipes: state.allRecipes}
}
export default connect(mapStateToProps)(Detail)