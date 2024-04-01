import { useEffect, useState } from "react"
import {UserContext} from "./userContext";
import { useApi } from "../api/useApi";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [profilePic, setProfilePic] = useState(); 
    const [userInfo, setUserInfo] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [currentUserProfilePic, setCurrentUserProfilePic] = useState();
    const { loading, error, request, data } = useApi();
    useEffect(() => {
        if (currentUser) {
            getProfilePic();
        }
    }, [currentUser]);
    const getProfilePic = async () => {
        try {
            const apiEndpoint = `http://localhost:8080/api/users/profile-pic/${currentUser.username}`;
            const config = {
                httpVerb: "GET"
            };
            const response = await request(apiEndpoint, config, true);
            if (response.ok) {
                const base64String = await response.text(); 
                const imageUrl = `data:image/png;base64,${base64String}`;
                setCurrentUserProfilePic(imageUrl);
            } else {
                console.error("Error al cargar la foto de perfil: ", response.statusText);
            }
        } catch (error) {
            console.error("Error al cargar la foto de perfil: ", error);
        }
    };
    return (
        <UserContext.Provider value={{ user, setUser, profilePic, setProfilePic, userInfo, setUserInfo, currentUser, setCurrentUser, currentUserProfilePic, setCurrentUserProfilePic }}>
            {children}    
        </UserContext.Provider>
    );
};
export { UserProvider };