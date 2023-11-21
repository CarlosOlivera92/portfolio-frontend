import Logo from "../../atoms/logo/logo";
import Navbar from "../../molecules/navbar/navbar";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../utils/hooks/useAuth";

import "./styles.css"
import { useUser } from "../../../utils/context/userContext";
const Header = () => {
    const {user} = useUser();
    const location = useLocation();
    const { isAuthenticated, login, logout } = useAuth();

    // Comprueba si la ruta actual es "/signup"
    const isSignupPage = location.pathname === '/signup';
    const isPortfolioPage = location.pathname.startsWith('/portfolio/');
    if (isSignupPage) {
      return null; // No renderiza nada si estás en la página de registro
    }
    return (
        <div className={ `${isPortfolioPage ? "header portfolio-header container my-3" : "header"}  p-2` }>
            {user ? (
                <>
                    <Logo/>
                    <Navbar isAuthenticated={isAuthenticated} username={`${user.username}`}></Navbar>
                </>
            ) : (
                <>
                    <Logo/>
                    <Navbar isAuthenticated={isAuthenticated} ></Navbar>
                </> 
            )}

        </div>
    )
}
export default Header;