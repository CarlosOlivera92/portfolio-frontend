import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './ProjectsSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultProjectPic from '../../../assets/img/defaultProjectsPicture.jpg';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import Modal from '../../organisms/modal/modal';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import Form from '../../organisms/form/form';
import TextContent from '../../atoms/text-content/text-content';
import { useApi } from '../../../utils/api/useApi';
import { useUser } from '../../../utils/context/userContext';
import { useAuth } from '../../../utils/hooks/useAuth';
import { projectsForm } from '../../../utils/form-utils/forms-config';

const ProjectsSection = ({ hasPermissionToEdit, projects }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const menuAnimationRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjectToDelete, setSelectedProjectToDelete] = useState(null);
    const { isAuthenticated } = useAuth();
    const { user } = useUser();
    const [projectsData, setProjectsData] = useState(projects);
    const [formData, setFormData] = useState(null);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const { loading, error, request, data } = useApi(); 

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

    const toggleNewProjectModal = () => {
        setIsNewProjectModalOpen(prev => !prev);
    };

    const toggleEditProjectModal = () => {
        setIsEditProjectModalOpen(prev => !prev);
    };
    
    const toggleDeleteProjectModal = () => {
        setIsDeleteProjectModalOpen(prev => !prev);
    };

    const handleDeleteProject = async () => {
        try {
            if (!selectedProjectToDelete) {
                console.error("No se ha seleccionado ningún proyecto para eliminar.");
                return;
            }
            const apiEndpoint = `http://localhost:8080/api/projects/${user.username}/item/${selectedProjectToDelete.itemId}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                // Eliminar el elemento eliminado de los datos de proyectos
                const updatedProjects = projectsData.filter(item => item.id !== selectedProjectToDelete.itemId);
                setProjectsData(updatedProjects);

                setIsDeleteProjectModalOpen(false);
            } else {
                throw new Error();
            }

        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/projects/${user.username}`;
            const config = {
                httpVerb: 'POST',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const newProject = { ...newResponse, id: newResponse.id };
                setProjectsData(prevData => [...prevData, newProject]);
                setIsNewProjectModalOpen(false); // Cerrar el modal después de enviar el formulario
            } else {
                throw new Error("Error al crear el nuevo proyecto.");
            }
        } catch (error) {
            console.error("Error al crear el nuevo proyecto:", error);
        }
    };

    const handleFormEditSubmit = async (formData) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/projects/${user.username}/item/${selectedProject.itemId}`;
            const config = {
                httpVerb: 'PUT',
                data: formData,
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const newResponse = await response.json();
                const updatedProject = { ...newResponse, id: newResponse.id };
                setProjectsData(prevData => prevData.map(item => {
                    if (item.id === updatedProject.id) {
                        return updatedProject;
                    }
                    return item;
                }));
                setIsEditProjectModalOpen(false);
            } else {
                throw new Error("Error al editar el proyecto.");
            }
        } catch (error) {
            console.error("Error al editar el proyecto:", error);
        }
    };

    const handleEditProjectItem = async (item, isDelete = false) => {        
        if (isDelete) {
            console.log(item)
            setSelectedProject(null);
            setSelectedProjectToDelete(item);
            setIsDeleteProjectModalOpen(true);
        } else {
            setSelectedProjectToDelete(null);
            setSelectedProject(item);
            setIsEditProjectModalOpen(true);
        }
    };

    return (
        <section className={`${styles.projectsInfo} projectsInfo`} ref={sectionRef}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Proyectos</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <>
                            <ActionIcon classList={"fa-plus"} onClick={toggleNewProjectModal} />
                        </>
                    )}
                </div>
            </div>
            <div className={`${styles.infoItems} infoItems`} ref={infoItemsContainerRef}>
                {isOpen && projectsData && projectsData.map((project, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
                            itemId={project.id}
                            imgSrc={project.projectPicture ? project.projectPicture : defaultProjectPic} 
                            title={project.projectName} 
                            links={[
                                { pageName: "github", href: project.projectRepoUrl },
                                { pageName: "project", href: project.projectUrl }
                            ]}
                            description={project.summary} 
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={(item) => handleEditProjectItem(item)} 
                            onDelete={(item) => handleEditProjectItem(item, true)}
                        />
                    </div>
                ))}
            </div>
            {/* Modal para agregar nuevo proyecto */}
            <Modal showModal={isNewProjectModalOpen} title={"Agregar nuevo proyecto"} closeModal={toggleNewProjectModal} isForm={true}>
                <Form fields={projectsForm} onSubmit={handleFormSubmit} toggleModal={toggleNewProjectModal}/>
            </Modal>
            {/* Modal para editar el proyecto */}
            <Modal showModal={isEditProjectModalOpen} title={"Editar información del proyecto"} isForm={true}>
                {selectedProject && (
                    <>
                        <InfoItem 
                            itemId={selectedProject.id}
                            title={selectedProject.title} 
                            subtitle={selectedProject.subtitle}
                            startDate={selectedProject.startDate}
                            endDate={selectedProject.endDate} 
                            classList={styles.modalInfoItem}
                        />
                        <Form fields={projectsForm} onSubmit={handleFormEditSubmit} toggleModal={toggleEditProjectModal}/>
                    </>
                )}
            </Modal>
            {/* Modal para eliminar el proyecto */}
            <Modal showModal={isDeleteProjectModalOpen} title={"Eliminar proyecto"} isForm={true}>
                {selectedProjectToDelete && (
                    <>
                        <TextContent text={"¿Está seguro que desea eliminar este proyecto?"}/>
                        <ModalFooter classList={styles.modalFooter}>
                            <ActionButton 
                                name={"Cancelar"}
                                type={"button"}
                                onClick={toggleDeleteProjectModal}
                                classList={styles.modalBtn}
                            />
                            <ActionButton 
                                name={"Confirmar"}
                                type={"button"}
                                onClick={handleDeleteProject}
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

export default ProjectsSection;

