import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCourssPic from '../../../assets/img/defaultCoursePic.webp';
import styles from './CoursesSection.module.css';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const CoursesSection = ({ hasPermissionToEdit, courses }) => {
    const coursePictura = courses.coursePictura;
    return (
        <section className={styles.coursesInfo}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Cursos</h2>
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

            {courses.map((course, index) => (
                <InfoItem
                    key={index}
                    imgSrc={coursePictura ? coursePictura : defaultCourssPic}
                    title={course.courseName}
                    subtitle={course.institution}
                    startDate={course.startDate}
                    endDate={course.endDate}
                    description={course.focusOfStudies}
                    hasPermissionToEdit={hasPermissionToEdit}
                />
            ))}
        </section>
    );
}

export default CoursesSection;
