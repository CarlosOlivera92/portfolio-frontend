import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />

/**
 * Debo desactivar/eliminar el React Strict Mode para evitar que los useEffect se ejecuten multiples veces
 * 
 */
)
