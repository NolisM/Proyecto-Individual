import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { addDog, getTemperament } from '../../actions/index';
import { useDispatch } from 'react-redux';
import "./createdog.css"



export class CreateDog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            heigthmax:"",
            heigthmin:"",
            weigthmax:"",
            weigthmin:"",
            life_span:"",
            temperament:[],
            image:"",
            expanding:false
            
        }
        
    }
    componentDidMount(){
        this.props.getTemperament()
    }
     handleSubmit= (event)=>{
            
                event.preventDefault();
                if(this.state.name.length===0 || this.state.heigthmax.length ===0 ||this.state.heigthmin.length ===0 ||this.state.weigthmax.length === 0 || this.state.weigthmin.length === 0 || this.state.life_span.length ===0 || this.state.temperament.length ===0||this.state.image.length===0){
                    alert('[ERROR] THERE CAN BE NO EMPTY FIELDS ');
                } else {
                    addDog(this.state)
                    Axios.post('http://localhost:3001/dogs',{
                        name:this.state.name,
                        heigth:this.state.heigthmin + ' - ' + this.state.heigthmax,
                        weigth:this.state.weigthmin + ' - '+ this.state.weigthmax,
                        life_span:this.state.life_span,
                        temperament:this.state.temperament.join(','),
                        image:this.state.image,
                    })
                    .then(response =>{
                        alert('the dog was added successfully!!');
                        
                        window.location.assign('/Home')
            
                    })
                    .catch(error=>{
                        console.log(error)
                        return error
                    })
                }
            }
        onchange=(e)=>{
            this.setState({
                ...this.state,
                [e.target.name]:e.target.value,
            })
        }

                            
    showcheckboxes=()=>{
        if(!this.expanding){
            this.setState({
                ...this.state, expanding: this.state.expanding === true ? false : true
            })

        }

    }

    handleCheckboxChange = (e) => {
        if(this.state.temperament.includes(e.target.value)){
            this.setState({
                ...this.state,
                temperament: this.state.temperament.filter(temperamento => temperamento !== e.target.value)
            })
        } else {
            this.setState({
                ...this.state,
                temperament: [...this.state.temperament, e.target.value]
            })
        }
    }

    render() {
        
        
        return (
            <div className="form-img">

                    <form onSubmit={(e)=>this.handleSubmit(e)} className="formTotal" id='formulario'>
                        <div className='createDogs'>
                            <h1 className='title'>CREATE DOG</h1>
                            <label className='label'>Name: </label>
                            <input className='input' onChange={(e)=>this.onchange(e)} value={this.state.name} type="text" name="name"/>
                            <div className='heigth'>
                                <div className='inputLabels'>
                                    <label className='label'>heigth max: </label>
                                    <input className='input' onChange={(e)=>this.onchange(e)} value={this.state.heigthmax} type="number" name="heigthmax"/>
                                </div>
                                <div className='inputLabels'>
                                    <label className='label'>heigth min: </label>
                                    <input className='input' onChange={(e)=>this.onchange(e)} value={this.state.heigthmin} type="number" name="heigthmin"/>
                                </div>
                            </div>
                            <div className='weigth'>
                                <div className='inputLabels'>
                                    <label className='label'>weigth max: </label>
                                    <input className='input'  onChange={(e)=>this.onchange(e)} value={this.state.weigthmax} type='number' name="weigthmax"/>
                                </div>
                                <div className='inputLabels'>
                                    <label className='label'>weigth min: </label>
                                    <input className='input'  onChange={(e)=>this.onchange(e)} value={this.state.weigthmin} type='number' name="weigthmin"/>
                                </div>
                            </div>
                            <label className='label'>life_span: </label>
                            <input className='input' onChange={(e)=>this.onchange(e)} value={this.state.life_span} type='number' name="life_span"/>
                                <div className='multiselect'>
                                    <div className='selectbox' onClick= {() => this.showcheckboxes()}>
                                        <select className='selector'>
                                            <option className='optionDefault'>{this.state.temperament.length > 0 ? this.state.temperament.join(', ') : 'Temperaments'}</option>
                                        </select>
                                        <div className='overselect'></div>
                                    </div>
                                    <div id='checkboxes' style={{display: this.state.expanding ? 'block' : 'none'}}>
                                        {this.props.temperament?.map(t=>
                                        <div>
                                            <label key={t.id}>
                                            <input type='checkbox' key={t.id} value={t.name} onChange={(e) => this.handleCheckboxChange(e)}/>
                                                {t.name}
                                            </label>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                
                            <label className='label'>Url Image: </label>
                            <input className='input' onChange={(e)=>this.onchange(e)} value={this.state.image} type='text' name="image" title="Sólo se permiten URLs .com bien formadas"/>
                            <div className='finalButtonsCreateDogs'>
                                <button className='finalButtons' type="submit">Create</button>
                                <button className='finalButtons' onClick={()=> window.location.assign('/Home')}>Home</button>
                            </div>
                        </div>
                    </form>
            </div>
            
        
        );
    };
};

export const mapStateToProps = (state) => { 
    
    return {
        temperament: state.temperament,
        adDog:state.addDog
        
    } 
}


export const mapDispatchToProps = function(dispatch){
    return {
        addDog : () => dispatch(addDog()),
        getTemperament: ()=> dispatch(getTemperament())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog);




















// const CreateDog = () => {
//     const [state, setState]=React.useState({
//         name:"",
//         heigth:"",
//         weigth:"",
//         life_span:"",
//         temperament:"",
//         image:"",
        
//     })
  
    
//     const dispatch = useDispatch();
    
    
//     const onchange=(e)=>{
//             setState({
//                 ...state,
//                 [e.target.name]:e.target.value,
//             })
        
//     }
//     dispatch(getTemperament(state))
  
 
//     const handleSubmit= (event)=>{
//         event.preventDefault();
//         if(state.name.length===0 || state.heigth.length ===0 || state.weigth.length === 0 || state.life_span.length ===0 || state.temperament.length ===0||state.image.length===0){
//             alert('[ERROR] THERE CAN BE NO EMPTY FIELDS ');
//         } else {
//             dispatch(addDog(state))
//             Axios.post('http://localhost:3001/dogs',{
//                 name:state.name,
//                 heigth:state.heigth,
//                 weigth:state.weigth,
//                 life_span:state.life_span,
//                 temperament:state.temperament,
//                 image:state.image,
//             })
//             .then(response =>{
//                 alert('the dog was added successfully!!');
                
//                 window.location.assign('/Home')
    
//             })
//             .catch(error=>{
//                 console.log(error)
//                 return error
//             })
//         }
//     }

    
   
    
//     return (
//         <div className="form-img">
//             <center>

//                 <form onSubmit={(e)=>handleSubmit(e)} className="form" id='formulario'>
//                     <h1 className='title'>CREATE DOG</h1>
//                     <label className='label'>Name: </label>
//                     <input className='input' onChange={(e)=>onchange(e)} value={state.name} type="text" name="name"/>
//                     <label className='label'>heigth: </label>
//                     <input className='input' onChange={(e)=>onchange(e)} value={state.heigth} type="number" name="heigth"/>
//                     <label className='label'>weigth: </label>
//                     <input className='input'  onChange={(e)=>onchange(e)} value={state.weigth} type='number' name="weigth"/>
//                     <label className='label'>life_span: </label>
//                     <input className='input' onChange={(e)=>onchange(e)} value={state.life_span} type='number' name="life_span"/>
//                     {/* <label className='label'>temperaments: </label> */}
//                     {state.temperament.map(t=>{
//                     <input className='input' href='' onChange={(e)=>onchange(e)} value={state.temperament} type='checkbox' name={t.name}/>

//                     })

//                     }
//                     <label className='label'>Url Image: </label>
//                     <input className='input' onChange={(e)=>onchange(e)} value={state.image} type='url' name="image" title="Sólo se permiten URLs .com bien formadas"/>

//                     <button className='button' type="submit">Create</button>

//                 </form>
//                     <button className='button' onClick={()=> window.location.assign('/Home')}>Home</button>
//             </center>
//         </div>
//     );
// };



        
    


// export default CreateDog;
