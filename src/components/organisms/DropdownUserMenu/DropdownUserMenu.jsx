import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DropdownUserMenu.module.css'; // Ajusta el nombre del archivo CSS según corresponda
import Profile from '../../molecules/profile/Profile';

const DropdownUserMenu = ({ user, username, path }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleHover = () => {
        setIsOpen(true);
    };

    const handleLeave = () => {
        setIsOpen(false);
    };
    return (
        <div className={styles.dropdownUserMenu} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <Profile imageUrl={user.userInfo.profilePicUrl} className={styles.profilePic}/>
            {isOpen && (
                <nav className={styles.dropdownMenu}>
                    <ul className={styles.navItems}>
                        <li className={styles.navItem}>
                            <NavLink className={`${path === `/portfolio/${username}/settings` ? styles.active : ""}`} to={`portfolio/${username}/settings`}>Configuraciones</NavLink>
                        </li>
                        <li className={`${styles.navItem} ${styles.btnLogout}`}><NavLink to="/logout">Cerrar Sesión</NavLink></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default DropdownUserMenu;
