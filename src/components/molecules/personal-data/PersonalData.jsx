import { useState } from 'react';
import EditIcon from "../../atoms/edit-icon/EditIcon";
import TextContent from "../../atoms/text-content/text-content";
import ContactInfo from "../contact-info/ContactInfo";
import styles from './PersonalData.module.css';
import Modal from '../../organisms/modal/modal';

const PersonalData = ({ user, userInfo, hasPermissionToEdit }) => {
    const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState(false);

    const toggleContactInfoModal = () => {
        setIsContactInfoModalOpen(!isContactInfoModalOpen);
    };

    return (
        <div className={styles.personalData}>
            <div className={`name ${hasPermissionToEdit ? 'd-flex flex-row justify-content-between' : ''}`}>
                <h1>{user.firstName} {user.lastName}</h1>
                {hasPermissionToEdit && <EditIcon classList={styles.editIcon} />}
            </div>
            <h2>{ userInfo ? userInfo.jobPosition : ""}</h2>
            <TextContent text={ userInfo ? userInfo.address : ""} />
            <div className="about-me">
                <TextContent text={ userInfo ? userInfo.aboutMe : ""} />
                {/* Abrir el modal al hacer clic en el enlace */}
                <p className={styles.actionButton} onClick={toggleContactInfoModal}>Información de contacto</p>
            </div>
            {userInfo && (
                <Modal
                title="Información de contacto"
                showModal={isContactInfoModalOpen}
                closeModal={toggleContactInfoModal}
                >
                    <ContactInfo user={user} userInfo={userInfo} />
                </Modal>
            )}
        </div>
    );
};

export default PersonalData;