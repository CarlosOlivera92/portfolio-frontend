// CoursesSection.js
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './CoursesSection.module.css'; 
import InfoItem from "../../molecules/info-item/InfoItem";
import defaultCoursePic from '../../../assets/img/defaultCoursePic.webp';
import ActionIcon from "../../atoms/action-icon/ActionIcon";

const CoursesSection = ({ hasPermissionToEdit, courses }) => {
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

    }, [isOpen, courses]);

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <section className={styles.coursesInfo} ref={sectionRef}>
            <div className={styles.actionsContainer} >
                <h2 className={styles.title}>Cursos</h2>
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
                {isOpen && courses && courses.map((course, index) => (
                    <div key={index} className={styles.infoItem}>
                        <InfoItem 
                            imgSrc={course.coursePicture ? course.coursePicture : defaultCoursePic} 
                            title={course.courseName} 
                            subtitle={course.institution} 
                            startDate={course.startDate} 
                            endDate={course.endDate} 
                            description={course.focusOfStudies} 
                            hasPermissionToEdit={hasPermissionToEdit}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoursesSection;
