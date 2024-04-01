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
import Spinner from '../../atoms/spinner/spinner';
import Toast from '../../organisms/toast/toast';
const ProfessionalSection = ({ hasPermissionToEdit, professions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewExperienceModalOpen, setIsNewExperienceModalOpen] = useState(false); 
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const [professionsData, setProfessionsData] = useState(professions); 
    const [formData, setFormData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorApi, setErrorApi] = useState();

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
    }, [isOpen]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };
    
    const toggleEditModal = () => {
        setIsEditModalOpen(prev => !prev);
    };
    
    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(prev => !prev);
    };

    // Función para abrir o cerrar el modal de nueva experiencia laboral
    const toggleNewExperienceModal = () => {
        setIsNewExperienceModalOpen(prev => !prev);
    };
    // Funciones para controlar la visibilidad del toast
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    
    const handleDeleteItem = async () => {
        setShowToast(true);
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

            if (response.ok) {
                // Eliminar el elemento eliminado de los datos de proyectos
                setErrorApi(false);
                setMessage("¡Elemento eliminado!");
                const updatedProfessions = professionsData.filter(item => item.id !== selectedItemToDelete.itemId);
                setProfessionsData(updatedProfessions);

                setIsDeleteModalOpen(false);
            } else {
                throw new Error();
            }

        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error intentando eliminarl el elemento seleccionado.");
            console.error("Error al eliminar el elemento:", error);
        }
    };
    // Método para manejar la creación de una nueva experiencia
    const handleCreateExperience = async (formData) => {
        setShowToast(true);
        try {
            const apiEndpoint = `http://localhost:8080/api/professional/${user.username}`;
            const config = {
                httpVerb: 'POST',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setErrorApi(false);
                setMessage("¡Nuevo elemento agregado!");
                const newResponse = await response.json();
                const newExperience = { ...newResponse, id: newResponse.id };
                setProfessionsData(prevData => [...prevData, newExperience]);
                setIsNewExperienceModalOpen(false);
            } else {
                throw new Error("Error al crear la nueva experiencia.");
            }
        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error intentando crear el nuevo elemento.");
            console.error("Error al crear la nueva experiencia:", error);
        }
    };
    const handleEditExperience = async (formData, id) => {
        setShowToast(true);
        try {
            const apiEndpoint = `http://localhost:8080/api/professional/${user.username}/item/${id}`;
            const config = {
                httpVerb: 'PUT',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setErrorApi(false);
                setMessage("¡Datos actualizados!");
                const newResponse = await response.json();
                const updatedExperience = { ...newResponse, id: newResponse.id };
            // Actualizar el elemento existente en professionsData
            setProfessionsData(prevData => prevData.map(item => {
                if (item.id === updatedExperience.id) {
                    return updatedExperience;
                }
                return item;
            }));     
            setIsEditModalOpen(false);
            } else {
                throw new Error("Error al editar la experiencia existente.");
            }
        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error tratando de actualizar su información.");
            console.error("Error al editar la experiencia:", error);
        }
    };
    const handleFormSubmit = (formData) => {
        setFormData(formData);
        if (formData) {
            handleCreateExperience(formData);
        }
    };
    const handleFormEditSubmit = (formData) => {
        const adjustedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
            acc[key] = value === "" ? null : value;
            return acc;
        }, {});
    
        setFormData(adjustedFormData);
        if (adjustedFormData) {
            handleEditExperience(adjustedFormData, selectedItem.itemId);
        }
    }
    const handleEditItem = (item, isDelete = false) => {        
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
        <section className={`${styles.professionalInfo} professionalInfo`} ref={sectionRef}>
            {loading && (
                <Spinner isOpen={loading} />
            )}
            <div className={`${styles.actionsContainer}`}  ref={infoItemsContainerRef}>
                <h2 className={styles.title}>Experiencia laboral</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <>
                            <ActionIcon classList={"fa-plus"} onClick={toggleNewExperienceModal} />
                        </>
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
             {/* Modal para agregar nueva experiencia */}
                <Modal showModal={isNewExperienceModalOpen} title={"Agregar nueva experiencia laboral"} closeModal={toggleNewExperienceModal} isForm={true}>
                    <Form fields={experienceForm} onSubmit={handleFormSubmit} toggleModal={toggleNewExperienceModal}/>
                </Modal>
             {/* Modal para editar la experiencia laboral */}
            <Modal showModal={isEditModalOpen} title={"Editar información de la experiencia laboral"} isForm={true}>
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
                        <Form fields={experienceForm} onSubmit={handleFormEditSubmit} toggleModal={toggleEditModal}/>
                    </>
                )}
            </Modal>
            {/* Modal para eliminar la experiencia laboral */}
            <Modal showModal={isDeleteModalOpen} title={"Eliminar experiencia laboral"} isForm={true}>
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

export default ProfessionalSection;
