/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weigth:'10-12',
  heigth:'5-15',
  life_span: 12,
  image:'https://i.blogs.es/808765/dpoty-puppy-2nd--c--tracy-kirby-the-kennel-club-2/1366_2000.jpg',
  temperament:'curioso'
  
};
const dog2=[
    {
        "weight": {
            "imperial": "65 - 115",
            "metric": "29 - 52"
        },
        "height": {
            "imperial": "24 - 28",
            "metric": "61 - 71"
        },
        "id": 6,
        "name": "Akita",
        "bred_for": "Hunting bears",
        "breed_group": "Working",
        "life_span": "10 - 14 years",
        "temperament": "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous",
        "reference_image_id": "BFRYBufpm"
    }
]


describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs/6', ()=>{
    it('responde con un status 200 ', async ()=>{
      const response = await agent.get('/dogs/6')
      expect(response.status).to.equal(200)
      console.log('response', response.body)
      expect(response.body).to.equal({
        "id": 6,
        "name": "Akita",
        "bred_for": "Hunting bears",
        "breed_group": "Working",
        "life_span": "10 - 14 years",
        "temperament": "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous",
        
      })
    })
  })
});
