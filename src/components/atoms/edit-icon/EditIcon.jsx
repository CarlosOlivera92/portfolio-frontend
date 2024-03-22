import styles from './EditIcon.module.css';
const EditIcon = ({classList, onclick}) => {
    return(
        <div className={`${styles.editIcon} ${classList}`} onClick={onclick}>
            <i className="fas fa-pencil-alt" />
        </div>
    )
}
export default EditIcon;