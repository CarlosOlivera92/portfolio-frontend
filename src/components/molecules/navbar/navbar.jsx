import { NavLink } from 'react-router-dom';

const Navbar = ({isAuthenticated}) => {
    return (
        <nav className="navbar">
            <ul className='nav-items list-unstyled list-inline'>
                <li><NavLink to="/">Inicio</NavLink></li>
                {isAuthenticated ? (
                    <>
                        <li><NavLink to="#">Configuraciones</NavLink></li>
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