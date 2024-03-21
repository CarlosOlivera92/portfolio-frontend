import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import styles from './Banner.module.css';
const Banner = ({ imageUrl, hasPermissionToEdit }) => {
    return ( 
        <div className={styles.banner}>
            <Image src={imageUrl} alt="" />
            {hasPermissionToEdit && <EditIcon classList={styles.editIcon} />}
        </div>
    )
} 
export default Banner;