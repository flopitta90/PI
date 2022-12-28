/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  summary: 'typical argentinean dish',
};


describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should bring back a recipe', () => {
      agent.get('/recipes')
      .query({title: 'milanesa'})
      .expect(200)
    })
    it('should be milanesa a la napolitana',()=>{
      agent.get('/recipes')
      .query({title: 'napolitana'})
      .expect(200)
      .then(response => {
        expect(response.body[0].title).toBe('Milanesa a la napolitana')
      })
    })
    it('should get an error if it does not find a recipe with that name',() =>{
      agent.get('/recipes')
      .query({title: 'pizza'})
      .expect(400)
    })
    it('should have a title to be milanesa a la napolitana , to have a summary',()=>{
      agent.get('/recipes')
      .expect(200)
      .then(response => {
        expect(response.body[0]).to.have.property('title')
        expect(response.body[0]).to.have.property('summary')
      })
    })
  });
});


