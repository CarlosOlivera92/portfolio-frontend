import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './CertificationsSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCertificationPic from '../../../assets/img/defaultCertificationPic.jpg';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import Modal from '../../organisms/modal/modal';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import Form from '../../organisms/form/form';
import { certificatesForm } from '../../../utils/form-utils/forms-config';
import TextContent from '../../atoms/text-content/text-content';
import { useApi } from '../../../utils/api/useApi';
import { useUser } from '../../../utils/context/userContext';
import { useAuth } from '../../../utils/hooks/useAuth';
import Toast from '../../organisms/toast/toast';
import Spinner from '../../atoms/spinner/spinner';

const CertificationsSection = ({ hasPermissionToEdit, certifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewCertification, setIsNewCertification] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();
    const [certificationsData, setCertificationsData] = useState(certifications);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorApi, setErrorApi] = useState();

    useEffect(() => {
        const section = sectionRef.current.querySelectorAll(".infoItems");
        const menuItem = sectionRef.current.querySelectorAll(".infoItem");

        menuAnimationRef.current = gsap.timeline({
          paused: true,
          defaults: { duration: .3, ease: "power4.inOut" }
        })
          .to(sectionRef.current, {  height:"auto"  }, 0) 
          .to(sectionRef.current, { height:"auto" },0.4);

        menuAnimationRef.current.fromTo(
            section,
            { opacity: 0, y: "0.5em" },
            { opacity: 1, y: "1em", stagger: 0.1 }
        ,0.4);

    }, []);

    useEffect(() => {
        if (isOpen) {
            menuAnimationRef.current.play();
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });

        } else {
            menuAnimationRef.current.reverse();
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });

        }
    }, [isOpen, user]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const toggleNewCertificationModal = () => {
        setIsNewCertification(prev => !prev);
    };

    const toggleEditModal = () => {
        setIsEditModalOpen(prev => !prev);
    };
    
    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(prev => !prev);
    };
    // Funciones para controlar la visibilidad del toast
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    const handleDeleteItem = async () => {
        setShowToast(true);
        try {
            if (!selectedItemToDelete) {
                console.error("No se ha seleccionado ningún elemento para eliminar.");
                return;
            }
            const apiEndpoint = `http://localhost:8080/api/certifications/${user.username}/${selectedItemToDelete.itemId}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setErrorApi(false);
                setMessage("¡Elemento eliminado!");
                const updatedCertifications = certificationsData.filter(item => item.id !== selectedItemToDelete.itemId);
                setCertificationsData(updatedCertifications);
    
                setIsDeleteModalOpen(false);
            }

        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error intentando eliminar el elemento seleccionado.");
            console.error("Error al eliminar el elemento:", error);
        }
    };

    const handleFormSubmit = async (formData) => {
        setShowToast(true);
        try {
            const apiEndpoint = `http://localhost:8080/api/certifications/${user.username}`;
            const config = {
                httpVerb: 'POST',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setErrorApi(false);
                setMessage("¡Nuevo elemento agregado!");
                const newResponse = await response.json();
                const newCertification = { ...newResponse, id: newResponse.id };
                setCertificationsData(prevData => [...prevData, newCertification]);
                setIsNewCertification(false); // Cerrar el modal después de enviar el formulario
            } else {
                throw new Error("Error al crear el nuevo certificado");
            }
        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error intentando crear el nuevo elemento.");
            console.error("Error al crear el nuevo certificado: ", error);
        }
    };

    const handleFormEditSubmit = async (formData) => {
        setShowToast(true);
        try {
            const apiEndpoint = `http://localhost:8080/api/certifications/${user.username}/${selectedItem.itemId}`;
            const config = {
                httpVerb: 'PUT',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setErrorApi(false);
                setMessage("¡Datos actualizados!");
                const newResponse = await response.json();
                const updatedCertification = { ...newResponse, id: newResponse.id };
                setCertificationsData(prevData => prevData.map(item => {
                    if (item.id === updatedCertification.id) {
                        return updatedCertification;
                    }
                    return item;
                }));
                setIsEditModalOpen(false);
            } else {

                throw new Error("Error al editar la información del curso");
            }
        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error tratando de actualizar su información.");
            console.error("Error al editar la información del curso:", error);
        }
    };

    const handleEditItem = async (item, isDelete = false) => {        
        if (isDelete) {
            setSelectedItem(null);
            setSelectedItemToDelete(item);
            setIsDeleteModalOpen(true);
        } else {
            setSelectedItemToDelete(null);
            setSelectedItem(item);
            setIsEditModalOpen(true);
        }
    };

    return (
        <section className={`${styles.certificationsInfo} certificationsInfo`} ref={sectionRef}>
            {loading && (
                <Spinner isOpen={loading} />
            )}
            <div className={styles.actionsContainer} >
                <h2 className={styles.title}>Certificados</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} onClick={toggleNewCertificationModal}/>
                    )}
                </div>
            </div>
            <div className={`${styles.infoItems} infoItems`} ref={infoItemsContainerRef}>
                {isOpen && certificationsData && certificationsData.map((certification, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
                            itemId={certification.id}
                            imgSrc={certification.certificationPic ? certification.certificationPic : defaultCertificationPic} 
                            title={certification.degree} 
                            links={[{ pageName: "certification", href: certification.certificationUrl }]}
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={(item) => handleEditItem(item)} 
                            onDelete={(item) => handleEditItem(item, true)}
                        />
                    </div>
                ))}
            </div>
            {/* Modal para agregar nuevo curso */}
            <Modal showModal={isNewCertification} title={"Agregar nuevo certificado"} closeModal={toggleNewCertificationModal} isForm={true}>
                <Form fields={certificatesForm} onSubmit={handleFormSubmit} toggleModal={toggleNewCertificationModal}/>
            </Modal>
            {/* Modal para editar el curso*/}
            <Modal showModal={isEditModalOpen} title={"Editar información del certificado"} isForm={true}>
                {selectedItem && (
                    <>
                        <InfoItem 
                            itemId={selectedItem.id}
                            title={selectedItem.title} 
                            subtitle={selectedItem.subtitle}
                            startDate={selectedItem.startDate}
                            endDate={selectedItem.endDate} 
                            classList={styles.modalInfoItem}
                        />
                        <Form fields={certificatesForm} onSubmit={handleFormEditSubmit} toggleModal={toggleEditModal}/>
                    </>
                )}
            </Modal>
            {/* Modal para eliminar un curso */}
            <Modal showModal={isDeleteModalOpen} title={"Eliminar certificado"} isForm={true}>
                {selectedItemToDelete && (
                    <>
                        <TextContent text={"¿Está seguro que desea eliminar este elemento?"}/>
                        <ModalFooter classList={styles.modalFooter}>
                            <ActionButton 
                                name={"Cancelar"}
                                type={"button"}
                                onClick={toggleDeleteModal}
                                classList={styles.modalBtn}
                            />
                            <ActionButton 
                                name={"Confirmar"}
                                type={"button"}
                                onClick={handleDeleteItem}
                                classList={`${styles.modalBtn} ${styles.modalBtnDanger}`}
                                disabled={false}
                            />
                        </ModalFooter>
                    </>
                )}
            </Modal>
            <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>
        </section>
    );
};

export default CertificationsSection;
