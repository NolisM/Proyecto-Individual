import Axios from 'axios';
export const ADD_DOG ='ADD_DOG'
export const GET_DOGS ='GET_DOGS'
export const GET_DOGS_DETAIL='GET_DOGS_DETAIL'
export const GET_NEWDOG='GET_NEWDOG'
export const GET_TEMPERAMENT='GET_TEMPERAMENT'



export function addDog(state) { // AGREGAR RAZAS
    return {
        type: ADD_DOG,
        payload:{
            ...state,
        } };
}

export function getAllDogs(raza_perro) {
    if(!raza_perro){

        return function(dispatch) {
    
            return  Axios.get('http://localhost:3001/dogs') // pedido a la api https://thedogapi.com/?apikey=17cfe82f-15fd-480a-9d1f-56af7c60c05f
            .then(response =>{
                dispatch({ type: GET_DOGS, // despacho la ccion
                payload: response.data });
               
    
            })
            .catch(error=>{
                console.log(error)
                return error
            })
        };
    }else{
        console.log('raza de perro',raza_perro)
        return function(dispatch) {
    
            return  Axios.get(`http://localhost:3001/dogs?raza_perro=${raza_perro}`) 
            .then(response =>{
                console.log('axios',response.data)
                dispatch({ type: GET_NEWDOG, 
                payload: response.data });
    
            })
            .catch(error=>{
                console.log(error)
                return error
            })
        };

    }
}


export function getDogDetail(id) {
    return function(dispatch) {
        return  Axios.get(`http://localhost:3001/dogs/${id}`) // pedido a la api https://thedogapi.com/?apikey=17cfe82f-15fd-480a-9d1f-56af7c60c05f
        .then(response =>{
            dispatch({ type: GET_DOGS_DETAIL, // despacho la ccion
            payload: response.data });
           

        })
        .catch(error=>{
            console.log(error)
            return error
        })
    }
    
}



export function getTemperament() {
    console.log('entre en temperament')
    return function(dispatch) {
        return  Axios.get('http://localhost:3001/temperament') // pedido a la api https://thedogapi.com/?apikey=17cfe82f-15fd-480a-9d1f-56af7c60c05f
        .then(response =>{
            // console.log('temperament', response.data)
            dispatch({ type: GET_TEMPERAMENT, // despacho la ccion
            payload: response.data });
           

        })
        .catch(error=>{
            console.log(error)
            return error
        })
    }
}






