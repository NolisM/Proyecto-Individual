const { Dog, conn, Temperament } = require('../../src/db.js');
const { expect } = require('chai');


describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({

        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      
    });
    describe('get Dog by id', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
          name:'bull',
          weigth:'10-12',
          heigth:'5-15',
          life_span: 12,
          image:'https://i.blogs.es/808765/dpoty-puppy-2nd--c--tracy-kirby-the-kennel-club-2/1366_2000.jpg',
          temperament:'curioso'

        })
          .then(() =>{
            Dog.findOne({
              where: {
                id:500
              }
            })
          })
          .then((perro)=>{
            expect(perro).to.iqual({
              id:500,
              name:'bull',
              weigth:'10-12',
              heigth:'5-15',
              life_span: 12,
              image:'https://i.blogs.es/808765/dpoty-puppy-2nd--c--tracy-kirby-the-kennel-club-2/1366_2000.jpg',
              temperament:'curioso'
            })
          })
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      
    });

  });
});


