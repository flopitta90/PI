import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import {Routes, Route, useLocation} from 'react-router-dom'
import Welcome  from './components/Welcome';
import { Favorites } from './components/Favorites';
import { New } from './components/New';
import Detail from './components/Detail';
import Master from './components/Master';



function App() {

  const location = useLocation()


  return (
    <div className="App">
      {location.pathname === '/' ? null : <Nav />}
      <Routes>
        <Route path= '/home' element={<Master><Home/></Master>}/>
        <Route path='/favorites' element={<Master><Favorites/></Master>}/>
        <Route path='/recipe' element={<Master><New/></Master>}/>
        <Route path='/detail/:id' element={<Master><Detail/></Master>}/>
        <Route path='/' element={<Master><Welcome/></Master>}/>
      </Routes>
    </div>
  );
}

export default App;
