import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/textInput/TextInput'
import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'
import LinkCommon from '../../components/linkCommon/LinkCommon'
import Style from './Login.module.css'

const Login = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar miniTitle={"BIENVENIDO"}/>
                <article className={Style.content}>
                    <div claseName={Style.item1}>
                        <TextInput  typeInput={"email"} isLabel={true} titleLabel={"Email"} nameLabel={"Email"} placeholderText={"micorreo@gmail.com"} />
                    </div>
                    <div claseName={Style.item2}>
                        <TextInput typeInput={"password"} isLabel={true} titleLabel={"Contraseña"} nameLabel={"Contraseña"} placeholderText={"***********"} />   
                    </div>
                    <div claseName={Style.item3}>
                        <BtnVioletLarge>Iniciar Sesión</BtnVioletLarge>
                    </div>
                    <div claseName={Style.item4}>
                        <LinkCommon>¿Has olvidado la contraseña?</LinkCommon>
                    </div>
                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Login