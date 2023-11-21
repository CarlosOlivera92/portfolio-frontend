import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {useUser} from '../../utils/context/userContext';
import { useApi } from '../../utils/api/useApi';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
import PersonalArea from './personal/personal';
import Home from './home/home';
import Settings from './settings/settings';
import './styles.css';
const Portfolio = () => {
    const {setUser} = useUser();
    const { isAuthenticated } = useAuth;
    const {username} = useParams();
    const [userData, setUserData] = useState([]);
    const config = {
        httpVerb: "GET",
    };
    const { loading, error, request, data } = useApi();

    const getUser = async (endpoint) => {
        try {
            const response = await request(endpoint, config, isAuthenticated);
            if (!response.ok) {
                throw response;
            }
            try {
                const responseBody = await response.json();
                setUserData(responseBody);
                setUser(responseBody);
            } catch (error) {
                console.error("Error al parsear la respuesta JSON:", error);
            }
        } catch (error) {
            if (error.status === 500) {
                console.log(error)
            } else if (error.status === 403) {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        getUser(`http://localhost:8080/api/users/user/${username}`);
    
    }, []);
    return (
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/personal" element={<PersonalArea />} />
                <Route path='/settings' element={<Settings/>} />
            </Routes>
        </div>
    )
}
export default Portfolio;