import { useState, useRef, useEffect } from 'react';
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
const ProfessionalSection = ({ hasPermissionToEdit, professions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const section = sectionRef.current;
        const infoItemsContainer = infoItemsContainerRef.current;
    
        const tl = gsap.timeline({ paused: true })
            .set(infoItemsContainer, { opacity: 0, scaleY: 0, transformOrigin: "top" })
            .to(infoItemsContainer, { opacity: 1, scaleY: 1, duration: 0.5 })
            .to(section, { height: "auto", duration: 0.5 }, "-=0.5");
    
        const reverseTl = tl.reverse();
    
        if (isOpen) {
            tl.play();
        } else {
            reverseTl.play();
        }
    
    }, [isOpen, professions]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };
    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    
    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    return (
        <section className={styles.professionalInfo} ref={sectionRef}>
            <div className={styles.actionsContainer} >
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
            <div className={styles.infoItems} ref={infoItemsContainerRef}>
                {isOpen && professions && professions.map((profession, index) => (
                    <div key={index} className={styles.infoItem}>
                        <InfoItem 
                            imgSrc={profession.companyPicture ? profession.companyPicture : defaultProfessionsPic} 
                            title={profession.jobTitle} 
                            subtitle={profession.companyName} 
                            startDate={profession.startDate} 
                            endDate={profession.endDate} 
                            description={profession.summary} 
                            hasPermissionToEdit={hasPermissionToEdit}
                            onEdit={handleEditItem}
                        />
                    </div>
                ))}
            </div>
            <Modal showModal={isModalOpen} title={"Editar información profesional"} closeModal={toggleModal} isForm={true}>
                {selectedItem && (
                    <>
                        <InfoItem 
                            title={selectedItem.title} 
                            subtitle={selectedItem.subtitle}
                            startDate={selectedItem.startDate}
                            endDate={selectedItem.endDate} 
                            classList={styles.modalInfoItem}
                        />
                        <Form fields={experienceForm} />
                        <ModalFooter >
                            <ActionButton 
                                name={"Cancelar"}
                                type={"submit"}
                                onClick={toggleModal}
                                classname={styles.modalBtn}
                            />
                            <ActionButton 
                                name={"Editar"}
                                type={"submit"}
                                onClick={null}
                                classname={styles.modalBtn}
                                disabled={true}
                            />
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </section>
    );
};

export default ProfessionalSection;
