import { useState /*, useEffect */ } from 'react'
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/inputs/textInput/TextInput'
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge'
import LinkCommon from '../../components/linkCommon/LinkCommon'
//import { useNavigate } from 'react-router-dom';
import Style from './Register.module.css'
import axios from 'axios' 
import Envs from '../../config/Envs'
import MessageModal from '../../components/modals/messageModal/MessageModal'


const Register = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("Usuario o contraseña incorrectos");
    const [modalMessage, setModalMessage]= useState({message:""})
    const [showModal, setShowModal] = useState(false);

    
    const handleRegisterEvent = async (e) => {
        e.preventDefault();
        if(password==confirmPassword){
            try {
                setError("")
                const request = await axios.post(`${Envs.API_BASE}session/register`, {
                        email: email,
                        password: password,
                        name: name,
                        surname: surname,
                    })
                    const response =  request.data;
                    setModalMessage(response.message)
                    setShowModal(true)
                    //navigate('/panel')
                    //console.log(response.user.access)

            } catch (er) {
                setModalMessage(er);
                setError(er);


            }
        }else{
            setMessage("Las contraseñas no coinciden");
            setError("1");
            
        }
    }

    const CloseMessageModal = () =>{
        setShowModal(false)
    }
    
    return(
        <div style={{ width: "1300px", heigth: "700px", margin: "auto" }}>
            <Container>
                <MiniNavBar miniTitle={"REGISTRO"} />
                {showModal&&(<MessageModal onClose={CloseMessageModal} messageModal={modalMessage.message} />)}
                <form onSubmit={handleRegisterEvent}>
                    <article className={Style.content}>
                        <div className={Style.item1}>
                            <TextInput typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"email"} value={email} placeholderText={"micorreo@gmail.com"} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={Style.item2}>
                            <TextInput typeInput={"password"} isLabel={true} titleLabel={"Contraseña"} value={password} nameLabel={"password"} placeholderText={"***********"} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={Style.item3}>
                            <TextInput typeInput={"password"} isLabel={true} titleLabel={"Repíte la Contraseña"} value={confirmPassword} nameLabel={"confirmPassword"} placeholderText={"***********"} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className={Style.item4}>
                            <TextInput typeInput={"text"} isLabel={true} titleLabel={"Nombre"} nameLabel={"name"} value={name} placeholderText={"Juan"} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={Style.item5}>
                            <TextInput typeInput={"text"} isLabel={true} titleLabel={"Apellido"} nameLabel={"surname"} value={surname} placeholderText={"Lopez"} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                        <div className={Style.item6}>
                            {<BtnVioletLarge  btnType={"submit"}>Registrarse</BtnVioletLarge>}
                        </div>
                        <div className={Style.item7}>
                            {error&&(<p className={Style.itemError}>{message}</p>)}  
                        </div>
                        <div className={Style.item8}>
                            <LinkCommon link={"/"}>¿Ya tiene cuenta? Click Aquí </LinkCommon>                            
                        </div>
                        <div className={Style.item9}>
                            <LinkCommon >Click aquí si necesita reenviar el Email de activación</LinkCommon>
                        </div>
                    </article>
                </form>
            </Container>
        </div>
    )

}

export default Register;