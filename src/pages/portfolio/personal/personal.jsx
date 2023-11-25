import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../../../utils/api/useApi";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useEffect } from "react";
const PersonalArea = () => {
    const location = useLocation();
    const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);
    const { isAuthenticated } = useAuth();
    const config = {
        httpVerb: "POST",
        data: location.pathname
    };
    const { loading, error, request, data } = useApi();

    const hasEditPermission = async (endpoint) => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
                setHasPermissionToEdit(true);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
        } catch (error) {
            if (error.status === 500) {
                console.log(error)
            } else if (error.status === 403) {
                console.log(error)
            }
        }
    };
    const [isOpen, setIsOpen] = useState({
        experience: false,
        education: false,
        courses: false,
        certificates: false,
        projects: false
    });

    const toggleDropdown = (section) => {
        setIsOpen(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };
    useEffect(() => {
        hasEditPermission(`http://localhost:8080/api/check-permission/edit-profile`);
    }, []);
    return (
        <div className="container">
            <section className="user-info">
                <div className="row">
                    <div className="col-12">
                        <div className="banner">
                            <img src="https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg" alt="" />
                            {hasPermissionToEdit && (
                                <div className="edit-icon">
                                    <i className={`fas fa-pencil-alt`} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="profile-pic">
                            <img src="https://thumbs.dreamstime.com/b/profile-portrait-half-turned-orange-hair-girl-look-camera-wear-basic-outfit-isolated-blue-color-background-profile-portrait-236036535.jpg" alt="" />
                            {hasPermissionToEdit && (
                                <div className="edit-icon">
                                    <i className={`fas fa-pencil-alt`} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xs-12">
                        <div className="personal-data">

                            <div className={`name ${hasPermissionToEdit ? 'd-flex flex-row justify-content-between' : '' }`}>
                                <h1>Melina Elizabeth Herrera</h1>
                                {hasPermissionToEdit && (
                                    <div className="edit-icon">
                                        <i className={`fas fa-pencil-alt`} />
                                    </div>
                                )}
                            </div>
                            <h2>Especialista en Comunicación Estratégica</h2>
                            <p className="my-3">Madrid, España</p>
                            <div className="about-me">
                                <p>¡Hola! Soy Melina Elizabeth Herrera, una comunicadora apasionada de Madrid, España. Con una trayectoria en la creación de contenido inspirador y significativo que conecta con la audiencia. Me encanta contar historias que cautivan y motivan a la acción. Siempre en busca de nuevas oportunidades para colaborar y seguir explorando el mundo de la comunicación. ¡Conéctemos! <a href="#">Información de contacto</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="professional-info p-4">
                <div className="actions">
                    <h2 onClick={() => toggleDropdown('experience')} className="section-title">Experiencia laboral</h2>
                    <div className="buttons">
                        <div className="action-dropdown" onClick={() => toggleDropdown('experience')} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${isOpen['experience'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                {isOpen['experience'] && (
                    <div className={`profession p-3 ${isOpen['experience'] ? 'expanding-section' : 'collapsing-section'}`}>
                        <div className="profession-item col row">
                            <div className="img col-md-4 col-12">
                                <img src="https://yt3.googleusercontent.com/ytc/APkrFKb-xyOsbhLer4kFGptIlIDxJAkgy-MUpcTjL4pB=s900-c-k-c0x00ffffff-no-rj" alt="" />
                            </div>
                            <div className="content col-md-8 col-12">
                                <div className="title">
                                    <p className="h5">Manager de Comunicación</p>
                                    {hasPermissionToEdit && (
                                        <div className="icons d-flex flex-row">
                                            <div className="edit-icon">
                                                <i className={`fas fa-pencil-alt`} />
                                            </div>
                                            <div className="edit-icon">
                                                <i className={`fas fa-trash-alt`} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="h6">TVSpain</p>
                                <p>Desde 2020 | Hasta 2023</p>
                                <p>Supervisión y gestión de estrategias de comunicación para programas televisivos.</p>
                            </div>
                        </div>
                        <div className="profession-item col row">
                            <div className="img col-md-4 col-12">
                                <img src="https://guia.devenado.ar/contenidos/agencia12465.png" alt="" />
                            </div>
                            <div className="content col-md-8 col-12">
                                <div className="title">
                                    <p className="h5">Ejecutivo de Cuentas</p>
                                    {hasPermissionToEdit && (
                                        <div className="icons d-flex flex-row">
                                            <div className="edit-icon">
                                                <i className={`fas fa-pencil-alt`} />
                                            </div>
                                            <div className="edit-icon">
                                                <i className={`fas fa-trash-alt`} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="h6">Agencia de Publicidad XYZ</p>
                                <p>Desde 2018 | Hasta 2019</p>
                                <p>Colaboré en campañas publicitarias, gestioné relaciones con clientes y coordiné la ejecución de proyectos creativos.</p>
                            </div>
                        </div>
                        
                        <div className="profession-item col row">
                            <div className="img col-md-4 col-12">
                                <img src="https://yt3.googleusercontent.com/ytc/APkrFKYPKslxczabNENoLKzJmEhK2ZddWW-HF58L74GdIA=s900-c-k-c0x00ffffff-no-rj" alt="" />
                            </div>
                            <div className="content col-md-8 col-12">
                                <div className="title">
                                    <p className="h5">Analista de Datos</p>
                                    {hasPermissionToEdit && (
                                        <div className="icons d-flex flex-row">
                                            <div className="edit-icon">
                                                <i className={`fas fa-pencil-alt`} />
                                            </div>
                                            <div className="edit-icon">
                                                <i className={`fas fa-trash-alt`} />
                                            </div>
                                        </div>
                                    )}                                    
                                </div>
                                <p className="h6">Agencia de Marketing Digital ABC</p>
                                <p>Desde 2017 | Hasta 2018</p>
                                <p>Analicé y visualicé datos para identificar tendencias del mercado, optimicé estrategias de marketing y colaboré en la toma de decisiones basadas en datos.</p>
                            </div>
                        </div>
                        
                        
                        {/* Agrega más información de trabajo aquí */}
                    </div>
                )}
            </section>
            <section className="educational-info p-4">
                <div className="actions">
                    <h2 onClick={() => toggleDropdown('education')} className="section-title">Experiencia educativa</h2>
                    <div className="buttons">
                        <div className="action-dropdown" onClick={() => toggleDropdown('education')} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${isOpen['education'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                {isOpen['education'] && (
                    <div>
                        <div className={`education p-3 ${isOpen['education'] ? 'expanding-section' : 'collapsing-section'}`}>
                            <div className="education-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://www.kaiciid.org/sites/default/files/styles/person_263_268/public/logoucm_big1.jpg.webp?itok=NWGQtav9" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Universidad Complutense de Madrid</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Licenciatura en Comunicación Audiovisual</p>
                                    <p>Desde 2015 | Hasta 2019</p>
                                    <p>Estudios enfocados en la producción audiovisual, narrativa visual y teoría de la comunicación.</p>
                                </div>
                            </div>
                            <div className="education-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://yt3.googleusercontent.com/FZlD0IO_JsKGWw9hPNZviGMtfTZFOtF4ReUTKrKdaIW92GzVrLOudSm-VIQawGiY0VQtjs0e0Q=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                   <div className="title">
                                        <p className="h5">IE Business School</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Master en Marketing Digital</p>
                                    <p>Desde 2020 | Hasta 2021</p>
                                    <p>Programa de postgrado centrado en estrategias digitales, análisis de datos y marketing online.</p>
                                </div>
                            </div>
                            {/* Agrega más información de trabajo aquí */}
                        </div>
                    </div>
                )}
            </section>
            <section className="courses-info p-4">
                <div className="actions">
                    <h2 onClick={() => toggleDropdown('courses')} className="section-title">Cursos</h2>
                    <div className="buttons">
                        <div className="action-dropdown" onClick={() => toggleDropdown('courses')} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${isOpen['courses'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                {isOpen['courses'] && (
                    <div>
                        <div className={`courses p-3 ${isOpen['courses'] ? 'expanding-section' : 'collapsing-section'}`}>
                            <div className="courses-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://play-lh.googleusercontent.com/qq5__wITsoCx2kUK8TqVW2-8UDRuxET9kCzPzAPHad8umXiHRF2N0tZKuLezd0tiBQg" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Coursera</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Marketing Digital Avanzado</p>
                                    <p>Desde 2020 | Hasta 2020</p>
                                    <p>Curso avanzado sobre estrategias de marketing digital, SEO, SEM y análisis de métricas.</p>
                                </div>
                            </div>
                            <div className="courses-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://s.udemycdn.com/meta/default-meta-image-v2.png" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Udemy</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Diseño Gráfico y Comunicación Visual</p>
                                    <p>Desde 2019 | Hasta 2019</p>
                                    <p>Introducción al diseño gráfico, composición visual y herramientas de diseño.</p>
                                </div>
                            </div>
                            <div className="courses-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://yt3.googleusercontent.com/ytc/AL5GRJXcJfnAynQHdcEZHKPSvSmYwdQMo_rACziRY37cqbQ=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">LinkedIn Learning</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Redes Sociales para Profesionales</p>
                                    <p>Desde 2018 | Hasta 2018</p>
                                    <p>Estrategias efectivas para el uso profesional de redes sociales, construcción de marca personal y gestión de contenido.</p>
                                </div>
                            </div>
                            <div className="courses-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fuslGxJYS22IhIRJjBpJ" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Google Academy for Ads</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Google Analytics</p>
                                    <p>Desde 2017 | Hasta 2017</p>
                                    <p>Certificación en la comprensión y uso avanzado de Google Analytics para análisis de datos web.</p>
                                </div>
                            </div>
                            {/* Agrega más información de trabajo aquí */}
                        </div>
                    </div>
                )}
            </section>
            <section className="certificates-info p-4">
                <div className="actions">
                    <h2 onClick={() => toggleDropdown('certificates')} className="section-title">Certificados</h2>
                    <div className="buttons">
                        <div className="action-dropdown" onClick={() => toggleDropdown('certificates')} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${isOpen['certificates'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                {isOpen['certificates'] && (
                    <div>
                        <div className={`certificates p-3 ${isOpen['certificates'] ? 'expanding-section' : 'collapsing-section'}`}>
                            <div className="certificates-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fuslGxJYS22IhIRJjBpJ" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Google Academy for Ads</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Google Analytics</p>
                                    <a href="#">Link al certificado</a>
                                </div>
                            </div>
                            <div className="certificates-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://play-lh.googleusercontent.com/qq5__wITsoCx2kUK8TqVW2-8UDRuxET9kCzPzAPHad8umXiHRF2N0tZKuLezd0tiBQg" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Coursera</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Marketing Digital Avanzado</p>
                                    <a href="#">Link al certificado</a>
                                </div>
                            </div>
                            <div className="certificates-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://s.udemycdn.com/meta/default-meta-image-v2.png" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Udemy</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Diseño Gráfico y Comunicación Visual</p>
                                    <a href="#">Link al certificado</a>
                                </div>
                            </div>
                            <div className="certificates-item col row">
                                <div className="img col-md-4 col-12">
                                    <img src="https://yt3.googleusercontent.com/ytc/AL5GRJXcJfnAynQHdcEZHKPSvSmYwdQMo_rACziRY37cqbQ=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                </div>
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">LinkedIn Learning</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Redes Sociales para Profesionales</p>
                                    <a href="#">Link al certificado</a>
                                </div>
                            </div>

                            {/* Agrega más información de trabajo aquí */}
                        </div>
                    </div>
                )}
            </section>
            <section className="projects-info p-4">
                <div className="actions">
                    <h2 onClick={() => toggleDropdown('projects')} className="section-title">Proyectos</h2>
                    <div className="buttons">
                        <div className="action-dropdown" onClick={() => toggleDropdown('projects')} style={{ cursor: 'pointer' }}>
                            <i className={`fas ${isOpen['projects'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                {isOpen['projects'] && (
                    <div>
                        <div className={`projects p-3 ${isOpen['projects'] ? 'expanding-section' : 'collapsing-section'}`}>
                            <div className="projects-item col">
                                <div className="content col-md-8 col-12">
                                    <div className="title">
                                        <p className="h5">Nombre del proyecto</p>
                                        {hasPermissionToEdit && (
                                            <div className="icons d-flex flex-row">
                                                <div className="edit-icon">
                                                    <i className={`fas fa-pencil-alt`} />
                                                </div>
                                                <div className="edit-icon">
                                                    <i className={`fas fa-trash-alt`} />
                                                </div>
                                            </div>
                                        )}    
                                    </div>
                                    <p className="h6">Empresa o Freelance</p>
                                    <a href="#">Link al proyecto</a>
                                </div>
                            </div>
                            {/* Agrega más información de trabajo aquí */}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
} 
export default PersonalArea;