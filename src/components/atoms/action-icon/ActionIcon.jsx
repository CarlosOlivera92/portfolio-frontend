import styles from './ActionIcon.module.css';

const ActionIcon = ({classList, classname, onClick}) => {
    return (
        <div className={`${styles.actionIcon} ${classname}`} onClick={onClick}>
            <i className={`fas ${classList}`} />
        </div>
    )
}
export default ActionIcon;