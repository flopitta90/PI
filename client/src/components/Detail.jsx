import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Title =styled.h1`
   font-family: 'Bowlby One SC';
   font-size: 100px;
   letter-spacing: 3px;
   @media screen and (max-width: 960px){
    font-size: 50px;
   }
`
const SummaryAndImage = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  justify-content: space-between;
  @media screen and (max-width: 960px){
    flex-direction: column;
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
  /* margin: 30px; */
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  font-weight: bolder;
  

  li{
    width: 500px;
    line-height: 28px;
    @media screen and (max-width: 960px){
      width: 90%;
    }
  }  
  p{
    width: 500px;
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

const Detail = ({allRecipes}) => {

  const {id} = useParams()
  
  const recipe = allRecipes.find(recipe => recipe.id === parseInt(id))
  
  return (
    allRecipes.length < 1 ? <h1>loading</h1> :
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