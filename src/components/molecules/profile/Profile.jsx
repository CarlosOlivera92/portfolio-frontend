import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import styles from './Profile.module.css';

const Profile = ({ imageUrl, hasPermissionToEdit }) => (
    <div className={styles.profilePic}>
      <Image src={imageUrl} alt="" />
      {hasPermissionToEdit && <EditIcon classList={styles.editIcon}/>}
    </div>
);
export default Profile; 