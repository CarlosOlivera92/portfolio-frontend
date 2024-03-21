import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/home';
import Header from './components/organisms/header/header';
import Signin from './pages/signin/signin';
import Singup from './pages/signup/signup';
import ForgotPassword from './pages/forgot-password/forgotpassword';
import ResetPassword from './pages/reset-password/resetpassword';
import Logout from './pages/logout/logout';
import { AuthProvider } from './utils/context/authProvider';
import history from './utils/context/history';
import Portfolio from './pages/portfolio/portfolio';
import  { UserProvider }  from './utils/context/userProvider';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <UserProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Singup />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} />
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/portfolio/:username/*' element={<Portfolio/>}/>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

