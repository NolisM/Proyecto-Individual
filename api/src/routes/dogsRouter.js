const axios = require('axios')
const express = require('express');
const router = express()
const { Dog, Temperament } = require('../db.js')
const {YOUR_API_KEY} = process.env;



//GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
//GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado


const getdogs= async (req,res)=>{
    let breeds=[]; // todas las razas
    let bred=[]
    const dogBd= await Dog.findAll() // razas cargadas en mi bd
    let breed =[] // por una raza
    const {raza_perro}=req.query
    
    
    try{
        if (raza_perro){

           let bred= dogBd.filter(r=> r.name === raza_perro)
           console.log(bred)
            

            axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza_perro}`)
            .then(response => {
                if(response.data.length!==0)bred.push(response.data)
                return res.status(200).json(bred)
            })
            .catch(function (error) {
                res.status(400).json({error})
                console.log('error del then', error);
            })
        }else{
            
            axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            .then(async(response) => {
                let respuesta=response.data;
                
                
                respuesta.map(r=>
                        breeds.push({
                            id:r.id,
                            name:r.name,
                            temperament:r.temperament,
                            life_span:r.life_span,
                            weigth:!r.weight.metric.includes('NaN') ? r.weight.metric : 0,
                            height:r.height.metric.includes('NaN') ? r.height.metric : 0,
                            imageid:r.image.id,
                            image:r.image.url
                        
                        })
                    )
                if (dogBd){ // agrego a la respuesta razas guardadas en mi bd
                    dogBd.map(r=>{
                        breeds.push({
                            id:r.id,
                            name:r.name,
                            temperament:r.temperament,
                            image:r.image,
                            life_span:r.life_span,
                            weigth:!r.weigth ? r.weigth : 0,
                            heigth:!r.heigth ? r.heigth : 0,
                            image:r.image
                        })
                    })
                }
                for (let i = 0; i < respuesta.length; i++) { // agrego a mi bd todos los temperamentos de las razas traidas por la api
                    if (respuesta[i].temperament){
                        let respuestasplit = respuesta[i].temperament.split(','); // como me viene como una cadena de string las spliteo
                        
                        let tempBD = await Temperament.findAll(); //traigo los temperamentos existentes en mi base de datos
                        
                        if(!tempBD){ // si no hay nada en mi base de datos cargo temperamentos
                            
                            for (let j = 0; j < respuestasplit.length; j++){
                                
                                let resp = await Temperament.findOrCreate({ // creo un temperamento nuevo por cada temperamento de mi api
                                    where:{
                                    
                                        name:respuestasplit[j],
                                    }
                                })                        
                            }
                                
                        }else{ // si ya hay cargados verifico que se encuentren
                            for (let j = 0; j < respuestasplit.length; j++) {
                                let verifico = tempBD.find((temp) => temp.name === respuestasplit[j])
                                if(!verifico){ // verifico que el temperamento no este ya guardado
                                    let resp = await Temperament.findOrCreate({ // creo un temperamento nuevo por cada temperamento de mi api
                                        where:{
                                            name: respuestasplit[j]
                                        }
                                    })
                                }
                                
                            }
                            
                        } 
                    }
                }
                
                return res.status(200).json(breeds);
            })
            .catch(function (error) {
                res.status(400).json({error})
                console.log('error del then', error);
            })
        }

        }
    catch{

        return res.status(400).json('error')
        
    }
}

// GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// Altura,Peso,Años de vida
const getdogsid= (req,res)=>{
    let breedsid; // razas por id
    const{razaId}=req.params
   
    if(!razaId)res.json('error')
    try{
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        .then(response=>{
            let respuesta=response.data;
            if (razaId){
                
                respuesta.map(r=> {
                   // console.log( 'Image:',r.image.url)
                    if(Number(razaId) === Number(r.id) ){
                        breedsid= {
                            id:r.id,
                            name:r.name,
                            temperament:r.temperament,
                            image:r.image.url,
                            life_span:r.life_span,
                            weigth:r.weight,
                            height:r.height
                        }
                    }})
               
                
            }
            if(breedsid)return res.status(200).json(breedsid)
            else return res.status(400).json('no se encontro la raza')
        })
        .catch(function (error) {
            console.log('error del then', error);
            res.status(400).json('error')
        })
        
    }catch{
            return res.status(400).json('error')
    }

}



//POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
let idnum=0

const postdogs= async (req,resp)=>{
    const {name, heigth, weigth, life_span, temperament,image}=req.body
    
    
    try {
        const todo= await Dog.findAll()
        if (todo){
            idnum = todo.length + 500
        }
        const dog = await Dog.create({ // creo un dog con los datos pasados por body
            id:idnum,
            name,
            heigth,  
            weigth, 
            life_span,
            image: String(image)
        });
        
        const [temp, created] = await Temperament.findOrCreate({ // creo un nuevo temperamento
            where: {
                name:temperament
            }
        })
        await dog.addTemperaments(temp) // vinculo a la raza con el temperamento recien creada
        await temp.addDogs(dog) // vinculo a el temperamento  con dog pasadas por body

        resp.status(200).json({dog , temp})
        
    } catch (error) {
        console.log('error', error)
        resp.status(400).json(error)
    }
    
}

router.post('/', postdogs)
router.get('/',getdogs)
router.get('/:razaId',getdogsid)
module.exports = router

