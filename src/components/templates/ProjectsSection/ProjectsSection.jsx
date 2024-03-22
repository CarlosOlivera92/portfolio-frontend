// ProjectsSection.js
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './ProjectsSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultProjectPic from '../../../assets/img/defaultProjectsPicture.jpg';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const ProjectsSection = ({ hasPermissionToEdit, projects }) => {
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

    }, [isOpen, projects]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <section className={styles.projectsInfo} ref={sectionRef}>
            <div className={styles.actionsContainer} >
                <h2 className={styles.title}>Proyectos</h2>
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
                {isOpen && projects && projects.map((project, index) => (
                    <div key={index} className={styles.infoItem}>
                        <InfoItem 
                            imgSrc={project.projectPicture ? project.projectPicture : defaultProjectPic} 
                            title={project.projectName} 
                            links={[
                                { pageName: "github", href: project.projectRepoUrl },
                                { pageName: "project", href: project.projectUrl }
                            ]}
                            description={project.summary} 
                            hasPermissionToEdit={hasPermissionToEdit}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
