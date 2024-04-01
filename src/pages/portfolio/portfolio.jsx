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
import { useTheme } from '../../utils/context/themeContext';
import Spinner from '../../components/atoms/spinner/spinner';
const Portfolio = () => {
    const { user, setUser, setProfilePic, userInfo, setUserInfo } = useUser(); 
    const { isAuthenticated, expired } = useAuth();
    const {username} = useParams();
    const { loading, error, request, data } = useApi();
    const [userData, setUserData] = useState({})
    const { darkTheme, toggleTheme } = useTheme();
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
    const getUser = async () => {
        try {
            const apiEndpoint = `http://localhost:8080/api/users/user/${username}`;

            const config = {
                httpVerb: "GET",
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (!response.ok) {
                const parsedResponse = await response.json();
                console.log(parsedResponse)
                throw parsedResponse;
            }
            try {
                const responseBody = await response.json();
                setUser(responseBody);
                setUserInfo(responseBody.userInfo)
            } catch (error) {
                console.error("Error al obtener el usuario: ", error);
            }
        } catch (error) {
            console.log(error)
            if (error.status === 500) {
                console.log(error)
            } else if (error.status === 403) {
                console.log(error)
            }
        }
    };

    const getProfilePic = async () => {
        try {
            const apiEndpoint = `http://localhost:8080/api/users/profile-pic/${user.username}`;
            const config = {
                httpVerb: "GET"
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const base64String = await response.text(); 
                const imageUrl = `data:image/png;base64,${base64String}`;
                setProfilePic(imageUrl);
            } else {
                console.error("Error al cargar la foto de perfil: ", response.statusText);
            }
        } catch (error) {
            console.error("Error al cargar la foto de perfil: ", error);
        }
    };

    useEffect(() => {
        if(username) {
            getUser();
        }

    }, [username]);
    useEffect(() => {
        if (user) {
            setUserData(user);
            getProfilePic();
        }
    }, [user]);
    if (loading) {
        return (
            <Spinner isOpen={loading}/>
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
            <div className={`container-fluid ${darkTheme ? "darkBody" : ""}`}>
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