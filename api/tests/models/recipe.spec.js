const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

const ValidRecipe = {
  title: 'Asado con fritas',
  summary: 'Typical argentinean dish'
}

const RecipeComplete = {
  title: 'Asado con fritas',
  summary: 'Typical argentinean dish',
  image: 'https://images.getrecipekit.com/20220308203252-pizzas.png',
  healthScore: 20,
  dishTypes: 'lunch, dinner',
  analyzedInstructions: 'paso 1, paso 2',
  readyInMinutes: 45,
  ingredients: ['meat','charcoal', 'salt']
}

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('recipe', () => {
      it('should throw an error if title is null', async() => {
        try {
            await Recipe.create({summary: 'Typical argentinean dish'})
          } catch (error) {
            return
          }
          throw new Error('A title should be required always')
      });
      it('should throw an error if summary is null', async()=>{
        try {
            await Recipe.create({title: 'Milanesa a la napolitana'})  
          } catch (error) {
            return
          }
          throw new Error('A Summary should be required always')
      });
      it('should work with required fields', async () => {
        try {
           await Recipe.create(ValidRecipe)
          } catch (error) {
            throw new Error(error)
          }
      });
      it('should have created an id', async()=>{
        try {
          const result = await Recipe.create(ValidRecipe)
          expect(result).to.have.property('id')
        } catch (error) {
          throw new Error(error)
        }
      })
      it('should have all the rest of properties with default values',async()=>{
        try {
          const result = await Recipe.create(ValidRecipe)
          expect(result).to.have.property('image', 'https://img.freepik.com/vector-premium/bandeja-comida-cubierta-icono-servicio-habitaciones-hotel_548264-510.jpg?w=2000')
          expect(result).to.have.property('healthScore', 0)
          expect(result).to.have.property('dishTypes', 'Main dish')
          expect(result).to.have.property('analyzedInstructions', 'No hay descripcion paso a paso para esta receta')
          expect(result).to.have.property('readyInMinutes', 60)
          expect(result).to.have.property('ingredients')
          expect(result.ingredients[0]).to.equal('No se han especificado los ingredientes')
        } catch (error) {
          throw new Error(error)
        }
      })
      it('should have all the rest of properties with given values',async()=>{
        try {
          const result = await Recipe.create(RecipeComplete)
          expect(result).to.have.property('image', 'https://images.getrecipekit.com/20220308203252-pizzas.png' )
          expect(result).to.have.property('healthScore', 20)
          expect(result).to.have.property('dishTypes', 'lunch, dinner')
          expect(result).to.have.property('analyzedInstructions', 'paso 1, paso 2')
          expect(result).to.have.property('readyInMinutes', 45)
          expect(result).to.have.property('ingredients')
          expect(result.ingredients[0]).to.equal('meat')
        } catch (error) {
          throw new Error(error)
        }
      })
    });
  });
});
