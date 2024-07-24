import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/textInput/TextInput'
import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'

import Style from './Lost_Password.module.css'

const Lost_Password = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar btnBack={true} miniTitle={"RECUPERE SU PASSWORD"}/>
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Email / Usuario"} nameLabel={"Usuario"} placeholderText={"micorreo@gmail.com  / miusuario"} />
                    </div>
                    <div className={Style.item2}>
                    <BtnVioletLarge>Enviar Link a su Email</BtnVioletLarge>   
                    </div>
                    <div className={Style.item3}>
                    <p className={Style.text_description}>* Se le enviará el link de recuperación a su Email en caso que concuerde</p>
                    </div>
                    <div className={Style.item4}>
                        
                    </div>
                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Lost_Password