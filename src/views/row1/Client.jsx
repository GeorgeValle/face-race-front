/* View Cliente whit modal New Client and modify client  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import Style from './Client.module.css'
import { useState, useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, faPlus, faPencil} from "@fortawesome/free-solid-svg-icons"
import TextViewClient from '../../components/textViews/textViewClient/TextViewClient'
import NewClientModal from '../../components/modals/newClientModal/NewClientModal'
import { createPortal } from 'react-dom'
import EditClientModal from '../../components/modals/editClientModal/EditClientModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import {useFetchGet} from '../../hooks/UseFetchGet'



const Client = () => {
    const [modalOpenNewClient, setModalOpenNewModal] = useState(false);
    const [modalOpenEditClient, setModalOpenEditClient] = useState(false);
    const [message, setMessage] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [dni, setDni] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [client, setClient] = useState({});
    const [inputDNI, setInputDNI] = useState("");
    const [results, setResults] = useState([]);

    //const client1={_id:1,name:"Victor",surname:"Perez",email:"losespinos@gmail.com",dni:23456789,phone:3514585956,cel:234564554,address:"Pino 134",city:"Santa Fe",province:"Santa Fe" ,postalCode:"2542",description:"Es un nuevo cliente"}
    
    //const { data, loading: fetchLoading, error: fetchError } = useFetchGet(`http://localhost:8080/api/client/dni/${dni}`);

    // useEffect(() => {
    //     setLoading(fetchLoading);
    //     setError(fetchError);
    //     setClient(data);
    // }, [data, fetchLoading, fetchError]);

    


    
    const fetchClient = async() => {
        if(inputDNI){
        setLoading(true)
        await fetch(`http://localhost:8080/api/client/dni/${inputDNI}`)
            .then((response) => response.json())
            .then((json) => setClient(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        }
            
    }


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditClient(false);
        setModalOpenMessage(false);
    }


    const handleSubmitEdit=(messageModal)=>{
        setMessage(messageModal);
        setModalOpenEditClient(false);
        setModalOpenMessage(true);
        const timer = setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
    }

    const handleSubmitNewClient=(messageModal)=>{
        setMessage(messageModal);
        setModalOpenNewModal(false);
        setModalOpenMessage(true);
        const timer = setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
    }



return (
    <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"CLIENTE"} btnBack={true}/>
                {modalOpenEditClient&&createPortal(<EditClientModal onSubmit={handleSubmitEdit} onCancel={handleClose} onClose={handleClose} client={client1} />,document.body)}
                {modalOpenNewClient&&createPortal(<NewClientModal onSubmit={handleSubmitNewClient} onCancel={handleClose} onClose={handleClose} />,document.body)}
                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                
                                <article className={Style.separate}>
                                    
                                    <BtnCommon title={"Registrar"} onClick={()=>setModalOpenNewModal(true)} colorViolet={true}> <FontAwesomeIcon icon={faPlus}/></BtnCommon>
                                    <div className={Style.article} >
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" value={inputDNI} onChange={(e) =>setInputDNI(e.target.value)} />
                                        <MiniBtn onClick={fetchClient} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Cliente" size={false} />
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <BtnCommon title={"Editar"} onClick={()=>setModalOpenEditClient(true)} colorViolet={true}> <FontAwesomeIcon icon={faPencil}/></BtnCommon>
                                </article> 
                                
                            </div>
                            <div className={Style.article}>
                                
                            </div>
                            <div className={Style.article}>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        
                            
                            {/* <TextViewClient TheClient={client1} /> */}
                            {
                            client &&<TextViewClient TheClient={client}/>
                            }
                        
                    </div>
                    <div className={Style.item3}>
                        <article>
                    
                        </article> 
                    </div>
                    <div className={Style.item4}>
                        
                    </div>
                </article>
                    
            </Container>
        </div>

    )
}

export default Client