import './styles.css';

const Home = () => {
    return (
        <main className='home'>
            <section className='hero container-fluid '>
                <div className="title">
                    <h1>Profilo - Solo Resume</h1>
                </div>
                <div className="content container">
                    <p>Profilo - Solo Resume es la herramienta esencial para quienes desean crear un currículum vitae profesional y elegante. Olvídate de las distracciones y el desorden, y da la bienvenida a un espacio diseñado exclusivamente para resaltar tu experiencia, habilidades y logros de la manera más efectiva. Con Profilo, tu perfil se convierte en la estrella, permitiéndote impresionar a futuros empleadores o simplemente mostrar tu trayectoria de manera impactante. Simplifica la creación de tu currículum y presenta lo mejor de ti con Profilo - Solo Resume.</p>
                </div>
                <button type='button' className='button btn'>Ir a la aplicación</button>
            </section>
        </main>
    )
}
export default Home;