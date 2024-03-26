import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './EducationALSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultEducationPic from '../../../assets/img/defaultInstitutionPic.png';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import Modal from '../../organisms/modal/modal';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import Form from '../../organisms/form/form';
import { educationForm } from '../../../utils/form-utils/forms-config';
import TextContent from '../../atoms/text-content/text-content';
import { useApi } from '../../../utils/api/useApi';
import { useUser } from '../../../utils/context/userContext';
import { useAuth } from '../../../utils/hooks/useAuth';

const EducationSection = ({ hasPermissionToEdit, educationalBackground }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewEducationModalOpen, setIsNewEducationModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();
    const [educationData, setEducationData] = useState(educationalBackground);
    const [formData, setFormData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const toggleNewEducationModal = () => {
        setIsNewEducationModalOpen(prev => !prev);
    };

    const toggleEditModal = () => {
        setIsEditModalOpen(prev => !prev);
    };
    
    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(prev => !prev);
    };

    const handleDeleteItem = async () => {
        try {
            if (!selectedItemToDelete) {
                console.error("No se ha seleccionado ningún elemento para eliminar.");
                return;
            }
            const apiEndpoint = `http://localhost:8080/api/educational/${user.username}/item/${selectedItemToDelete.itemId}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);
            console.log("Respuesta de la API:", response);
            if (response.ok) {
                const updatedEducationalBackground = educationData.filter(item => item.id !== selectedItemToDelete.itemId);
                setEducationData(updatedEducationalBackground);
    
                setIsDeleteModalOpen(false);
            }

        } catch (error) {
            console.error("Error al eliminar el elemento:", error);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/educational/${user.username}`;
            const config = {
                httpVerb: 'POST',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const newEducation = { ...newResponse, id: newResponse.id };
                setEducationData(prevData => [...prevData, newEducation]);
                setIsNewEducationModalOpen(false); // Cerrar el modal después de enviar el formulario
            } else {
                throw new Error("Error al crear la nueva experiencia educativa.");
            }
        } catch (error) {
            console.error("Error al crear la nueva experiencia educativa:", error);
        }
    };

    const handleFormEditSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/educational/${user.username}/item/${selectedItem.itemId}`;
            const config = {
                httpVerb: 'PUT',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const updatedEducation = { ...newResponse, id: newResponse.id };
                setEducationData(prevData => prevData.map(item => {
                    if (item.id === updatedEducation.id) {
                        return updatedEducation;
                    }
                    return item;
                }));
                setIsEditModalOpen(false);
            } else {
                throw new Error("Error al editar la experiencia educativa.");
            }
        } catch (error) {
            console.error("Error al editar la experiencia educativa:", error);
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
        <section className={`${styles.educationalInfo} educationalInfo`} ref={sectionRef}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Experiencia Educativa</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <>
                            <ActionIcon classList={"fa-plus"} onClick={toggleNewEducationModal} />
                        </>
                    )}
                </div>
            </div>
            <div className={`${styles.infoItems} infoItems`} ref={infoItemsContainerRef}>
                {isOpen && educationData && educationData.map((education, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
                            itemId={education.id}
                            imgSrc={education.institutionPicture ? education.institutionPicture : defaultEducationPic} 
                            title={education.degree} 
                            subtitle={education.institution} 
                            startDate={education.startDate} 
                            endDate={education.endDate} 
                            description={education.focusOfStudies} 
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={(item) => handleEditItem(item)} 
                            onDelete={(item) => handleEditItem(item, true)}
                        />
                    </div>
                ))}
            </div>
            {/* Modal para agregar nueva experiencia educativa */}
            <Modal showModal={isNewEducationModalOpen} title={"Agregar nueva experiencia educativa"} closeModal={toggleNewEducationModal} isForm={true}>
                <Form fields={educationForm} onSubmit={handleFormSubmit} toggleModal={toggleNewEducationModal}/>
            </Modal>
            {/* Modal para editar la experiencia educativa */}
            <Modal showModal={isEditModalOpen} title={"Editar información de la experiencia educativa"} isForm={true}>
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
                        <Form fields={educationForm} onSubmit={handleFormEditSubmit} toggleModal={toggleEditModal}/>
                    </>
                )}
            </Modal>
            {/* Modal para eliminar la experiencia educativa */}
            <Modal showModal={isDeleteModalOpen} title={"Eliminar experiencia educativa"} isForm={true}>
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
        </section>
    );
};

export default EducationSection;
