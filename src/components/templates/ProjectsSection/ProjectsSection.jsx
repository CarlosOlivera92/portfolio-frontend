const ProjectsSection = ({hasPermissionToEdit, projects}) => {
    return (
        <section className="projects-info p-4">
            <div className="actions">
                <h2 className="section-title">Proyectos</h2>
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
                <div className={`projects p-3`}>
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
                </div>
            </div>
        </section>
    );
}
export default ProjectsSection;