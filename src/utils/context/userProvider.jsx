import { useState } from "react"
import {UserContext} from "./userContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [profilePic, setProfilePic] = useState(); 
    const [userInfo, setUserInfo] = useState();
    return (
        <UserContext.Provider value={{ user, setUser, profilePic, setProfilePic, userInfo, setUserInfo }}> {/* Incluimos la foto de perfil en el contexto */}
            {children}    
        </UserContext.Provider>
    );
};
export { UserProvider };