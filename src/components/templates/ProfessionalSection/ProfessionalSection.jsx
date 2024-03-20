const ProfessionalSection = ({hasPermissionToEdit, professions}) => {
    return(
        <section className="professional-info p-4">
            <div className="actions">
                <h2 className="section-title">Experiencia laboral</h2>
                <div className="buttons">
                    <div className="action-dropdown" style={{ cursor: 'pointer' }}>
                        {/*<i className={`fas ${isOpen['experience'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />*/}
                    </div>
                    {hasPermissionToEdit && (
                        <div className="edit-icon">
                            <i className={`fas fa-plus`} />
                        </div>
                    )}
                </div>
            </div>

            <div className={`profession p-3`}>
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
            </div>
        </section>
    );
}
export default ProfessionalSection;