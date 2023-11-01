import Logo from "../../atoms/logo/logo";
import Navbar from "../../molecules/navbar/navbar";
import { useLocation } from 'react-router-dom';

import "./styles.css"
const Header = () => {
    const location = useLocation();

    // Comprueba si la ruta actual es "/signup"
    const isSignupPage = location.pathname === '/signup';
  
    if (isSignupPage) {
      return null; // No renderiza nada si estás en la página de registro
    }
    return (
        <div className="header p-2">
            <Logo/>
            <Navbar></Navbar>
        </div>
    )
}
export default Header;