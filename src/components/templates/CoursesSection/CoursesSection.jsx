// CoursesSection.js
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './CoursesSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCoursePic from '../../../assets/img/defaultCoursePic.webp';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
import Modal from '../../organisms/modal/modal';
import ModalFooter from '../../molecules/modal-footer/modal-footer';
import ActionButton from '../../atoms/action-button/action-button';
import Form from '../../organisms/form/form';
import { coursesForm } from '../../../utils/form-utils/forms-config';
import TextContent from '../../atoms/text-content/text-content';

const CoursesSection = ({ hasPermissionToEdit, courses }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);

    const menuAnimationRef = useRef(null);
    useEffect(() => {
        const section = sectionRef.current.querySelectorAll(".infoItems");

        menuAnimationRef.current = gsap.timeline({
        paused: true,
        defaults: { duration: .3, ease: "power4.inOut" }
        })
        .to(sectionRef.current, {  height:"auto"  }, 0) 
        .to(sectionRef.current, { height:"auto" },0.4);
        
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

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    

    const handleDeleteItem = () => {
        console.log("Elemento eliminado:", selectedItemToDelete);
        setIsModalOpen(false);
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
        <section className={`${styles.coursesInfo} coursesInfo`} ref={sectionRef}>
            <div className={`${styles.actionsContainer}`}>
                <h2 className={styles.title}>Cursos</h2>
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
                {isOpen && courses && courses.map((course, index) => (
                    <div key={index} className={`${styles.infoItem} infoItem`}>
                        <InfoItem 
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
            <Modal showModal={isModalOpen} title={"Editar información educativa"} closeModal={toggleModal} isForm={true}>
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
                            <Form fields={coursesForm} />
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
                                disabled={true}
                            />
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </section>
    );
};

export default CoursesSection;
