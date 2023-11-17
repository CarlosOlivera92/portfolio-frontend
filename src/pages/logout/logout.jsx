import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false); // Corrección aquí

    useEffect(() => {
        console.log("hola")
        if (isAuthenticated && !isLoggedOut) {
            logout();
            setIsLoggedOut(true);
            navigate('/signin'); 
        }
    }, [isAuthenticated, logout, isLoggedOut, navigate]); 
  
    return null;
} 
export default Logout;
