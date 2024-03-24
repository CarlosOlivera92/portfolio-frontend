import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import styles from './Profile.module.css';

const Profile = ({ imageUrl, hasPermissionToEdit, classList, className, onClick, onEdit}) => {
  const handleEditClick = () => {
    onEdit({
      type: 'profile',
      imageUrl
    });
  };
  return (
    <div className={className} onClick={onClick}>
      <Image src={imageUrl} alt="" classList={classList} />
      {hasPermissionToEdit && <EditIcon classList={styles.editIcon} onclick={handleEditClick}/>}
    </div>
  )
}
export default Profile; 