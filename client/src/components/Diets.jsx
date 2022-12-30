import React, { useEffect } from 'react'
import styled from 'styled-components'

const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  h1{
    font-family: 'Bowlby One SC', cursive;
    font-size: 60px;
    letter-spacing: 2px;
    color: #67eb8e
  }
`
const DietsWrapper = styled.div`
  background-color: black;
  color:white;
  width: 900px;
  @media screen and (max-width: 960px){
    width: 350px;
  }
  p{
    margin: 0px 20px;
  }
  .last{
    margin-bottom: 30px;
  }
`

export const Diets = () => {

  useEffect(()=>{
    window.scroll({
      top:0,
      left:0,
      behavior: 'smooth',
    })
  },[])
  return (
    <Div>
      <h1>Diets</h1>
      <DietsWrapper>
        <h3>Gluten Free</h3>
        <p>Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).</p>
        <h3>Ketogenic</h3>
        <p>The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.</p>
        <h3>Lacto-Ovo-Vegetarian</h3>
        <p>All ingredients must be vegetarian but can contain eggs or any dairy.</p>
        <h3>Vegan</h3>
        <p>No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.</p>
        <h3>Pescetarian</h3>
        <p>Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.</p>
        <h3>Paleo</h3>
        <p>Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.</p>
        <h3>Primal</h3>
        <p>Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.</p>
        <h3>Low FODMAP</h3>
        <p>FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)</p>
        <h3>Whole30</h3>
        <p className='last'>Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.</p>
      </DietsWrapper>
    </Div>
  )
}
