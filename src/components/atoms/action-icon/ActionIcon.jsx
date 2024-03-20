import styles from './ActionIcon.module.css';

const ActionIcon = ({classList}) => {
    return (
        <div className={styles.actionIcon}>
            <i className={`fas ${classList}`} />
        </div>
    )
}
export default ActionIcon;