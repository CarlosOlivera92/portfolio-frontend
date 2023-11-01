import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className='nav-items list-unstyled list-inline'>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/signup">Registrarse</NavLink></li>
                <li><NavLink to="/signin">Iniciar Sesión</NavLink></li>
            </ul>
        </nav>
    )
}
export default Navbar;