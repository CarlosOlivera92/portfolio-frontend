import Form from '../../components/organisms/form/form';
import { signInForm } from '../../utils/form-utils/forms-config';
import { useState, useEffect } from 'react';
import { useApi } from '../../utils/api/useApi';
import './styles.css';
import Toast from '../../components/organisms/toast/toast';

const Signin = () => {
    const [errorApi, setErrorApi] = useState();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(null);
    const [formCompleted, setFormCompleted] = useState(false);
    const { loading, error, request, data } = useApi({
        apiEndpoint: "http://localhost:8080/api/auth/signin",
        httpVerb: "POST",
        data: formData
    });
    const [showToast, setShowToast] = useState(false);

    const sendRequest = async () => {
        try {
            const response = await request(); // Obtiene el response y los datos
            if (!response.ok) {
                console.log(response)
                throw new Error(`${response}`);
            }
            setErrorApi(false);
            setMessage("¡Inicio de sesión exitoso!");
        } catch (error) {
            alert(error.message)
            if (error.response) {
                // Error relacionado con la respuesta HTTP.
                setMessage(`HTTP Error: ${error.response.status} - ${error.response} adasdasas`);
            } else if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                // Error de conexión rechazada.
                setMessage('Error de conexión. Verifica que el servidor esté en ejecución.');
            } else {
                setMessage('Error en el inicio de sesión. Verifique que sus credenciales son correctas.');
            }
            setErrorApi(true);
        }
        setShowToast(true);
    };

    useEffect(() => {
        if (formCompleted && Object.keys(formData).length > 0) {
            sendRequest();
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
                    <div className="signup-form container">
                        <Form title={"Iniciar Sesión"} fields={signInForm} onSubmit={handleFormSubmit}/>
                        <Toast text={message} error={errorApi} showToasty={showToast} onToastClose={handleToastVisibility}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signin;
