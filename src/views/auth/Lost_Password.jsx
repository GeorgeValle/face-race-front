import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import TextInput from '../../components/inputs/textInput/TextInput'
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge'
import axios from 'axios'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import Envs from '../../config/Envs'

import Style from './Lost_Password.module.css'
import { useState } from 'react'

const Lost_Password = () =>{

    const [email, setEmail] = useState("")
    const [modalMessageText, setModalMessageText] = useState({message:""});
    const [showModal, setShowModal] = useState(false)

    const handleFetchEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handleSubmitEmailToReset = async () =>{
        try{
            const request = await axios.post(`${Envs.API_BASE}session/restart`, {
                email: email,
            })
            const response =  request.data;
            setModalMessageText(response.message)
            setShowModal(true)
            }catch(err){
                console.log(err);
            }
    }

    const CloseMessageModal = () =>{
        setShowModal(false);
    }

    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar btnBack={true} miniTitle={"RECUPERE SU PASSWORD"}/>
                {showModal&&(<MessageModal onClose={CloseMessageModal} messageModal={modalMessageText.message} />)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Email / Usuario"} value={email} onChange={handleFetchEmail} nameLabel={"Usuario"} placeholderText={"micorreo@gmail.com"} />
                    </div>
                    <div className={Style.item2}>
                    <BtnVioletLarge onClick={handleSubmitEmailToReset} >Enviar Link a su Email</BtnVioletLarge>   
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