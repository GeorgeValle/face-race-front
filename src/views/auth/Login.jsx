import { useState, useEffect } from 'react'
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

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
            try{
                await axios.post('http://localhost:8080/api/session/login', {
                    email: user.email,
                    pasword: user.password
                })
                .then((response)=>response.json)
                .then((data)=>dispatch(addUser(data)))
                .catch((error)=>console.log(error))
            }catch(error){
                console.log(error);
            }
        navigate('/panel')
    }



    return (

        <div style={{ width: "876px", heigth: "700px", margin: "auto" }}>
            <Container>
                <MiniNavBar miniTitle={"BIENVENIDO"} />
                <form>
                    <article className={Style.content}>
                        <div className={Style.item1}>
                            <TextInput typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"email"} value={email}  placeholderText={"micorreo@gmail.com"} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className={Style.item2}>
                            <TextInput typeInput={"password"} isLabel={true} titleLabel={"Contraseña"} value={password} nameLabel={"password"} placeholderText={"***********"} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className={Style.item3}>
                            { <BtnVioletLarge onClick={()=>handleSubmit /*() => navigate('/panel')*/}>Iniciar Sesión</BtnVioletLarge> }
                        </div>
                        <div className={Style.item4}>
                            <LinkCommon>¿Has olvidado la contraseña?</LinkCommon>
                        </div>
                    </article>
                </form>
            </Container>
        </div>
    )
}

export default Login