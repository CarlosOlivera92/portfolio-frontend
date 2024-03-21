import defaultEducationPic from '../../../assets/img/defaultInstitutionPic.png'; 
import ActionIcon from '../../atoms/action-icon/ActionIcon';
import InfoItem from '../../molecules/info-item/InfoItem';
import styles from './EducationalSection.module.css';

const EducationSection = ({ hasPermissionToEdit, educationalBackground }) => {
    const institutionPicture = educationalBackground.institutionPicture;

    return (
        <section className={styles.educationalInfo}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Experiencia Educativa</h2>
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

            {educationalBackground.map((education, index) => (
                <InfoItem
                    key={index}
                    imgSrc={institutionPicture ? institutionPicture : defaultEducationPic}
                    title={education.degree}
                    subtitle={education.institution}
                    startDate={education.startDate}
                    endDate={education.endDate}
                    description={education.focusOfStudies}
                    hasPermissionToEdit={hasPermissionToEdit}
                />
            ))}
        </section>
    );
}

export default EducationSection;
