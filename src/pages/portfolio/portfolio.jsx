import { useParams } from 'react-router-dom';
import { useApi } from '../../utils/api/useApi';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
const Portfolio = () => {
    const { isAuthenticated } = useAuth;
    const {username} = useParams();
    const [userData, setUserData] = useState([]);
    const config = {
        httpVerb: "GET",
    };
    const { loading, error, request, data } = useApi();

    const signIn = async (endpoint) => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
                setUserData(responseBody);
                console.log(responseBody)
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
        signIn(`http://localhost:8080/api/users/user/${username}`);
    
    }, []);
    return (
        <div className="container-fluid p-4">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <p>Bienvenido, {userData.firstName} {userData.lastName}!</p>
            )}
        </div>
    )
}
export default Portfolio;