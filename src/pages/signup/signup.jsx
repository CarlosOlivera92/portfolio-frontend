import Form from '../../components/organisms/form/form';
import { signUpForm } from '../../utils/form-utils/forms-config';
import { useState, useEffect } from "react";
import './styles.css';
import { useApi } from '../../utils/api/useApi';
import { NavLink } from 'react-router-dom';
import Toast from '../../components/organisms/toast/toast';
import Spinner from '../../components/atoms/spinner/spinner';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isUsernameChecked, setIsUsernameChecked] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const isSignUp = signUpForm.title === "Sign Up";
    const [showToast, setShowToast] = useState(false);

    const steps = isSignUp
    ? {
        1: ["username"],
        2: ["password", "repeatPassword"],
        3: ["firstName", "lastName", "email", "phoneNumber", "birthday", "role"],
      }
    : null;

    const { loading, error, request, data } = useApi();
    const config = {
        httpVerb: "POST",
        data: formData
    }
    const registerUser = async (endpoint) => {
        try {
            const response = await request(endpoint, config);
            if (!response.ok) {
                setIsRegisterSuccess(false);
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            const responseData = await response.json();
            setFormCompleted(true);
            setIsRegisterSuccess(true);
        } catch (error) {
            setMessage("Error en el registro. Inténtalo de nuevo.");
        }
    };
    const checkUsername = async(endpoint, data) => {
        try {
            config.data = data;
            const response = await request(endpoint, config)
            setIsUsernameChecked(true);
            if (!response.ok) {
                setIsUsernameAvailable(false);
                setMessage("Este nombre de usuario ya está en uso.")
                throw response;
            } 
            setIsUsernameAvailable(true);
            setMessage("Nombre de usuario disponible");
            return response;
            
        } catch ( error ) {
            return error;
        }
    }
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    useEffect(() => {
        if (!isRegisterSuccess && formCompleted) {
            registerUser("http://localhost:8080/api/auth/signup");
            setIsRegisterSuccess(true);
        }
    }, [formCompleted, formData, request, currentStep, isUsernameAvailable, isRegisterSuccess]);

    const handleFormSubmit = async (data) => {
        const { repeatPassword, ...dataWithoutRepeatPassword } = data;
        if (currentStep === 1) {    
            const response = await checkUsername("http://localhost:8080/api/auth/check-username", dataWithoutRepeatPassword);
            if(response.ok) {
                setFormData(dataWithoutRepeatPassword);
                setCurrentStep(currentStep + 1);
            }

        }
        else if (currentStep < Object.keys(steps).length) {
            setCurrentStep(currentStep + 1);
            setFormData(dataWithoutRepeatPassword);
        } else {
            setFormData(dataWithoutRepeatPassword);
            setFormCompleted(true);
        }
    };
    

    return (
        <main className='signup' id='signup'>
            <div className="background container-fluid">
                <div className="form container-fluid">
                    <div className="signup-form container p-4">
                        {formCompleted ? (
                            loading ? (
                                <Spinner isOpen={loading}/>
                                ) : isRegisterSuccess ? (
                                <div>
                                    <p>¡Registro exitoso! Se ha enviado un correo a tu casilla.</p>
                                    <p className='m-0'>¿Ya tienes una cuenta? <NavLink to={'/signin'}>Iniciar Sesión</NavLink></p>
                                </div>
                            ) : (
                                <div>
                                    <Toast text={message} error={error} showToasty={showToast} onToastClose={handleToastVisibility}/>
                                </div>
                            )
                        ) : (
                            <Form
                                title={"Crear cuenta"}
                                fields={signUpForm}
                                onSubmit={handleFormSubmit}
                                currentStep={currentStep}
                                steps={steps}
                                isSignUp={isSignUp}
                                isUsernameInUse={isUsernameAvailable}
                                isUsernameChecked={isUsernameChecked}
                                message={message}
                            />
                        )}
                    </div>
                </div>
                {loading && (
                    <Spinner isOpen={loading}/>
                )}
            </div>
        </main>
    );      
}

export default Signup;
