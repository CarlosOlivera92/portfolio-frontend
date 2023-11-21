import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Navbar = ({isAuthenticated, username}) => {
    const location = useLocation();
    const path = location.pathname;
    return (
        <nav className="navbar">
            <ul className='nav-items list-unstyled list-inline'>
                {username ? (
                    <>
                        <li>
                            <NavLink className={`${path === `/portfolio/${username}/personal` ? "active" : ""}`} to={`portfolio/${username}/personal`}>Personal</NavLink>
                        </li>
                    </>
                ) : (
                    <li><NavLink to={`/`}>Personal</NavLink></li>

                )}
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink className={`${path === `/portfolio/${username}/settings` ? "active" : ""}`} to={`portfolio/${username}/settings`}>Configuraciones</NavLink>
                        </li>
                        <li><NavLink className={"btn-logout"} to="/logout">Cerrar Sesión</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/signup">Registrarse</NavLink></li>
                        <li><NavLink to="/signin">Iniciar Sesión</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    )
}
export default Navbar;