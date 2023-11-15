import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './pages/home/home';
import Header from './components/organisms/header/header';
import Signin from './pages/signin/signin';
import Singup from './pages/signup/signup';
import ForgotPassword from './pages/forgot-password/forgotpassword';
import ResetPassword from './pages/reset-password/resetpassword';
import history from './utils/context/history';
import {AuthProvider} from './utils/context/authProvider';
import { useAuth } from './utils/hooks/useAuth';
function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Router history={history}>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {!isAuthenticated && <Route path="/signin" element={<Signin />} />}
          <Route path="/signup" element={<Singup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword' element={<ResetPassword/>} />

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
