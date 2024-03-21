import InfoItem from "../../molecules/info-item/InfoItem";
import defaultProfessionsPic from '../../../assets/img/defaultProfessionPic.jpg';
import styles from './ProfessionalSection.module.css';
import ActionIcon from "../../atoms/action-icon/ActionIcon";
const ProfessionalSection = ({hasPermissionToEdit, professions}) => {
    const companyPicture = professions.companyPicture;

    return(
        <section className={styles.professionalInfo}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Experiencia laboral</h2>
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

            {professions.map( (profession, index) => (
                <InfoItem key={index} imgSrc={companyPicture ? companyPicture : defaultProfessionsPic} title={profession.jobTitle} subtitle={profession.companyName} startDate={profession.startDate} endDate={profession.endDate} description={profession.summary} hasPermissionToEdit={hasPermissionToEdit}/>
            ))}
        </section>
    );
}
export default ProfessionalSection;