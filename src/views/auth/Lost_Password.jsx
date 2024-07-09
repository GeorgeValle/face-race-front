import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/textInput/TextInput'
import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'
import LinkCommon from '../../components/linkCommon/LinkCommon'
import Style from './Lost_Password.module.css'

const Lost_Password = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar miniTitle={"RECUPERE SU PASSWORD"}/>
                <article className={Style.content}>
                    <div claseName={Style.item1}>
                        <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Email / Usuario"} nameLabel={"Usuario"} placeholderText={"micorreo@gmail.com  / miusuario"} />
                    </div>
                    <div claseName={Style.item2}>
                    <BtnVioletLarge>Enviar Link a su Email</BtnVioletLarge>   
                    </div>
                    <div claseName={Style.item3}>
                    <p className={Style.text_description}>* Se le enviará el link de recuperación a su Email en caso que concuerde</p>
                    </div>
                    <div claseName={Style.item4}>
                        
                    </div>
                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Lost_Password