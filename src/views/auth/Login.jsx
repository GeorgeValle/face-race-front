import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/textInput/TextInput'
import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'
import StyleLogin from './Login.module.css'

const Login = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar miniTitle={"BIENVENIDO"}/>
                <article className={StyleLogin.content}>
                    <div claseName={StyleLogin.item1}></div>
                    <div claseName={StyleLogin.item2}>
                        <TextInput  typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"Email"} placeholderText={"micorreo@gmail.com"} /></div>
                        <div claseName={StyleLogin.item3}></div>
                        <div claseName={StyleLogin.item4}></div>
                    <div claseName={StyleLogin.item5}>
                        <TextInput typeInput={"password"} isLabel={true} titleLabel={"Contraseña"} nameLabel={"Contraseña"} placeholderText={"***********"} /></div>
                        <div claseName={StyleLogin.item6}></div>
                        <div className={StyleLogin.item7}></div>
                    <div claseName={StyleLogin.item8}><BtnVioletLarge>Ingresar</BtnVioletLarge></div>
                    <div className={StyleLogin.item9}></div>
                </article>
                
                <div className={StyleLogin.buttons}>
                        
                </div>      
            </Container>
        </div>
    )
}

export default Login