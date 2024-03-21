import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useUser } from '../../../utils/context/userContext';
import styles from './navbar.module.css';
import DropdownUserMenu from '../../organisms/DropdownUserMenu/DropdownUserMenu';
const Navbar = ({isAuthenticated, username}) => {
    const {user} = useUser();
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navItems}>
                {username ? (
                    <>
                        <li className={styles.listItem}>
                            <NavLink className={`${path === `/portfolio/${username}/personal` ? styles.active : ""}`} to={`portfolio/${username}/personal`}>Personal</NavLink>
                        </li>
                    </>
                ) : (
                        <li className={styles.listItem}>
                            <NavLink className={`${path === `/` ? styles.active : ""}`} to={`/`}>Inicio</NavLink>
                        </li>
                )}
                {isAuthenticated && user ? (
                    <>
                        <DropdownUserMenu user={user} username={username} path={path} />
                    </>
                ) : (
                    <>
                        <li className={styles.listItem}><NavLink to="/signup">Registrarse</NavLink></li>
                        <li className={styles.listItem}><NavLink to="/signin">Iniciar Sesión</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    )
}
export default Navbar;