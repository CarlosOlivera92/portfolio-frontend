import { createContext, useContext, useState } from 'react';

// Creamos un contexto para almacenar el username
const UserContext = createContext();
const useUser = () => {
    return useContext(UserContext);
};
export {UserContext, useUser};