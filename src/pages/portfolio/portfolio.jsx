import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {useUser} from '../../utils/context/userContext';
import { useApi } from '../../utils/api/useApi';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
import PersonalArea from './personal/personal';
import Home from './home/home';
import Settings from './settings/settings';
import './styles.css';
import Modal from '../../components/organisms/modal/modal';
import TextContent from '../../components/atoms/text-content/text-content';
const Portfolio = () => {
    const [token, setToken] = useState();
    const [currentRefreshToken, setCurrentRefreshToken] = useState();
    const {user, setUser} = useUser();
    const { isAuthenticated } = useAuth;
    const {username} = useParams();
    const { loading, error, request, data } = useApi();
    const [userData, setUserData] = useState({})
    const [expired, setExpired] = useState(null);
    const decodeToken = (token) => {
        const tokenParts = token.split('.'); // Separar el token en sus partes
      
        if (tokenParts.length === 3) {
          const encodedPayload = tokenParts[1]; // El payload está en la segunda parte
          const decodedPayload = atob(encodedPayload); // Decodificar el payload en base64
      
          const parsedPayload = JSON.parse(decodedPayload); // Convertir el payload decodificado a objeto JSON
          return parsedPayload; // Devolver los claims o información del token decodificado
        } else {
          console.error('El token no tiene el formato JWT esperado');
          return null;
        }
    };
    const getUser = async (endpoint) => {
        try {
            const config = {
                httpVerb: "GET",
            };
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
                setUser(responseBody);
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

    const refreshToken = async (endpoint, refreshToken) => {
        try {
            const config = {
                httpVerb: "POST",
                data: {
                    refreshToken: refreshToken
                }
            };
            const response = await request(endpoint, config, isAuthenticated);
            if (response.ok) {
                const data = await response.json();
                const newToken = data.accessToken; // Suponiendo que el nuevo token está en la respuesta
                // Guardar el nuevo token en el almacenamiento local o en el estado de la aplicación
                localStorage.setItem('token', newToken);
                localStorage.setItem('refreshToken', data.refreshToken)
                // O actualiza el estado con el nuevo token
                setToken(newToken);
                setCurrentRefreshToken(data.refreshToken)

            } else {
                console.error('Error al obtener el nuevo token');
            }
            } catch (error) {
            console.error('Error al procesar la solicitud de refresh token:', error);
        }
    };
    const setupTokenRefresh = (expirationTime) => {
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos UNIX
        const timeUntilRefresh = expirationTime - currentTime - 500; 
        if (timeUntilRefresh > 0) {
          // Configura el temporizador para refrescar el token justo antes de que expire
          setTimeout( () => refreshToken( "http://localhost:8080/api/auth/refreshtoken" , currentRefreshToken) , timeUntilRefresh * 1000); // Multiplica por 1000 para convertir a milisegundos
        } else {
          console.error('El tiempo para refrescar el token ya ha pasado');
          setExpired(true);
        }
    };
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        
        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
            setCurrentRefreshToken(storedRefreshToken);
        }
        if(token) {
            
            // Decodificar el token para obtener los claims (payload)
            const decodedToken = decodeToken(storedToken);
            setupTokenRefresh(decodedToken.exp);
        }
      
        getUser(`http://localhost:8080/api/users/user/${username}`);

    }, [token, expired]);
    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);
    if (loading) {
        return (
            <div>
                Cargando...
            </div>
        )
    }
    if (error) {
        return (
            <div>
                Error al cargar los datos
            </div>
        )
    }
    if (expired) {
        return (
            <Modal title={"Su sesión ha expirado"} showModal={expired} expired={expired}>
                <TextContent text={"No se pudo refrescar su sesión y se ha cerrado automáticamente."}/>
            </Modal>
        );
    }
    if (user) {
        return (
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    {user && (
                        <Route path="/personal" element={<PersonalArea user={user} loadingData={loading} />} />
                    )}
                    <Route path='/settings' element={<Settings/>} />
                </Routes>
            </div>
        )
    }
    
}
export default Portfolio;