import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

import styles from './DropdownUserMenu.module.css'; 
import Profile from '../../molecules/profile/Profile';
import defaultProfilePic from '../../../../src/assets/img/defaultProfilePic.jpg';
import { useUser } from '../../../utils/context/userContext';

const DropdownUserMenu = ({ user, username, path }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUserProfilePic } = useUser();
    const profilePicUrl = currentUserProfilePic ? currentUserProfilePic : defaultProfilePic;
    const {currentUser} = useUser();
    // Ref para el menú desplegable y para la animación de GSAP
    const dropdownMenuRef = useRef(null);
    const menuAnimationRef = useRef(null);

    useEffect(() => {
        const menuUp = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        const menuDown = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        const menuItems = dropdownMenuRef.current.querySelectorAll("li");

        menuAnimationRef.current = gsap.timeline({
          paused: true,
          defaults: { duration: 0.2, ease: "power2.inOut" }
        })
          .to(dropdownMenuRef.current, { clipPath: menuUp, visibility: "hidden" }, 0) 
          .to(dropdownMenuRef.current, { clipPath: menuDown, visibility: "visible" });

        // Animación de los elementos del menú
        menuAnimationRef.current.fromTo(
            menuItems,
            { opacity: 0, y: "0.5em" }, // Configuración inicial
            { opacity: 1, y: "0em", stagger: 0.1 } // Configuración final
        );

        // Event listener para cerrar el menú cuando se hace clic fuera de él
        const handleClickOutside = (event) => {
            if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            menuAnimationRef.current.play();
        } else {
            menuAnimationRef.current.reverse();
        }
    }, [isOpen]);

    const handleOnClick = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={styles.dropdownUserMenu}  >
            <Profile imageUrl={profilePicUrl} className={styles.profilePic} onClick={handleOnClick}/>
            <nav className={`${styles.dropdownMenu} dropdownMenu`} ref={dropdownMenuRef}>
                <ul className={`${styles.navItems} navItems`}>
                    <li className={`${styles.navItem} navItem`}>
                        <NavLink className={`${path === `/portfolio/${currentUser.username}/settings` ? styles.active : ""}`} to={`portfolio/${username}/settings`}>Configuraciones</NavLink>
                    </li>
                    <li className={`${styles.navItem} ${styles.btnLogout} navItem`}><NavLink to="/logout">Cerrar Sesión</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default DropdownUserMenu;
