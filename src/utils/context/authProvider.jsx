import React, { createContext, useState, useEffect } from 'react';
import { useApi } from '../api/useApi';
// Creamos el contexto
const AuthContext = createContext();

// Provider que proporcionará el contexto y funciones relacionadas con la autenticación
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const config = {
        httpVerb: "POST",
    };
    const endpoint = "http://localhost:8080/api/auth/logout"
    const { loading, error, request, data } = useApi();
    const login = (token, username, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('refreshToken', refreshToken)
        setIsAuthenticated(true);
    };

    const logout = async() => {
        console.log(isAuthenticated)
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
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
