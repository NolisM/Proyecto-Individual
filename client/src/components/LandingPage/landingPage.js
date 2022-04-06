import React from 'react';
//import { NavLink } from 'react-router-dom';
import './landingPage.css'

export default function NavBar() {
    return (
        <div className='landing'>
            <div className='backgroundImg'>
                <center className='content'>
                    
                    <pre className='text' >
                        Welcome 
                        <br/>
                        to the Dogs Page 
                    </pre>
                    <button className='button' href='#'  onClick={()=> window.location.assign('/Home')}>Home</button>
                </center>
                <center>

                <nav >
                </nav>
                </center>
            </div>         
        </div>
    )
}