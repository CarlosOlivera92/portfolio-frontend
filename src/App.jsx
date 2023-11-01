import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './pages/home/home';
import Header from './components/organisms/header/header';
import Signin from './pages/signin/signin';
import Singup from './pages/signup/signup';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Singup/>}/>
      </Routes>
    </Router>
  )
}

export default App
