import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../../../utils/api/useApi";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useEffect } from "react";
import ProfessionalSection from "../../../components/templates/ProfessionalSection/ProfessionalSection";
import CertificationsSection from "../../../components/templates/CertificationsSection/CertificationsSection";
import ProjectsSection from "../../../components/templates/ProjectsSection/ProjectsSection";
import CoursesSection from "../../../components/templates/CoursesSection/CoursesSection";
import EducationSection from "../../../components/templates/EducationSection/EducationSection";
import UserInfo from "../../../components/organisms/UserInfo/UserInfo";
const PersonalArea = ({user, loadingData}) => {
    const location = useLocation();
    const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);
    const { isAuthenticated } = useAuth();
    const config = {
        httpVerb: "POST",
        data: location.pathname
    };
    const { loading, error, request, data } = useApi();
    const userInfo = user.userInfo;
    let educationalBackground;
    let courses;
    let professions;
    let certifications;
    let projects;
    if (userInfo) {
        educationalBackground = userInfo.educationalBackgrounds;
        courses = userInfo.courses;
        professions = userInfo.professionalBackgrounds;
        certifications = userInfo.certifications;
        projects = userInfo.projects;
    }


    const hasEditPermission = async (endpoint) => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
                setHasPermissionToEdit(true);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
        } catch (error) {
            if (error.status === 500) {
                console.log(error)
            } else if (error.status === 403) {
                console.log(error)
            }
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            hasEditPermission(`http://localhost:8080/api/check-permission/edit-profile`);
        }
    }, []);
    return (
        <div className="container">
            <UserInfo hasPermissionToEdit={hasPermissionToEdit} user={user} userInfo={userInfo}  />
            <ProfessionalSection hasPermissionToEdit={hasPermissionToEdit} professions={professions} />
            <EducationSection hasPermissionToEdit={hasPermissionToEdit} educationalBackground={educationalBackground} />
            <CoursesSection hasPermissionToEdit={hasPermissionToEdit} courses={courses} />
            <CertificationsSection hasPermissionToEdit={hasPermissionToEdit} certifications={certifications} />
            <ProjectsSection hasPermissionToEdit={hasPermissionToEdit} projects={projects} />
        </div>
    )
} 
export default PersonalArea;