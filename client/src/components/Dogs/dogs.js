import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllDogs } from '../../actions';
import Dog from '../Dog/Dog';
import './dogs.css'



export class Dogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from:0,
            limit:8,
            current:1,
            order: props.order,
            otherorder:'ligth'
        }
        
    }
    

    componentDidMount(){
        this.props.getAllDogs()
    }
    

    calculatePage(e, type) { // paginado
        if(this.state.totalPages === 0) {
        }
        if( type === 'sumar'){
            console.log('calculatePage', this.state.current, this.props.totalPages)
            if(this.state.current < this.props.totalPages){
                this.setState({...this.state, limit:this.state.limit+8, from:this.state.from+8, current:this.state.current+1 })
            }
        }else{
            if(this.state.current > 1 ){
                this.setState({...this.state, limit:this.state.limit-8, from:this.state.from-8, current:this.state.current-1 })
            }
        }
    }



    getInformationSortByName(){ // ordenamiento por nombre
        let newDogs = this.props.DogsLoaded
        if(this.props.orderTypeName === 'ascendant'){
            newDogs.sort((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
            })
        }else{
            newDogs.sort((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })

        }
        return newDogs
    } 

    getInformationSortByWeight(){ // ordenamiento por weigth
        let newDogs = this.props.DogsLoaded
        newDogs.sort((a, b) => {
            let c=String(a.weigth)
            let d=String(b.weigth)
            console.log('info', d, c)
            if(Number(c?.split('-')[0]) < Number( d?.split('-')[0])) return 1;
            if(Number(c?.split('-')[0]) > Number( d?.split('-')[0])) return -1;
            if(isNaN(c) || isNaN(d) || c==='NaN'|| d ==='NaN') return 1
            return 0;
        })
        return newDogs
    }

    getInformationListedByName() {
        let newDog=[]
        let dogs= this.props.DogsLoaded
        let dogsFiltered=  this.props.DogName
        console.log('dogs',this.props.DogName)
       console.log('estos son los datos a filtrar', this.props)
        dogsFiltered.map(dogFiltered => {
            dogs.map(r=>{
                if (r.imageid ===dogFiltered.reference_image_id ){
                    newDog.push({
                        id:r.id, 
                        name :r.name ,
                        temperament:r.temperament,
                        image:r.image,
                        life_span :r.life_span,
                        weigth:r.weigth,
                        height:r.height
                    })
                }
                return 0
            })
            return 0
        })
        return dogsFiltered
        // if ( newDog.length>0 ){
        // }else{
        //     alert('Your Search Was NOT Successful')
            

        // }
        
        
        
    }
    render() {
        
        console.log(this.props)
        return (
            <div>
                <div className='dogs'>
                    
                    {
                        // muestra todas las razas
                        this.props.order === 'allDogs'?
                        this.props.DogsLoaded && this.props.DogsLoaded.slice(this.state.from, this.state.limit).map(h => 
                                
                                <Dog 
                                    order={this.state.otherorder}
                                    key={h.id} 
                                    id={h.id} 
                                    name = {h.name} 
                                    temperament = {h.temperament} 
                                    Image = {h.image} 
                                    life_span = {h.life_span}
                                    weigth={h.weigth}
                                    heightmetric={h.height} 
                                /> 
                            )
                        : 
                        this.props.order === 'name'?
                         this.getInformationSortByName()?.slice(this.state.from, this.state.limit).map(h => 
                                
                                <Dog 
                                    order={this.state.otherorder}
                                    key={h.id} 
                                    id={h.id} 
                                    name = {h.name} 
                                    temperament = {h.temperament} 
                                    Image = {h.image} 
                                    life_span = {h.life_span}
                                    weigth={h.weigth}
                                    heightmetric={h.height} 
                                /> 
                            )
                        
                        : 
                        
                        this.props.order === 'weigth' ?
                            this.getInformationSortByWeight()?.slice(this.state.from, this.state.limit).map(h => 
                                
                                <Dog 
                                    order={this.state.otherorder}
                                    key={h.id} 
                                    id={h.id} 
                                    name = {h.name} 
                                    temperament = {h.temperament} 
                                    Image = {h.image} 
                                    life_span = {h.life_span}
                                    weigth={h.weigth}
                                    heightmetric={h.height} 
                                /> 
                            )
                        : this.props.order === 'searchDog' ? 
                            this.getInformationListedByName()?.slice(this.state.from, this.state.limit).map(h => 
                                
                                <Dog 
                                    order={this.state.order}
                                    key={h.id} 
                                    id={h.id} 
                                    name = {h.name} 
                                    temperament = {h.temperament} 
                                    Image = {h.image} 
                                    life_span = {h.life_span}
                                    weigth={h.weigth}
                                    heightmetric={h.height} 
                                /> 
                            )
                            : null
                    }
                </div>
                    <center className='botoncenter'>
                        <button  className='botonpage' onClick={(e)=> this.calculatePage(e, 'restar')}>back</button>
                        {this.state.current} / {this.props.totalPages}
                        <button className='botonpage' onClick={(e)=> this.calculatePage(e, 'sumar')}>next</button>
                    </center>
            </div>
            
        
        );
    };
};

export const mapStateToProps = (state) => { 
    console.log('dogs',state.DogName)
    return {
        DogsLoaded: state.DogsLoaded,
        totalPages: Math.floor(state?.DogsLoaded?.length / 8)+1,
        DogName:state.DogName
    } 
}


export const mapDispatchToProps = function(dispatch){
    return {
        getAllDogs : () => dispatch(getAllDogs())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dogs);