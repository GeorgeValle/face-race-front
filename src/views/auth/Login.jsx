import { useState /*, useEffect */ } from 'react'
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/inputs/textInput/TextInput'
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge'
import LinkCommon from '../../components/linkCommon/LinkCommon'
import { useNavigate } from 'react-router-dom';
import Style from './Login.module.css'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/UserSlice";
import Envs from '../../config/Envs'


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        try {
            setError("")
            const request = await axios.post(`${Envs.API_BASE}session/login`, {
                    email: email,
                    password: password
                })
                const response =  request.data;
                dispatch(addUser(response.user))
                navigate('/panel')
                

        } catch (er) {
            setError(er);
        }
        
    }



    return (

        <div style={{ width: "876px", heigth: "700px", margin: "auto" }}>
            <Container>
                <MiniNavBar miniTitle={"BIENVENIDO"} />
                <form onSubmit={handleLoginEvent}>
                    <article className={Style.content}>
                        <div className={Style.item1}>
                            <TextInput typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"email"} value={email} placeholderText={"micorreo@gmail.com"} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={Style.item2}>
                            <TextInput typeInput={"password"} isLabel={true} titleLabel={"Contraseña"} value={password} nameLabel={"password"} placeholderText={"***********"} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={Style.item3}>
                            {<BtnVioletLarge  btnType={"submit"}>Iniciar Sesión</BtnVioletLarge>}
                        </div>
                        <div className={Style.item4}>
                            
                            <LinkCommon link={"/lost_password"}>¿Has olvidado la contraseña? Cambiala</LinkCommon>
                            
                        </div>
                        <div className={Style.item5}>
                            <LinkCommon link={"/register"}>¿No tienes cuenta? Registrate</LinkCommon>
                        </div>
                        <div >
                        {error&&(<p className={Style.item6}>Usuario o contraseña incorrectos</p>)}
                        </div>
                    </article>
                </form>
            </Container>
        </div>
    )
}

export default Login