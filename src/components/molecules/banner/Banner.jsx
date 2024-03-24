import EditIcon from "../../atoms/edit-icon/EditIcon";
import Image from "../../atoms/image/Image";
import styles from './Banner.module.css';
const Banner = ({ imageUrl, hasPermissionToEdit, onEdit }) => {
    const handleEditClick = () => {
        onEdit({
            type: 'banner',
            imageUrl
        });
    };
    return ( 
        <div className={styles.banner}>
            <Image src={imageUrl} alt="" />
            {hasPermissionToEdit && <EditIcon classList={styles.editIcon}  onclick={handleEditClick}/>}
        </div>
        
    )
} 
export default Banner;