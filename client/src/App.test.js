import { getAllDogs, addDog, getDogDetail, getTemperament } from '../src/actions/index';


describe("Actions", () => {

  describe("addDog", () => {
    it('Debería retornar una action con las propiedades type "ADD_DOG" y payload: contiene los values recibidos como argumento ', () => {
        
        const payload1 = {
            name:'bull',
            weigth:'10-12',
            heigth:'5-15',
            life_span: 12,
            image:'https://i.blogs.es/808765/dpoty-puppy-2nd--c--tracy-kirby-the-kennel-club-2/1366_2000.jpg',
            temperament:'curioso'
            
        };
        
        expect(addDog(payload1)).toEqual({
            type: "ADD_DOG",
            payload:{
                name:'bull',
                weigth:'10-12',
                heigth:'5-15',
                life_span: 12,
                image:'https://i.blogs.es/808765/dpoty-puppy-2nd--c--tracy-kirby-the-kennel-club-2/1366_2000.jpg',
                temperament:'curioso'
                
            },
        });

    });
  });
  


})
