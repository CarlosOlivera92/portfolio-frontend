import Banner from "../../molecules/banner/Banner";
import PersonalData from "../../molecules/personal-data/PersonalData";
import Profile from "../../molecules/profile/Profile";
import defaultProfilePic from '../../../../src/assets/img/defaultProfilePic.jpg';
import styles from './UserInfo.module.css';
import { useEffect, useState } from "react";
import Form from "../form/form";
import Modal from "../modal/modal";
import { bannerForm } from "../../../utils/form-utils/forms-config";
import { profilePicUrl } from "../../../utils/form-utils/forms-config";
import { personalDataForm } from "../../../utils/form-utils/forms-config";
import { useApi } from "../../../utils/api/useApi";
import { useAuth } from "../../../utils/hooks/useAuth";
const UserInfo = ({ user, userInfo, hasPermissionToEdit, updateUserInfo  }) => {
    const defaultImageUrl = "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"; 
    const bannerPicUrl = userInfo.bannerPicUrl != null ? userInfo.bannerPicUrl : defaultImageUrl;
    const profilePic = userInfo.profilePicUrl != null ? userInfo.profilePicUrl : defaultProfilePic;
    console.log(userInfo)
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, error, request, data } = useApi(); 
    const { isAuthenticated } = useAuth();
    const [isDataEdited, setIsDataEdited] = useState(false); 
    let modalContent = null;
    let modalTitle = "";
    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    
    
    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            for (const key in formData) {
                if (formData.hasOwnProperty(key) && formData[key] === "") {
                    formData[key] = null;
                }
            }
            let apiEndpoint = '';
            let config = {};

            switch (selectedItem.type) {
                case 'banner':
                    apiEndpoint = `http://localhost:8080/api/users/userinfo/${user.username}`;
                    config = {
                        httpVerb: 'PUT',
                        data: formData,
                    };
                    break;
                case 'profile':
                    apiEndpoint = `http://localhost:8080/api/users/userinfo/${user.username}`;
                    config = {
                        httpVerb: 'PUT',
                        data: formData,
                    };
                    break;
                case 'personalData':
                    apiEndpoint = `http://localhost:8080/api/users/userinfo/${user.username}`;
                    config = {
                        httpVerb: 'PUT',
                        data: formData,
                    };
                    break;
                default:
                    throw new Error("Tipo de componente no válido.");
            }

            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setIsDataEdited(true);
                setIsModalOpen(false);
                updateUserInfo();
            } else {
                throw new Error("Error al editar la información. ");
            }
        } catch (error) {
            console.error("Error al editar la información: ", error);
        }
    };

    if (selectedItem) {
        switch (selectedItem.type) {
            case 'banner':
                modalTitle = "Editar banner";
                modalContent = <Form fields={bannerForm} onSubmit={handleFormSubmit} toggleModal={toggleModal}/>;
                break;
            case 'profile':
                modalTitle = "Editar foto de perfil";
                modalContent = <Form fields={profilePicUrl} onSubmit={handleFormSubmit} toggleModal={toggleModal}/>;
                break;
            case 'personalData':
                modalTitle = "Editar información personal";
                modalContent = <Form fields={personalDataForm} onSubmit={handleFormSubmit} toggleModal={toggleModal}/>;
                break;
            default:
                modalContent = null;
        }
    }
    return (
        <section className={styles.userInfo}>
            <div className="row">
                <div className="col-12">
                    <Banner imageUrl={bannerPicUrl} hasPermissionToEdit={hasPermissionToEdit} onEdit={handleEditItem}/>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Profile imageUrl={profilePic} hasPermissionToEdit={hasPermissionToEdit} className={styles.profilePic} onEdit={handleEditItem}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xs-12">
                    <PersonalData user={user} userInfo={userInfo} hasPermissionToEdit={hasPermissionToEdit} onEdit={handleEditItem}/>
                </div>
            </div>
            <Modal showModal={isModalOpen} title={modalTitle} closeModal={toggleModal} isForm={true}>
                {selectedItem && (
                    <>
                        {modalContent}
                    </>
                )}
            </Modal>
        </section>
    )
};
  
export default UserInfo;