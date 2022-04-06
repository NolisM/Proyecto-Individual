import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDogs, addDog, getDogDetail, getTemperament } from '../../actions';
import Dogs from "../Dogs/dogs";
import Temperaments  from "../Temperaments/Temperaments";
import './Buscador.css';



export class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breed: "",
            temp:"",
            currentTemp: '',
            search:'',
            currentSearch:'',
            currentFormat: 'allDogs',
            order: 'allDogs',
            orderTypeName: 'ascendant',
            orderTypeWeight: 'ascendant'
        };
    }
    
    handleChange = (e) =>{
        
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value,
            
        })
        
    } 

    validation=()=>{
        if(this.state.temp.trim() === '' || this.state.temp.length === 0){ 
            alert('You must complete the temper to look for it')
        }else{
            this.setState({...this.state, currentTemp: this.state.temp.trim(), currentFormat: 'temperaments'})
        }
    }


    

    render() {
        
        console.log('props',this.props)
        return (
        <div className="buscador">
            <div className="buscador-img">
                <div className="navbar">

                    <form className="inputbloque options" onSubmit={(e) => e.preventDefault()}>
                        <input className="input"   type='text' value={this.state.search.trim()} onChange={(e)=>this.handleChange(e)}  href='#' placeholder="...Dog Name" name="search"  />
                        <button type="submit" className="label" onClick={()=>{this.setState({...this.state, currentSearch: this.state.search, currentFormat:'allDogs', order:'searchDog'}); this.props.getAllDogs(this.state.search)}}  >Search </button>
                    </form>
                    <form className="temperament options" onSubmit={(e) => e.preventDefault()}>
                        <input className="input"  type='text'  href='#' value={this.state.temp} onChange={(e)=>this.handleChange(e)} placeholder="...Insert temperament" name="temp" />
                        <button className="label" href='#' onClick={()=>this.validation() }>Search by Temperaments</button> 
                    </form>
                    <div className="options">
                        <button className="label" onClick={()=> window.location.assign('/Home/createDog')}>New dogs</button>
                    </div>
                </div>
                <div className="list-item">
                    <button className="optionbutton" onClick={()=> {this.setState({...this.state, currentSearch: '', order: 'allDogs', currentFormat: 'allDogs'}); this.props.getAllDogs()}}>All Dogs</button>
                    <button className="optionbutton" onClick={()=> this.setState({...this.state, order: 'name', orderTypeName: this.state.orderTypeName === 'ascendant' ? 'descendant' : 'ascendant'})}>Sort by Name {this.state.orderTypeName === 'ascendant' ? "🡅" : "🡇"}</button>               
                    <button className="optionbutton" onClick={()=>  this.setState({...this.state, order: 'weigth', orderTypeWeight: this.state.orderTypeWeight === 'ascendant' ? 'descendant' : 'ascendant'})}>Sort by Weigth {this.state.orderTypeWeight === 'ascendant' ? "🡅" : "🡇"}</button>               
                </div>
                {
                    this.state.currentFormat === 'allDogs' ? 
                        <div>
                            <Dogs order={this.state.order} orderTypeName={this.state.orderTypeName} orderTypeWeight={this.state.orderTypeWeight} search={this.state.search}/>
                        </div>
                        : 
                        this.state.currentFormat === 'temperaments' ?
                            <div>
                                    <Temperaments
                                        input={this.state.currentTemp}
                                    />
                            </div>
                        : null
                }
            </div>
        </div>
        );
        
    }
}
const mapdispachtoprops=(dispatch)=>{
    return {
        getAllDogs: dogs => dispatch(getAllDogs(dogs)),
        addDog: dog => dispatch(addDog(dog)),
        getDogDetail: breed => dispatch(getDogDetail(breed)),
        getTemperament:(dogs)=>dispatch(getTemperament(dogs))
    }
}

const mapstatetoprops=(state)=>{
    console.log('statetoprops',state)
    return{
    DogsLoaded: state.DogsLoaded,
    Temperament: state.Temperament,
    DogName:state.DogName
    }
}

export default connect(mapstatetoprops,mapdispachtoprops)(Buscador);
