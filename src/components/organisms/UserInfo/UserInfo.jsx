import Banner from "../../molecules/banner/Banner";
import PersonalData from "../../molecules/personal-data/PersonalData";
import Profile from "../../molecules/profile/Profile";
import defaultProfilePic from '../../../../src/assets/img/defaultProfilePic.jpg';
import styles from './UserInfo.module.css';
import { useState } from "react";
import Form from "../form/form";
import ModalFooter from "../../molecules/modal-footer/modal-footer";
import ActionButton from "../../atoms/action-button/action-button";
import Modal from "../modal/modal";
import { bannerForm } from "../../../utils/form-utils/forms-config";
import { profilePicUrl } from "../../../utils/form-utils/forms-config";
import { personalDataForm } from "../../../utils/form-utils/forms-config";
import InfoItem from "../../molecules/info-item/InfoItem";
const UserInfo = ({ user, userInfo, hasPermissionToEdit }) => {
    const defaultImageUrl = "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"; 
    const bannerPicUrl = userInfo ? userInfo.bannerPicUrl : defaultImageUrl;
    const profilePic = userInfo ? userInfo.profilePicUrl : defaultProfilePic;
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };    
    
    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    let modalContent = null;
    let modalTitle = "";
    if (selectedItem) {
        switch (selectedItem.type) {
            case 'banner':
                modalTitle = "Editar banner";
                modalContent = <Form fields={bannerForm} />;
                break;
            case 'profile':
                modalTitle = "Editar foto de perfil";
                modalContent = <Form fields={profilePicUrl}/>;
                break;
            case 'personalData':
                modalTitle = "Editar información personal";
                modalContent = <Form fields={personalDataForm}/>;
                break;
            // Add more cases for other types of components if needed
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
                        <ModalFooter >
                            <ActionButton 
                                name={"Cancelar"}
                                type={"submit"}
                                onClick={toggleModal}
                                classList={styles.modalBtn}
                            />
                            <ActionButton 
                                name={"Editar"}
                                type={"submit"}
                                onClick={null}
                                classList={styles.modalBtn}
                                disabled={false}
                            />
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </section>
    )
};
  
export default UserInfo;