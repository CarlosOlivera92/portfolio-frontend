import { signInForm } from '../../utils/form-utils/forms-config';
import { useState, useEffect } from 'react';
import { useApi } from '../../utils/api/useApi';
import './styles.css';
import Toast from '../../components/organisms/toast/toast';
import Form from '../../components/organisms/form/form';
import history from '../../utils/context/history';
import { useAuth } from '../../utils/hooks/useAuth';
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [errorApi, setErrorApi] = useState();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const config = {
        httpVerb: "POST",
        data: formData
    };
    const { loading, error, request, data } = useApi();
    const [showToast, setShowToast] = useState(false);
    const { isAuthenticated, login, logout } = useAuth();
    const navigate = useNavigate(); 

    const signIn = async (endpoint) => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            setErrorApi(false);
            setMessage("¡Inicio de sesión exitoso!");
            try {
                const responseBody = await response.json();
                login(responseBody.token, responseBody.username, responseBody.refreshToken)
                setTimeout(() => {
                    history.push(`/portfolio/${responseBody.username}`);
                    navigate(`/portfolio/${responseBody.username}/personal`);
                }, 3000);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
        } catch (error) {
            if (error.status === 500) {
                setMessage('Error de conexión con el servidor, intente nuevamente.');
            } else if (error.status === 403) {
                setMessage('Error en el inicio de sesión. Verifique que sus credenciales son correctas.');
            }
            setErrorApi(true);
        }
        setShowToast(true);
    };

    useEffect(() => {
        if (formCompleted && Object.keys(formData).length > 0 && !isAuthenticated) {
            signIn("http://localhost:8080/api/auth/signin");
        }
    }, [formCompleted, formData]);
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    const handleFormSubmit = (data) => {
        const { repeatPassword, ...dataWithoutRepeatPassword } = data;
        setFormData(dataWithoutRepeatPassword);
        setFormCompleted(true);
    };

    return (
        <main className='signup' id='signup'>
            <div className="background container-fluid">
                <div className="form container-fluid">
                        <div className={`signup-form container ${isAuthenticated ? "dissappear" : ""}`}>
                            <Form title={"Iniciar Sesión"} fields={signInForm} onSubmit={handleFormSubmit}/>
                        </div>
                    <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>
                </div>
            </div>
        </main>
    )
}

export default Signin;
