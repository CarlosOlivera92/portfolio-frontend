import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoggedOut) {
            logout();
            setIsLoggedOut(true);
            navigate('/signin'); 
        }
    }, [isAuthenticated]); 
  
    return null;
} 
export default Logout;
