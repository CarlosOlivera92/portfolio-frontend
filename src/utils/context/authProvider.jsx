import React, { createContext, useState, useEffect } from 'react';
import { useApi } from '../api/useApi';
import { useUser } from './userContext';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [tokenExpiration, setTokenExpiration] = useState(null); 
    const config = {
        httpVerb: "POST",
    };
    const endpoint = "http://localhost:8080/api/auth/logout"
    const { loading, error, request, data } = useApi();
    const [expired, setExpired] = useState(false);
    const { setCurrentUser } = useUser();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedToken && storedRefreshToken) {
            setIsAuthenticated(true);
            const decodedToken = decodeToken(storedToken);
            if (decodedToken) {
                const expirationTime = decodedToken.exp * 1000;
                setTokenExpiration(expirationTime);
                // Verificar si el token ha expirado
                if (expirationTime < Date.now()) {
                    // Si el token ha expirado, intentar refrescarlo
                    refreshToken(storedRefreshToken);
                }
            }
        }
    }, []);
    useEffect(() => {
        if (isAuthenticated) {
            getCurrentUser();
        }
    }, [isAuthenticated]);
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
    const refreshToken = async (refreshToken) => {
        try {
            const apiEndpoint = `http://localhost:8080/api/auth/refreshtoken`;
            const config = {
                httpVerb: "POST",
                data: {
                    refreshToken: refreshToken
                }
            };
            const response = await request(apiEndpoint, config, isAuthenticated);
            if (response.ok) {
                const data = await response.json();
                const newToken = data.accessToken;
                localStorage.setItem('token', newToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                const expirationTime = decodeToken(newToken).exp * 1000;
                setTokenExpiration(expirationTime);
                setExpired(false); // Reiniciamos el estado de expiración
            } else {
                console.error('Error al obtener el nuevo token');
                setIsAuthenticated(false);
                setExpired(true); // Establecemos el estado de expiración como true
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de refresh token:', error);
            setIsAuthenticated(false);
            setExpired(true); // Establecemos el estado de expiración como true
        }
    };
    const login = (token, username, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('refreshToken', refreshToken)
        setIsAuthenticated(true);
        getCurrentUser();
    };
    const getCurrentUser = async () => {
        try {
            const username = localStorage.getItem("username")
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
            const parsedResponse = await response.json();
            setCurrentUser(parsedResponse)
        } catch (error) {
            if (error.status === 500) {
                console.log(error)
            } else if (error.status === 403) {
                console.log(error)
            }
        }
    };
    const logout = async() => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('refreshToken');    
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
            setIsAuthenticated(false);
        } catch (error) {
            if (error.status === 500) {
                return error.status;
            } 
        }
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export {AuthProvider, AuthContext};
