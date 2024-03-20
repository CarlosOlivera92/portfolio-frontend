const CertificationsSection = ({hasPermissionToEdit, certifications}) => {
    return ( 
        <section className="certificates-info p-4">
            <div className="actions">
                <h2 className="section-title">Certificados</h2>
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
                <div className={`certificates p-3`}>
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
                </div>
            </div>
        </section>
    );
}
export default CertificationsSection;