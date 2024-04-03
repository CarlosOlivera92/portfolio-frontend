import Banner from "../../molecules/banner/Banner";
import PersonalData from "../../molecules/personal-data/PersonalData";
import Profile from "../../molecules/profile/Profile";
import defaultProfilePic from '../../../../src/assets/img/defaultProfilePic.jpg';
import styles from './UserInfo.module.css';
import { useEffect, useState } from "react";
import Form from "../form/form";
import Modal from "../modal/modal";
import { bannerForm } from "../../../utils/form-utils/forms-config";
import { profilePicUrlForm } from "../../../utils/form-utils/forms-config";
import { personalDataForm } from "../../../utils/form-utils/forms-config";
import { useApi } from "../../../utils/api/useApi";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useUser } from "../../../utils/context/userContext";
import Spinner from "../../atoms/spinner/spinner";
import Toast from "../toast/toast";
const UserInfo = ({ user, userInfo, hasPermissionToEdit  }) => {
    const defaultImageUrl = "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"; 
    const {profilePic, setProfilePic, setUserInfo, setCurrentUserProfilePic} = useUser();
    const bannerPicUrl = userInfo.bannerPicUrl != null ? userInfo.bannerPicUrl : defaultImageUrl;
    const profilePicUrl = !profilePic ? defaultProfilePic : profilePic;

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, error, request, data } = useApi(); 
    const { isAuthenticated } = useAuth();

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorApi, setErrorApi] = useState();

    let modalContent = null;
    let modalTitle = "";
    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    
    
    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    
    const handleFormSubmit = async (formData) => {
        setShowToast(true);
        try {
            if (selectedItem.type == "personalData" || selectedItem.type == "banner") {
                for (const key in formData) {
                    if (formData.hasOwnProperty(key) && formData[key] === "") {
                        formData[key] = null;
                    }
                };
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
                    apiEndpoint = `http://localhost:8080/api/users/profile-pic/${user.username}/file`;
                    config = {
                        httpVerb: 'PUT',
                        data: formData.file,
                        headers: {
                            "type": "file",
                        }
                    };
                    break;
                case 'personalData':
                    apiEndpoint = `http://localhost:8080/api/users/userinfo/${user.username}`;
                    config = {
                        httpVerb: 'PUT',
                        data: formData
                    };
                    break;
                default:
                    throw new Error("Tipo de componente no válido.");
            }
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                setIsModalOpen(false);
                setErrorApi(false);
                setMessage("Datos actualizados!");
                if (selectedItem.type == "profile") {
                    const image = formData.file;
                    const imageUrl = URL.createObjectURL(image);
                    setProfilePic(imageUrl);
                    setCurrentUserProfilePic(imageUrl);
                    setMessage("Foto de perfil actualizada");
                } else if (selectedItem.type == "banner" || selectedItem.type == "personalData") {
                    const updatedUserInfo = await response.json();
                    setUserInfo(updatedUserInfo);
                }
            } else {
                const parsedResponse = await response.json();
                throw new Error(parsedResponse);
            }
        } catch (error) {
            setErrorApi(true);
            setMessage("Ha habido un error tratando de actualizar su información.");

            console.error("Error al editar la información: ", error);
        }
    };
    
    if (loading) {
        return (
            <Spinner isOpen={loading}/>
        )
    }
    if (selectedItem) {
        switch (selectedItem.type) {
            case 'banner':
                modalTitle = "Editar banner";
                modalContent = <Form fields={bannerForm} onSubmit={handleFormSubmit} toggleModal={toggleModal}/>;
                break;
            case 'profile':
                modalTitle = "Editar foto de perfil";
                modalContent = <Form fields={profilePicUrlForm} onSubmit={handleFormSubmit} toggleModal={toggleModal}/>;
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
                    <Profile imageUrl={profilePicUrl} hasPermissionToEdit={hasPermissionToEdit} className={styles.profilePic} onEdit={handleEditItem}/>
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
            <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>

        </section>
    )
};
  
export default UserInfo;