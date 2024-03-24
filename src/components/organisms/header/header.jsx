import Logo from "../../atoms/logo/logo";
import Navbar from "../../molecules/navbar/navbar";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../utils/hooks/useAuth";
import { useUser } from "../../../utils/context/userContext";
import styles from './header.module.css';
const Header = () => {
    const {user} = useUser();
    const location = useLocation();
    const { isAuthenticated, login, logout } = useAuth();
    const isSignupPage = location.pathname === '/signup';
    const isPortfolioPage = location.pathname.startsWith('/portfolio/');
    if (isSignupPage) {
      return null;
    }
    return (
        <div className={ `${isPortfolioPage ? `${styles.headerContainer} ${styles.portfolioHeader} container my-3` : styles.headerContainer}  p-2` }>
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