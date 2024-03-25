import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './ProfessionalSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultProfessionsPic from '../../../assets/img/defaultProfessionPic.jpg';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import { experienceForm } from '../../../utils/form-utils/forms-config';
import Modal from '../../organisms/modal/modal';
import Form from '../../organisms/form/form';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import TextContent from '../../atoms/text-content/text-content';
import { useApi } from '../../../utils/api/useApi';
import { useUser } from '../../../utils/context/userContext';
import { useAuth } from '../../../utils/hooks/useAuth';

const ProfessionalSection = ({ hasPermissionToEdit, professions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const [professionsData, setProfessionsData] = useState(professions); 

    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();
    useEffect(() => {
        const section = sectionRef.current.querySelectorAll(".infoItems");

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
            const apiEndpoint = `http://localhost:8080/api/professional/${user.username}/item/${selectedItemToDelete.itemId}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);
            console.log("Respuesta de la API:", response);
            console.log(response.ok)
            if (response.ok) {
                // Eliminar el elemento eliminado de los datos de proyectos
                const updatedProfessions = professionsData.filter(item => item.id !== selectedItemToDelete.itemId);
                setProfessionsData(updatedProfessions);

                setIsModalOpen(false);
            } else {
                throw new Error();
            }

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
        <section className={`${styles.professionalInfo} professionalInfo`} ref={sectionRef}>
            <div className={`${styles.actionsContainer}`}  ref={infoItemsContainerRef}>
                <h2 className={styles.title}>Experiencia laboral</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} />
                    )}
                </div>
            </div>
            <div className={`${styles.infoItems} infoItems`}>
                {isOpen && professions && professionsData.map((profession, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
                            itemId={profession.id}
                            imgSrc={profession.companyPicture ? profession.companyPicture : defaultProfessionsPic} 
                            title={profession.jobTitle} 
                            subtitle={profession.companyName} 
                            startDate={profession.startDate} 
                            endDate={profession.endDate} 
                            description={profession.summary} 
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={(item) => handleEditItem(item)} 
                            onDelete={(item) => handleEditItem(item, true)}
                        />
                    </div>
                ))}
            </div>
            <Modal showModal={isModalOpen} title={"Editar información profesional"} closeModal={toggleModal} isForm={true}>
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
                            <Form fields={experienceForm} />
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
                                onClick={ selectedItemToDelete ? handleDeleteItem : handleDeleteItem }
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

export default ProfessionalSection;
