import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDogDetail } from '../../actions';
import './SearchDogs.css'



class SearchDog extends Component {
    



 async componentDidMount(){

    let raza_id=window.location.search.split('=')[1].replace('%20', ' ')
    await this.props.getDogDetail(raza_id)
}




render() {
    
    let Dogsdetail=this?.props?.DogsDetail || {}

    
    
        return (
            <div className='dogsDetail'>
                <div className='search-img'>
                    <center>
                        <h1>Name: {Dogsdetail?.name}</h1>
                        <img className='imgdog' src={Dogsdetail?.image} alt="" />
                        <p>ID: {Dogsdetail?.id}</p>
                        <p>Temperament: {Dogsdetail?.temperament}</p>
                        <p>Life_span: {Dogsdetail?.life_span}</p>
                        <p>Weigth metric: {Dogsdetail?.weigth?.metric}</p>
                        <p>height metric: {Dogsdetail?.height?.metric}</p>
                        <button className='button' onClick={()=> window.location.assign('/Home')}>Home</button>
                    </center>
                    
                    
                    
                </div>
            </div>
        );
    };
};

export const mapStateToProps = (state) => {
    
    return {DogsDetail: state.DogsDetail} 
}


export const mapDispatchToProps = function(dispatch){
    return {
        getDogDetail : (input) => dispatch(getDogDetail(input))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDog);