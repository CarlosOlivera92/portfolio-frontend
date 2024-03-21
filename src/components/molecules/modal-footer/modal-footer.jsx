import ActionButton from "../../atoms/action-button/action-button";
import styles from './ModalFooter.module.css'

const ModalFooter = ( {closeModal} ) => {

    return (
        <div className={styles.modalFooter}>
        <ActionButton
            name={"Cerrar Modal"}
            onClick={ () => closeModal()}
            type={"button"}
            classname={styles.modalBtn}
            disabled={false}
        />
        </div>
    )
}
export default ModalFooter;