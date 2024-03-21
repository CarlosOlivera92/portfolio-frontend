import TextContent from "../../atoms/text-content/text-content";
import styles from './ModalBody.module.css'

const ModalBody = ({ text, children }) => {
    return (
        <div className={styles.modalBody}>
            {text && <TextContent text={text} />}
            {children}
        </div>
    );
};

export default ModalBody;