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

const CertificationsSection = ({ hasPermissionToEdit, certifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();
    const [certificationsData, setCertificationsData] = useState(certifications); // Nuevo estado para almacenar los datos de certificaciones

    useEffect(() => {
        const section = sectionRef.current.querySelectorAll(".infoItems");
        const menuItem = sectionRef.current.querySelectorAll(".infoItem");

        menuAnimationRef.current = gsap.timeline({
          paused: true,
          defaults: { duration: .3, ease: "power4.inOut" }
        })
          .to(sectionRef.current, {  height:"auto"  }, 0) 
          .to(sectionRef.current, { height:"auto" },0.4);

        // Animación de los elementos del menú
        menuAnimationRef.current.fromTo(
            section,
            { opacity: 0, y: "0.5em" }, // Configuración inicial
            { opacity: 1, y: "1em", stagger: 0.1 } // Configuración final
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
    const handleDeleteItem = async () => {
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
            console.log("Respuesta de la API:", response);
            setIsModalOpen(false);

            // Eliminar el elemento eliminado de los datos de certificaciones
            const updatedCertifications = certificationsData.filter(certification => certification.id !== selectedItemToDelete.itemId);
            setCertificationsData(updatedCertifications);
        } catch (error) {
            console.error("Error al eliminar el elemento:", error);
            // Maneja el error de acuerdo a tus necesidades
        }
    };

    const handleEditItem = (item, isDelete = false) => {        
        if (isDelete) {
            setSelectedItem(null);
            setSelectedItemToDelete(item);
            setIsModalOpen(true);
        } else {
            setSelectedItemToDelete(null);
            setSelectedItem(item);
            setIsModalOpen(true);
        }
    };

    return (
        <section className={`${styles.certificationsInfo} certificationsInfo`} ref={sectionRef}>
            <div className={styles.actionsContainer} >
                <h2 className={styles.title}>Certificados</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} />
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
            <Modal showModal={isModalOpen} title={"Editar certificados"} closeModal={toggleModal} isForm={true}>
                {(selectedItem || selectedItemToDelete) && (
                    <>
                        {selectedItem && !selectedItemToDelete && (
                            <InfoItem 
                                title={selectedItem.title} 
                                subtitle={selectedItem.subtitle}
                                startDate={selectedItem.startDate}
                                endDate={selectedItem.endDate} 
                                classList={styles.modalInfoItem}
                            />
                        )}
                        {(selectedItemToDelete && !selectedItem) && (
                            <TextContent text={"¿Está seguro que desea eliminar este elemento?"}/>
                        )}
                        {(selectedItem && !selectedItemToDelete) && (
                            <Form fields={certificatesForm} />
                        )}
                        <ModalFooter classList={styles.modalFooter}>
                            <ActionButton 
                                name={"Cancelar"}
                                type={"submit"}
                                onClick={toggleModal}
                                classList={styles.modalBtn}
                            />
                            <ActionButton 
                                name={selectedItemToDelete ? "Confirmar" : "Editar"}
                                type={"submit"}
                                onClick={handleDeleteItem }
                                classList={selectedItemToDelete ? `${styles.modalBtn} ${styles.modalBtnDanger}` : styles.modalBtn}
                                disabled={false}
                            />
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </section>
    );
};

export default CertificationsSection;
