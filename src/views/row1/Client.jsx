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

    const client1={id:1,name:"Victor",surname:"Perez",date:"",email:"losespinos@gmail.com",dni:23456789,phone:3514585956,cel:234564554,address:"Pino 134",city:"Santa Fe",province:"Santa Fe" ,cp:"2542",obs:"Es un nuevo cliente"}
    
    //const { data, loading: fetchLoading, error: fetchError } = useFetchGet(`http://localhost:8080/api/client/dni/${dni}`);

    // useEffect(() => {
    //     setLoading(fetchLoading);
    //     setError(fetchError);
    //     setClient(data);
    // }, [data, fetchLoading, fetchError]);


    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:8080/api/client/dni/${dni}`)
            .then((response) => response.json())
            .then((json) => setClient(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
            console.log(client)
    }, [dni]);


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditClient(false);
        setModalOpenMessage(false);
    }

    const handleSubmitDNI=(e)=>{
        e.preventDefault();
        //const {data, error, loading} = useFetchGet(`http://localhost:8080/api/client/dni/${dni}`)

        useEffect(() => {
            setLoading(true)
            fetch(`http://localhost:8080/api/client/dni/${dni}`)
                .then((response) => response.json())
                .then((json) => setClient(json))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }, []);

        // setLoading(loading);
        // setError(error);
        // setClient(data);

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
                                    <form className={Style.article} onSubmit={handleSubmitDNI}>
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" value={dni} onChange={(e) => setDni(e.target.value)} />
                                        <MiniBtn btnType={"submit"} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </form>
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
                        <TextViewClient TheClient={client} />
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