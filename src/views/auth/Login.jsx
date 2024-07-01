import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MiniNavBar'
import TextInput from '../../components/textInput/TextInput'
import StyleLogin from './Login.module.css'

const Login = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
        <Container>
            <MiniNavBar miniTitle={"BIENVENIDO"}/>
            <div className={StyleLogin.content}>
                <TextInput typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"Email"} placeholderText={"micorreo@gmail.com"} />
            </div>
            

        </Container>

        </div>
    )
}

export default Login