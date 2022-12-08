import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import { useState, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import { Welcome } from './components/Welcome';
import { Favorites } from './components/Favorites';
import { New } from './components/New';



function App() {

  const location = useLocation()


  return (
    <div className="App">
      {location.pathname === '/' ? null : <Nav />}
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path= '/home' element={<Home/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/recipe' element={<New/>}/>
      </Routes>
    </div>
  );
}

export default App;
