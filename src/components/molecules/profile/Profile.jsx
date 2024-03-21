import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import styles from './Profile.module.css';

const Profile = ({ imageUrl, hasPermissionToEdit, classList, className, onClick}) => (
    <div className={className} onClick={onClick}>
      <Image src={imageUrl} alt="" classList={classList} />
      {hasPermissionToEdit && <EditIcon classList={styles.editIcon}/>}
    </div>
);
export default Profile; 