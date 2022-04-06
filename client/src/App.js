import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buscador from './components/Buscador/buscador';
import LandingPage from './components/LandingPage/landingPage';
import CreateDog from './components/createDog/createDog';
import SearchDog from './components/SearchDog/SearchDog';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/home" element={<Buscador/>} />
        <Route path="/Home/createDog" element={<CreateDog/>} />
        <Route path="/SearchDog" element={<SearchDog/>} />
        
      </Routes>
    </BrowserRouter>
);



  
}

export default App;
