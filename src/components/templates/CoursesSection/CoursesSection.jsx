import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './CoursesSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCoursePic from '../../../assets/img/defaultCoursePic.webp';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import Modal from '../../organisms/modal/modal';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import Form from '../../organisms/form/form';
import TextContent from '../../atoms/text-content/text-content';
import { useUser } from '../../../utils/context/userContext';
import { useApi } from '../../../utils/api/useApi';
import { useAuth } from '../../../utils/hooks/useAuth';
import { coursesForm } from '../../../utils/form-utils/forms-config';
const CoursesSection = ({ hasPermissionToEdit, courses }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewCoursesModalOpen, setIsNewCoursesModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const { loading, error, request, data } = useApi(); 
    const { user } = useUser();
    const [coursesData, setCoursesData] = useState(courses);
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

    const toggleNewCourseModal = () => {
        setIsNewCoursesModalOpen(prev => !prev);
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
            const apiEndpoint = `http://localhost:8080/api/courses/${user.username}/item/${selectedItemToDelete.itemId}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);
            console.log("Respuesta de la API:", response);
            if (response.ok) {
                const updatedCourses = coursesData.filter(item => item.id !== selectedItemToDelete.itemId);
                setCoursesData(updatedCourses);
    
                setIsDeleteModalOpen(false);
            }

        } catch (error) {
            console.error("Error al eliminar el elemento:", error);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/courses/${user.username}`;
            const config = {
                httpVerb: 'POST',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const newCourse = { ...newResponse, id: newResponse.id };
                setCoursesData(prevData => [...prevData, newCourse]);
                setIsNewCoursesModalOpen(false); // Cerrar el modal después de enviar el formulario
            } else {
                throw new Error("Error al crear el nuevo curso");
            }
        } catch (error) {
            console.error("Error al crear el nuevo curso: ", error);
        }
    };

    const handleFormEditSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/courses/${user.username}/item/${selectedItem.itemId}`;
            const config = {
                httpVerb: 'PUT',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const updatedCourses = { ...newResponse, id: newResponse.id };
                setCoursesData(prevData => prevData.map(item => {
                    if (item.id === updatedCourses.id) {
                        return updatedCourses;
                    }
                    return item;
                }));
                setIsEditModalOpen(false);
            } else {
                throw new Error("Error al editar la información del curso");
            }
        } catch (error) {
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
        <section className={`${styles.coursesInfo} coursesInfo`} ref={sectionRef}>
            <div className={`${styles.actionsContainer}`}>
                <h2 className={styles.title}>Cursos</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} onClick={toggleNewCourseModal}/>
                    )}
                </div>
            </div>
            <div className={`${styles.infoItems} infoItems`} ref={infoItemsContainerRef}>
                {isOpen && courses && coursesData.map((course, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
                            itemId={course.id}
                            imgSrc={course.institutionPicture ? course.institutionPicture : defaultCoursePic} 
                            title={course.courseName} 
                            subtitle={course.institution} 
                            startDate={course.startDate} 
                            endDate={course.endDate} 
                            description={course.focusOfStudies} 
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={(item) => handleEditItem(item)} 
                            onDelete={(item) => handleEditItem(item, true)}
                        />
                    </div>
                ))}
            </div>
            {/* Modal para agregar nuevo curso */}
            <Modal showModal={isNewCoursesModalOpen} title={"Agregar nuevo curso"} closeModal={toggleNewCourseModal} isForm={true}>
                <Form fields={coursesForm} onSubmit={handleFormSubmit} toggleModal={toggleNewCourseModal}/>
            </Modal>
            {/* Modal para editar el curso*/}
            <Modal showModal={isEditModalOpen} title={"Editar información del curso"} isForm={true}>
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
                        <Form fields={coursesForm} onSubmit={handleFormEditSubmit} toggleModal={toggleEditModal}/>
                    </>
                )}
            </Modal>
            {/* Modal para eliminar un curso */}
            <Modal showModal={isDeleteModalOpen} title={"Eliminar curso"} isForm={true}>
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

export default CoursesSection;
