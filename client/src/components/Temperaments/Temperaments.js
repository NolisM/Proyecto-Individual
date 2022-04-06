import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllDogs } from '../../actions';
import Dog from '../Dog/Dog';
import './temperament.css'


class Temperaments extends Component {

 
    componentDidMount(){
        this.props.getAllDogs()
    }
    render() {
        
        let temp= this.props.input
        let dogs= this.props.DogsLoaded
        
        
        
        return (
            <div className='temp'>
            {
                dogs && dogs.map(r=>{
                    if(r.temperament){
                        let spliteado = r.temperament.split(',')
                         return spliteado.map(t=>{
                            if(t.toLowerCase().includes(temp.toLowerCase())){
                                
                                return <Dog 
                                    key={r.id} 
                                    id={r.id} 
                                    name = {r.name} 
                                    temperament = {r.temperament} 
                                    Image = {r.image} 
                                    life_span = {r.life_span}
                                    weigth={r.weigth}
                                    heightmetric={r.height} 
                                /> 
                            }else{

                            }
                        })

                    }
                })
            }
           
            </div>
        
        );
    };
};

export const mapStateToProps = (state) => { 
    
    return {DogsLoaded: state.DogsLoaded} 
}


export const mapDispatchToProps = function(dispatch){
    return {
        getAllDogs : () => dispatch(getAllDogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperaments);