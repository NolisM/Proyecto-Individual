import React from 'react';
import './Dog.css'



const Dog = ({id, name, temperament, Image, life_span, weigth, height,order}) => {

    const onclick=()=>{
        window.location.assign(`/SearchDog?id=${id}`)
    }

    
    return (
        <div className='dog'>{
            
            order === 'searchDog' ? 
                <button  className='buttondog' onClick={()=> onclick()}>
                    <h1 className='titledog'>{name}</h1>
                    <img className='img' src={Image} alt="" />
                    <p>ID: {id}</p>
                    <p>Temperament: {temperament}</p>
                    <p>Life_span: {life_span}</p>
                    <p>Weigth metric: {weigth}</p>
                    <p>height metric: {height}</p>
                </button>
            : 
                <button className='buttondog'  onClick={()=> onclick()}>
                    <h1 className='titledog'>{name}</h1>
                    <img className='img' src={Image} alt="" />
                    <p>Temperament: {temperament}</p>
                    <p>Weigth metric: {weigth}</p>
                </button> 

        }


        </div>
    );
};

export default Dog;