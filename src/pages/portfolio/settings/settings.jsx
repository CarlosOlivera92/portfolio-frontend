import React, { useState } from 'react';
import styles from './settings.module.css';
import { useUser } from '../../../utils/context/userContext';
import InfoItem from '../../../components/molecules/info-item/InfoItem';
import TextContent from '../../../components/atoms/text-content/text-content';
import ActionButton from '../../../components/atoms/action-button/action-button';
import Modal from '../../../components/organisms/modal/modal';
import ModalFooter from '../../../components/molecules/modal-footer/modal-footer';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../utils/api/useApi';
import Spinner from '../../../components/atoms/spinner/spinner';
import { useAuth } from '../../../utils/hooks/useAuth';

// Molecular Components
const GeneralSettings = ({ userData }) => {
  
  return (
    <div className={styles.settings}>
        <h2>General</h2>
        <div className={styles.userItem}>
            <TextContent classList={styles.title} text={"Nombre "} />
            <TextContent text={`${userData.firstName} ${userData.lastName}`} />
        </div>
        <div className={styles.userItem}>
            <TextContent classList={styles.title} text={"Nombre de usuario "} />
            <TextContent text={`${userData.username}`} />
        </div>
        <div className={styles.userItem}>
            <TextContent classList={styles.title} text={"Telefono "} />
            <TextContent text={`${userData.phoneNumber}`} />
        </div>
        <div className={styles.userItem}>
            <TextContent classList={styles.title} text={"Email"} />
            <TextContent text={`${userData.email}`} />
        </div>
    </div>
  );
};

const SecuritySettings = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); 
    const {currentUser} = useUser();
    const { isAuthenticated } = useAuth();
    const { loading, error, request, data } = useApi(); 


    const handleOpenDeleteModal = () => {
        setShowModal(prev => !prev)
    }
    const handleDeleteAccount = async () => {
        try {

            const apiEndpoint = `https://solo-resume-backend.onrender.com/api/users/${currentUser.username}`;
            const config = {
                httpVerb: 'DELETE',
                data: null, 
            };
            
            const response = await request(apiEndpoint, config, isAuthenticated);

            if (response.ok) {
                // Eliminar el elemento eliminado de los datos de proyectos
                setShowModal(false);
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('username')

                navigate('/logout');

            } else {
                throw new Error();
            }

        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

  return (
    <div className={styles.settings}>
        <h2>Seguridad</h2>
        <ActionButton name={"Eliminar cuenta"} onClick={handleOpenDeleteModal} type={"button"} classList={styles.btnDanger}/>
        <Modal showModal={showModal} title={"Eliminar cuenta"} isForm={true}>
            <TextContent text={"¿Estás seguro que deseas eliminar tu cuenta? Los datos serán borrados permanentemente y ya no podrás recuperarlos."}/>
            <ModalFooter classList={styles.modalFooter}>
                <ActionButton 
                    name={"Cancelar"}
                    type={"button"}
                    onClick={handleOpenDeleteModal}
                    classList={styles.modalBtn}
                />
                <ActionButton 
                    name={"Confirmar"}
                    type={"button"}
                    onClick={handleDeleteAccount}
                    classList={`${styles.btnDanger}`}
                    disabled={false}
                />
            </ModalFooter>
        </Modal>
        {loading && (
            <Spinner isOpen={loading}/>
        )}
    </div>
  );
};

const AsideMenu = ({ onSelect, selectedOption }) => {
  const handleOptionClick = (option) => {
    onSelect(option);
  };

  return (
    <aside className={styles.asideMenu}>
      <ul className={styles.list}>
        <li className={`${styles.listItem} ${selectedOption === 'general' ? styles.active : ''}`} onClick={() => handleOptionClick('general')}>General</li>
        <li className={`${styles.listItem} ${selectedOption === 'security' ? styles.active : ''}`} onClick={() => handleOptionClick('security')}>Seguridad</li>
      </ul>
    </aside>
  );
};

// Settings Component
const Settings = ({ userData }) => {
  const { currentUser } = useUser();
  const [selectedOption, setSelectedOption] = useState('general');

  return (
    <div className={`${styles.settingsContainer} container`}>
      <AsideMenu onSelect={setSelectedOption} selectedOption={selectedOption} />
      {selectedOption === 'general' && <GeneralSettings userData={currentUser} />}
      {selectedOption === 'security' && <SecuritySettings />}
    </div>
  );
};

export default Settings;
