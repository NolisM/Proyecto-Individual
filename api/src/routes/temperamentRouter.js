const axios = require('axios')
const express = require('express')
const { Sequelize } = require('sequelize');
const router = express()
const {Temperament } = require('../db.js')
const {YOUR_API_KEY} = process.env;


  





const gettemperament= async function(req,res){
  
    
    const tempBD = await Temperament.findAll() // traigo todos los temperamentos de mi bd
    if(tempBD.length > 0){ // verifico que exista algun dato cargado
        
        return res.json(tempBD)
    }else{
        try{
            
            axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            .then(async (response) => {
                const respuesta=response.data
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].temperament){
                        let respuestasplit = respuesta[i].temperament.split(','); // como me viene como una cadena de string las spliteo
                        
                        let tempBD = await Temperament.findAll(); //traigo los temperamentos existentes en mi base de datos
                        
                        if(!tempBD){ // si no hay nada en mi base de datos
                            
                            for (let j = 0; j < respuestasplit.length; j++){
                                
                                let resp = await Temperament.findOrCreate({ // creo un temperamento nuevo por cada temperamento de mi api
                                    where:{
                                    
                                        name:respuestasplit[j],
                                    }
                                })
                                let respo=await Temperament.findAll()
                            
                            }
                                
                        }else{ // si ya hay cargados
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
                let resp = await Temperament.findAll(); // traigo los temperamentos creados en mi base de datos
                console.log(resp)
                return res.json(resp)
            })
            .catch(function (error) {
                console.log('error del then', error);
            })
            
        }catch{
            console.log('error del try')
            return('error')
            
        }


    }
    
}




router.get('/',gettemperament)

module.exports=router





                    
                    
                
                
                    