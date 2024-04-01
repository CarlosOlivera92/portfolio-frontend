import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import { useUser } from '../../../utils/context/userContext';
import styles from './navbar.module.css';
import DropdownUserMenu from '../../organisms/DropdownUserMenu/DropdownUserMenu';
import { useTheme } from '../../../utils/context/themeContext';
import { useState } from 'react';
const Navbar = ({isAuthenticated, username}) => {
    const {currentUser} = useUser();
    const location = useLocation();
    const path = location.pathname;
    const { darkTheme, toggleTheme } = useTheme();

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
                {isAuthenticated && currentUser ? (
                    <>
                        <DropdownUserMenu user={currentUser} username={username} path={path} />
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