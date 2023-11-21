import { Children, useState } from "react"
import {UserContext} from "./userContext";

const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}    
        </UserContext.Provider>
    );
};
export {UserProvider};