import { useEffect, useRef, useState } from "react";
import ModalBody from "../../molecules/modal-body/modal-body";
import ModalFooter from "../../molecules/modal-footer/modal-footer";
import ModalHeader from "../../molecules/modal-header/modal-header";
import gsap from 'gsap';
import styles from './modal.module.css';

const Modal = ({ title, children, closeModal, showModal, expired, isForm }) => {
    const modalRef = useRef(null);
    const modalContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const fadeInDuration = 0.5;
        const fadeOutDuration = 0.3;

        if (showModal) {
            setIsOpen(true);
            gsap.to(modalRef.current, { opacity: 1, duration: fadeInDuration, ease: "power2.inOut" });
            gsap.to(modalContainerRef.current, { backdropFilter: "blur(10px)", duration: fadeInDuration, ease: "power2.inOut" });
        } else {
            gsap.to(modalRef.current, { opacity: 0, duration: fadeOutDuration, ease: "power2.inOut" })
                .then(() => setIsOpen(false));
            gsap.to(modalContainerRef.current, { backdropFilter: "blur(0px)", duration: fadeOutDuration, ease: "power2.inOut" });
        }
    }, [showModal, expired]);
    
    return (
        <div ref={modalContainerRef} className={`${styles.modalContainer} ${isOpen ? styles.show : styles.hide}`}>
            <div ref={modalRef} className={`${styles.customModal}`}>
                <ModalHeader title={title} />
                <ModalBody>{children}</ModalBody>
                {!isForm && (
                    <ModalFooter closeModal={closeModal} redirect={expired}/>
                )}
            </div>
        </div>
    );
}

export default Modal;
