import { ADD_DOG, GET_DOGS, GET_DOGS_DETAIL,GET_NEWDOG, GET_TEMPERAMENT } from '../actions'

const initialState = {
    addDog: [],
    DogsLoaded: [],
    DogsDetail: {},
    DogName:[],
    temperament:[],
    totalPages: 0
};


function rootReducer(state = initialState, action) {

    if (action.type === GET_NEWDOG) {
        console.log('reducer',action.payload) // llega la info
        return {
            ...state,
            DogName:action.payload,
        
            
        };
        
    }
    if (action.type === ADD_DOG) { /// para agrgar las razas a base de datos
        return {
            ...state,
            addDog: state.addDog.concat(action.payload)
        }
    }
    if (action.type === GET_DOGS) {
        return {
            ...state,
            DogsLoaded: action.payload, // agrego el nuevo estado y lo concateno con la anterior
            
            
        };
        
    }
    if (action.type === GET_DOGS_DETAIL) {
        
        return {
            ...state,
            DogsDetail: action.payload
            
        };
    }
    if (action.type === GET_TEMPERAMENT) {
        return {
            ...state,
            temperament: action.payload
            
        };
    }

    
    return state;
}

export default rootReducer;











