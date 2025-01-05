import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/container/Container';
import MiniNavBar from '../../components/miniNavbar/MIniNavBar';
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge';
import Style from './Verify.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Envs from '../../config/Envs';

const Verify = () => {
    // Obtener el código de la URL usando useParams
    const { token } = useParams();

    // Estado para manejar el mensaje de verificación
    const [verificationStatus, setVerificationStatus] = useState('Verificando...');

    // Función para validar el código
    const validateToken = async (oneToken) => {
        try {
            // Hacer la solicitud fetch a tu API
            // const response = await fetch(`https://tu-api.com/verify?code=${code}`);
            // const data = await response.json();

            // if (data.success) {
            //     setVerificationStatus('Cuenta verificada');
            // } else {
            //     setVerificationStatus('Cuenta no verificada');
            // }

            // Hacer la solicitud con Axios
            const response = await axios.get(`${Envs.API_BASE}session/verify/${oneToken}`);

            // Verificar la respuesta
            if (response.data.validated) {
                setVerificationStatus('Cuenta verificada');
            } else {
                setVerificationStatus('Cuenta no verificada');
            }
        } catch (error) {
            console.error('Error al validar el token:', error);
            setVerificationStatus('Error en la verificación');
        }
    };

    // Ejecutar la validación cuando el componente se monta
    useEffect(() => {
        if (token) {
            validateToken(token);
        }else{
            setVerificationStatus('No hay token para verificar');
        }
    }, [token]);

    return (
        <div style={{ width: "876px", height: "700px", margin: "auto" }}>
            <Container>
                <MiniNavBar miniTitle={"Verificación"} />
                <article className={Style.content}>
                    <div className={Style.item1}>
                        {/* Mostrar el estado de la verificación */}
                        <p className={Style.text_description} >{verificationStatus}</p>
                    </div>
                    <div className={Style.item2}>
                        <Link to='/'><BtnVioletLarge>Iniciar Sesión</BtnVioletLarge></Link>
                    </div>
                </article>
            </Container>
        </div>
    );
};

export default Verify;