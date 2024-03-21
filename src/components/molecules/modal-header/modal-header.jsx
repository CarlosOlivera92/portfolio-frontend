/* eslint-disable react/prop-types */
import TitleAtom from "../../atoms/title-atom/title-atom";
import styles from './ModalHeader.module.css'
const ModalHeader = ({title}) => {
    return (
        <div className={styles.ModalHeader}>
            <TitleAtom title={title}/>
        </div>    
    )
}
export default ModalHeader;