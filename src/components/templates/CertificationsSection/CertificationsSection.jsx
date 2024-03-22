// CertificationsSection.js
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './CertificationsSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCertificationPic from '../../../assets/img/defaultCertificationPic.jpg';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const CertificationsSection = ({ hasPermissionToEdit, certifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const infoItemsContainerRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const infoItemsContainer = infoItemsContainerRef.current;

        const tl = gsap.timeline({ paused: true })
            .set(infoItemsContainer, { opacity: 0, scaleY: 0, transformOrigin: "top" })
            .to(infoItemsContainer, { opacity: 1, scaleY: 1, duration: 0.5 })
            .to(section, { height: "auto", duration: 0.5 }, "-=0.5");

        const reverseTl = tl.reverse();

        if (isOpen) {
            tl.play();
        } else {
            reverseTl.play();
        }

    }, [isOpen, certifications]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <section className={styles.certificationsInfo} ref={sectionRef}>
            <div className={styles.actionsContainer} >
                <h2 className={styles.title}>Certificados</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper} onClick={toggleSection}>
                        <ActionIcon classList={isOpen ? "fa-chevron-up" : "fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} />
                    )}
                </div>
            </div>
            <div className={styles.infoItems} ref={infoItemsContainerRef}>
                {isOpen && certifications && certifications.map((certification, index) => (
                    <div key={index} className={styles.infoItem}>
                        <InfoItem 
                            imgSrc={certification.certificationPic ? certification.certificationPic : defaultCertificationPic} 
                            title={certification.degree} 
                            links={[{ pageName: "certification", href: certification.certificationUrl }]}
                            hasPermissionToEdit={hasPermissionToEdit}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CertificationsSection;
