import { NavLink, useLocation } from 'react-router-dom';
import './styles.css';
import { useAuth } from '../../utils/hooks/useAuth';
import { useUser } from '../../utils/context/userContext';
const Home = () => {
    const {isAuthenticated} = useAuth();
    const {currentUser} = useUser();
    return (
        <main className='home'>
            <section className='hero container-fluid '>
                <div className="title">
                    <h1>Profilo - Solo Resume</h1>
                </div>
                <div className="content container">
                    <p>Profilo - Solo Resume es la herramienta esencial para quienes desean crear un currículum vitae profesional y elegante. Olvídate de las distracciones y el desorden, y da la bienvenida a un espacio diseñado exclusivamente para resaltar tu experiencia, habilidades y logros de la manera más efectiva. Con Profilo, tu perfil se convierte en la estrella, permitiéndote impresionar a futuros empleadores o simplemente mostrar tu trayectoria de manera impactante. Simplifica la creación de tu currículum y presenta lo mejor de ti con Profilo - Solo Resume.</p>
                </div>
                <NavLink to={`${isAuthenticated && currentUser ? `/portfolio/${currentUser.username}/personal` : "/signin"}`} className={`button btn`}>Ir a la aplicación</NavLink>
            </section>
        </main>
    )
}
export default Home;