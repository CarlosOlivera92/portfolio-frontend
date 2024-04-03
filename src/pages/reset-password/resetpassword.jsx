import { resetPasswordForm } from "../../utils/form-utils/forms-config";
import Toast from '../../components/organisms/toast/toast';
import Form from '../../components/organisms/form/form';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useApi } from "../../utils/api/useApi";
import Spinner from "../../components/atoms/spinner/spinner";
const ResetPassword = () => {
    const [errorApi, setErrorApi] = useState();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { loading, error, request, data } = useApi();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const token = queryParams.get('token');

    const config = {
        httpVerb: "PUT",
        data: formData
    };

    const resetPassword = async (endpoint) => {
        try {
            const response = await request(endpoint, config);
            console.log(response)
            if (!response.ok) {
                throw response;
            }
            setErrorApi(false);
            setFormCompleted(false);
            setMessage('Contraseña cambiada exitosamente!');
        } catch (error) {
            if (error.status === 400) {
                setMessage('Token inválido.');
            } else if (error.status === 500) {
                setMessage('Error de conexión con el servidor, intente nuevamente.');
            }
            setErrorApi(true);
        }
        setShowToast(true);
    };

    const handleFormSubmit = (data) => {
        const { repeatPassword, ...dataWithoutRepeatPassword } = data;
        setFormData(dataWithoutRepeatPassword);
        setFormCompleted(true);
    };
    const handleToastVisibility = (visible) => {
        setShowToast(visible); 
    };
    useEffect(() => {
        if (formCompleted) {
            resetPassword(`https://solo-resume-backend.onrender.com/api/auth/reset-password?token=${token}`);
        }
    }, [formCompleted, formData]);
    return (
        <main className='signup' id='signup'>
            <div className="background container-fluid">
                <div className="form container-fluid">  
                    <div className="signup-form container">
                        <Form title={"Cambiar Contraseña"} fields={resetPasswordForm} onSubmit={handleFormSubmit}/>
                        <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>
                    </div>
                </div>
                {loading && (
                    <Spinner isOpen={loading}/>
                )}
            </div>
        </main>
    )
}
export default ResetPassword;