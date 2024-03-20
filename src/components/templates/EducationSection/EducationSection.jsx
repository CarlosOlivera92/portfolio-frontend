const EducationSection = ({hasPermissionToEdit, educationalBackground}) => {
    return ( 
        <section className="educational-info p-4">
                <div className="actions">
                    <h2 className="section-title">Experiencia educativa</h2>
                    <div className="buttons">
                        <div className="action-dropdown" style={{ cursor: 'pointer' }}>
                            <i className={`fas`} />
                        </div>
                        {hasPermissionToEdit && (
                            <div className="edit-icon">
                                <i className={`fas fa-plus`} />
                            </div>
                        )}
                    </div>

                </div>

                <div>
                    <div className={`education p-3 `}>
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
                    </div>
                </div>
            </section>
    );
} 
export default EducationSection;