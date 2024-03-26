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
import Spinner from "../../../components/atoms/spinner/spinner";
const PersonalArea = ({user, loadingData}) => {
    const location = useLocation();
    const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);
    const { isAuthenticated } = useAuth();

    const { loading, error, request, data } = useApi();
    const [userInfo, setUserInfo] = useState(user.userInfo);
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

    const updateUserInfo = async () => {
        try {
            const apiEndpoint = `http://localhost:8080/api/users/userinfo/${user.username}`
            const config = {
                httpVerb: "GET",
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const updatedUserInfo = await response.json(); 
                setUserInfo(updatedUserInfo);
            }
        } catch (error) {
            console.error("Error al actualizar la información del usuario: ", error);
        }
    };
    const hasEditPermission = async (endpoint) => {
        try {
            const config = {
                httpVerb: "POST",
                data: location.pathname
            };
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
    if (loading) {
        return (
            <Spinner isOpen={loading}/>
        )
    }
    return (
        <div className="container">
            <UserInfo hasPermissionToEdit={hasPermissionToEdit} user={user} userInfo={userInfo} updateUserInfo={updateUserInfo} />
            <ProfessionalSection hasPermissionToEdit={hasPermissionToEdit} professions={professions} />
            <EducationSection hasPermissionToEdit={hasPermissionToEdit} educationalBackground={educationalBackground} />
            <CoursesSection hasPermissionToEdit={hasPermissionToEdit} courses={courses} />
            <CertificationsSection hasPermissionToEdit={hasPermissionToEdit} certifications={certifications} />
            <ProjectsSection hasPermissionToEdit={hasPermissionToEdit} projects={projects} />
        </div>
    )
} 
export default PersonalArea;