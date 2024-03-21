import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCertificationPic from '../../../assets/img/defaultCertificationPic.jpg';
import styles from './CertificationsSection.module.css';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const CertificationsSection = ({ hasPermissionToEdit, certifications }) => {
    const certificationPicture = certifications.certificationPicture;
    return (
        <section className={styles.certificationsInfo}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Certificados</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper}>
                        <ActionIcon classList={"fa-chevron-up"}/>
                        <ActionIcon classList={"fa-chevron-down"}/>
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"}/>
                    )}
                </div>
            </div>

            {certifications.map((certification, index) => (
                <InfoItem
                    key={index}
                    imgSrc={certificationPicture ? certificationPicture : defaultCertificationPic}
                    title={certification.degree}
                    itemHref={certification.certificationUrl}
                    hasPermissionToEdit={hasPermissionToEdit}
                />
            ))}
        </section>
    );
}

export default CertificationsSection;
