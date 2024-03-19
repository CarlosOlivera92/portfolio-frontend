import { emailForm } from "../../utils/form-utils/forms-config";
import Toast from '../../components/organisms/toast/toast';
import Form from '../../components/organisms/form/form';
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api/useApi";
const ForgotPassword = () => {
    const [errorApi, setErrorApi] = useState();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isUsernameChecked, setIsUsernameChecked] = useState(false);
    const [isUserRegistered, setIsUserRegistered] = useState(null);

    const { loading, error, request, data } = useApi();
    const config = {
        httpVerb: "POST",
        data: formData
    };
    const handleFormSubmit = (data) => {
        const { repeatPassword, ...dataWithoutRepeatPassword } = data;
        setFormData(dataWithoutRepeatPassword);
        setFormCompleted(true);
    };
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };

    const forgotPassword = async (endpoint) => {
        try {
            const response = await request(endpoint, config);
            console.log(response)
            if (!response.ok) {
                throw response;
            }
            setErrorApi(false);
            setFormCompleted(false);
            setIsUsernameChecked(true);
            setIsUserRegistered(true);
            setMessage('Cambio de contraseña solicitado, revise su casilla de correo electrónico');
        } catch (error) {
            if (error.status === 500) {
                setMessage('Error de conexión con el servidor, intente nuevamente.');
            } else if (error.status === 400) {
                setMessage('El correo electrónico no coincide con ningún usuario registrado.');
                setIsUserRegistered(false)
            }
            setErrorApi(true);
        }
        setShowToast(true);
    };
    useEffect(() => {
        if (formCompleted) {
            forgotPassword("http://localhost:8080/api/auth/forgotpassword");
        }
    }, [formCompleted, formData]);
    return (
        <main className='signup' id='signup'>
            <div className="background container-fluid">
                <div className="form container-fluid">  
                    <div className="signup-form container">
                        <Form title={"Olvidé mi contraseña"} fields={emailForm} onSubmit={handleFormSubmit} message={message} isUsernameChecked={isUsernameChecked} isUserRegistered={isUserRegistered}/>
                        <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default ForgotPassword;