import InfoItem from "../../molecules/info-item/InfoItem";
import defaultProjectPic from '../../../assets/img/defaultProjectsPicture.jpg';
import styles from './ProjectsSection.module.css';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const ProjectsSection = ({ hasPermissionToEdit, projects }) => {
    const projectPicture = projects ? projects.projectPicture : defaultProjectPic;
    
    return (
        <section className={styles.projectsInfo}>
            <div className={styles.actionsContainer}>
                <h2 className={styles.title}>Proyectos</h2>
                <div className={styles.buttonsWrapper}>
                    <div className={styles.dropdownIconWrapper}>
                        <ActionIcon classList={"fa-chevron-up"} />
                        <ActionIcon classList={"fa-chevron-down"} />
                    </div>
                    {hasPermissionToEdit && (
                        <ActionIcon classList={"fa-plus"} />
                    )}
                </div>
            </div>

            {projects && projects.map((project, index) => {
                const projectLinks = [
                    {
                        pageName: "github",
                        href: project.projectRepoUrl
                    },
                    {
                        pageName: "project",
                        href: project.projectUrl
                    }
                ];

                return (
                    <InfoItem
                        key={index}
                        imgSrc={projectPicture}
                        title={project.projectName}
                        links={projectLinks}
                        description={project.summary}
                        hasPermissionToEdit={hasPermissionToEdit}
                    />
                );
            })}
        </section>
    );
}

export default ProjectsSection;
