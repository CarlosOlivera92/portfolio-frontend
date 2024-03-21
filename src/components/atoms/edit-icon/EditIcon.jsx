import styles from './EditIcon.module.css';
const EditIcon = ({classList}) => {
    return(
        <div className={`${styles.editIcon} ${classList}`}>
            <i className="fas fa-pencil-alt" />
        </div>
    )
}
export default EditIcon;