import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import {Routes, Route, useLocation, NavLink} from 'react-router-dom'
import Welcome  from './components/Welcome';
import { Favorites } from './components/Favorites';
import { New } from './components/New';
import Detail from './components/Detail';
import Master from './components/Master';
import FilterSort from './components/FilterSort';
import { Error } from './components/Error';
import { Diets } from './components/Diets';


function App() {

  const location = useLocation()

  return (
    <div className="App">
      {location.pathname === '/' ? null : <Nav />}
      <Routes>
        <Route path='/' element={<Master><Welcome/></Master>}/>
        <Route path='/home' element={<Master><Home/></Master>}/>
        <Route path='/favorites' element={<Master><Favorites/></Master>}/>
        <Route path='/recipe' element={<Master><New/></Master>}/>
        <Route path='/detail/:id' element={<Master><Detail/></Master>}/>
        <Route path='/search' element={<Master><FilterSort/></Master>}/>
        <Route path='/diets' element={<Master><Diets/></Master>} />
        <Route path='*' element={<Master><Error/></Master>} />
      </Routes>
    </div>
  );
}

export default App;
