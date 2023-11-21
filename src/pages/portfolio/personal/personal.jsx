import { useState } from "react";
const PersonalArea = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="container">
            <section className="user-info">
                <div className="row">
                    <div className="col-12">
                        <div className="banner">
                            <img src="https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="profile-pic">
                            <img src="https://thumbs.dreamstime.com/b/profile-portrait-half-turned-orange-hair-girl-look-camera-wear-basic-outfit-isolated-blue-color-background-profile-portrait-236036535.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xs-12">
                        <div className="personal-data">
                            <h1>Melina Elizabeth Herrera</h1>
                            <h2>Especialista en Comunicación Estratégica</h2>
                            <p>Madrid, España</p>
                            <div className="about-me">
                                <p>¡Hola! Soy Melina Elizabeth Herrera, una comunicadora apasionada de Madrid, España. Con una trayectoria en la creación de contenido inspirador y significativo que conecta con la audiencia. Me encanta contar historias que cautivan y motivan a la acción. Siempre en busca de nuevas oportunidades para colaborar y seguir explorando el mundo de la comunicación. ¡Conéctemos!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="professional-info p-4">
                <div className="actions">
                    <h2 onClick={toggleDropdown} className="section-title">Experiencia laboral</h2>
                    <div className="action-dropdown" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                    </div>
                </div>

                {isOpen && (
                    <div>
                        <div className="profession p-3">
                            <div className="profession-item col">
                                <p>TVSpain</p>
                                <p>Desde 2020 | Hasta 2023</p>
                                <p>Manager de Comunicación</p>
                                <p>Supervisión y gestión de estrategias de comunicación para programas televisivos.</p>
                            </div>
                            {/* Agrega más información de trabajo aquí */}
                        </div>
                    </div>
                )}
            </section>
            <section className="educational-info p-4">
                <h2 className="section-title">Experiencia educativa</h2>
            </section>
            <section className="courses-info p-4">
                <h2 className="section-title">Cursos</h2>
            </section>
            <section className="certificates-info p-4">
                <h2 className="section-title">Certificados</h2>
            </section>
            <section className="certificates-info p-4">
                <h2 className="section-title">Proyectos</h2>
            </section>
        </div>
    )
} 
export default PersonalArea;