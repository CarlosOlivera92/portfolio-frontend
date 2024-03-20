const CoursesSection = ({hasPermissionToEdit, courses}) => {
    return (
        <section className="courses-info p-4">
                <div className="actions">
                    <h2 className="section-title">Cursos</h2>
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
                    <div className={`courses p-3`}>
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
                    </div>
                </div>
            </section>
    );
}
export default CoursesSection;