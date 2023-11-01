import Form from '../../components/organisms/form/form';
import { signUpForm } from '../../utils/form-utils/forms-config';
import { useState, useEffect } from "react";
import './styles.css';
import { useApi } from '../../utils/api/useApi';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const { loading, error, request } = useApi({
        apiEndpoint: "http://localhost:8080/api/auth/signup",
        httpVerb: "POST",
        data: formData
    });

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await request({
                    apiEndpoint: "http://localhost:8080/api/auth/signup",
                    httpVerb: "POST",
                    data: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                }

                const responseData = await response.json();
                setFormCompleted(true);
            } catch (error) {
                setMessage("Error en el registro. Inténtalo de nuevo.");
            }
        };

        if (formCompleted) {
            sendRequest();
        }
    }, [formCompleted, formData, request]);

    const handleFormSubmit = (data) => {
        const { repeatPassword, ...dataWithoutRepeatPassword } = data;
        setFormData(dataWithoutRepeatPassword);
        setFormCompleted(true);
    };

    return (
        <main className='signup' id='signup'>
            <div className="background container-fluid">
                <div className="form container-fluid">
                    <div className="signup-form container p-4">
                        {formCompleted ? (
                            <div>
                                <p>¡Registro exitoso! Se ha enviado un correo a tu casilla.</p>
                                <p className='m-0'>¿Ya tienes una cuenta? <NavLink to={'/signin'}>Iniciar Sesión</NavLink></p>
                            </div>
                        ) : (
                            <Form title={"Crear cuenta"} fields={signUpForm} onSubmit={handleFormSubmit} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Signup;
