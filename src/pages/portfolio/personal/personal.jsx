import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useApi } from "../../../utils/api/useApi";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useEffect } from "react";
import ProfessionalSection from "../../../components/templates/ProfessionalSection/ProfessionalSection";
import CertificationsSection from "../../../components/templates/CertificationsSection/CertificationsSection";
import ProjectsSection from "../../../components/templates/ProjectsSection/ProjectsSection";
import CoursesSection from "../../../components/templates/CoursesSection/CoursesSection";
import EducationSection from "../../../components/templates/EducationSection/EducationSection";
import UserInfo from "../../../components/organisms/UserInfo/UserInfo";
import Spinner from "../../../components/atoms/spinner/spinner";
import { useUser } from "../../../utils/context/userContext";
const PersonalArea = ({user, loadingData}) => {
    const location = useLocation();
    const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);
    const { isAuthenticated } = useAuth();
    const {currentUser} = useUser();
    const {username} = useParams();
    const { loading, error, request, data } = useApi();
    const {userInfo, setUserInfo} = useUser();
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
        const config = {
            httpVerb: "POST",
            data: location.pathname
        };
        const response = await request(endpoint, config, isAuthenticated);
        if (!response.ok) {
            throw response;
        }
        try {
            setHasPermissionToEdit(true);
        } catch (error) {
            console.error("Error al parsear la respuesta JSON:", error);
        }
    };
    useEffect(() => {
        if (currentUser && username) {
            if (currentUser.username == username) {
                hasEditPermission(`https://solo-resume-backend.onrender.com/api/check-permission/edit-profile`);
            }
        }

    }, [currentUser]);

    return (
        <div className="container">
            <UserInfo hasPermissionToEdit={hasPermissionToEdit} user={user} userInfo={userInfo}/>
            <ProfessionalSection hasPermissionToEdit={hasPermissionToEdit} professions={professions} />
            <EducationSection hasPermissionToEdit={hasPermissionToEdit} educationalBackground={educationalBackground} />
            <CoursesSection hasPermissionToEdit={hasPermissionToEdit} courses={courses} />
            <CertificationsSection hasPermissionToEdit={hasPermissionToEdit} certifications={certifications} />
            <ProjectsSection hasPermissionToEdit={hasPermissionToEdit} projects={projects} />
        </div>
    )
} 
export default PersonalArea;