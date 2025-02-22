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
    // Obtain URL code whit Use params 
    const { token } = useParams();

    // verify state message
    const [verificationStatus, setVerificationStatus] = useState('Verificando...');

    // validate function token
    const validateToken = async (oneToken) => {
        try {

            // axios query
            const response = await axios.get(`${Envs.API_BASE}session/verify/${oneToken}`);

            // Verify response 
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

    // validate when page loading
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
                        {/* show verify message state */}
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