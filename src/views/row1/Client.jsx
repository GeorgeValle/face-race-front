/* View Cliente whit modal New Client and modify client  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import InputTextSearchStyled from '../../components/inputs/inputTextSearchStyled/InputTextSearchStyled'
import Style from './Client.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewClient from '../../components/textViews/textViewClient/TextViewClient'
import NewClientModal from '../../components/modals/newClientModal/NewClientModal'
import { createPortal } from 'react-dom'
import EditClientModal from '../../components/modals/editClientModal/EditClientModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import Dialog from '../../components/modals/dialog/Dialog'
// import {useFetchGet} from '../../hooks/UseFetchGet'
import { useDispatch } from "react-redux";
import { addClient,/* changeClient,*/ deleteClient  } from "../../redux/ClientSlice";
import { useSelector } from 'react-redux';
import config from '../../config/Envs'
import axios from 'axios';



const Client = () => {

    

    const [modalOpenNewClient, setModalOpenNewModal] = useState(false);
    const [modalOpenEditClient, setModalOpenEditClient] = useState(false);
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("");
    const [messageButton, setMessageButton] = useState("");
    const [modalOpenDialog, setModalOpenDialog] = useState(false);
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [inputDNI, setInputDNI] = useState("");
    const [inputName, setInputName]= useState("");
    const [isClient, setIsClient] = useState(false);
    //const [isListCLient, setIsLIstClient] = useState(false);
    const client = useSelector((state)=> state.client);
    
    
    const dispatch = useDispatch();

    
    
    //const { data, loading: fetchLoading, error: fetchError } = useFetchGet(`${config.API_BASE}client/dni/${dni}`);

    // useEffect(() => {
    //     setLoading(fetchLoading);
    //     setError(fetchError);
    //     setClient(data);
    // }, [data, fetchLoading, fetchError]);

    
    

        const fetchClient = async() => {
            //setIsLIstClient(false)
            setIsClient(true)
            // setLoading(true)
            // await fetch(`${config.API_BASE}client/dni/${inputDNI}`)
            //     .then((response) => response.json())
            //     .then((json) => dispatch(addClient(json)))
            //     .catch((error) => setError(error))
            //     .finally(() => setLoading(false)); 
            try{
                const request = await axios.get((`${config.API_BASE}client/dni/${inputDNI}`))
                const response = request.data
                dispatch(addClient(response.data))
            }catch(error){
                setMessage("Cliente NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            


            // const request = await axios.post('${config.API_BASE}session/login', {
            //     email: email,
            //     password: password
            // })
            // const response =  request.data;
            // dispatch(addUser(response.user))
            // navigate('/panel')
        }

    


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditClient(false);
        setModalOpenMessage(false);
        
    }


    const handleSubmitEdit=()=>{
        
        //setIsClient(true)
        setModalOpenEditClient(false);
        setModalOpenMessage(true);
                    setMessage("Cliente Editado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }

    const handleSubmitNewClient= (message)=>{
        
        //setIsLIstClient(false)
        setIsClient(true)
        setModalOpenNewModal(false);
        
        setMessage(message);
        setModalOpenMessage(true);
        
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 4000);
                    
        
}

const fetchClientByLetters = async(letters) =>{

            try{
                const request = await axios.get((`${config.API_BASE}client/name/${letters}`))
                const response = request.data
                return response.client
            }catch(error){
                
                setMessage("Cliente NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);7
                return []
            }
        }        

        

const handleListResults = async(letters) =>{
        setInputName(letters)
        return await fetchClientByLetters(letters)
        
    }



const handleDialogDelete = () =>{
    setMessageModal("¿Seguro quieres Borrar al Cliente?");
    setMessageButton("Borrar");
    setModalOpenDialog(true);
}

const handleDeleteClient = async () => {
    setModalOpenDialog(false);
    try{
        const request = await axios.delete(`${config.API_BASE}client/dni/${client.dni}`)
        dispatch(deleteClient())

        setMessage(request.data.message)
    
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }catch(error){
        
        setMessage("Cliente NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }
    
}


return (
    <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"CLIENTE"} btnBack={true}/>
                {modalOpenEditClient&&createPortal(<EditClientModal onSubmit={handleSubmitEdit} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenNewClient&&createPortal(<NewClientModal onSubmit={handleSubmitNewClient} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                {modalOpenDialog&&(<Dialog messageModal={messageModal} messageConfirm={messageButton} onSubmit={handleDeleteClient} onClose={()=> setModalOpenDialog(false)}/>)}
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
                                        {/*<TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Cliente" size={false} /> */}
                                        <InputTextSearchStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Cliente" size={false} value={inputNameItem} onSearch={handleListResults} setOneResult={handleFetchOneItem} onChange={setInputNameItem}/>
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
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
                            {/* onEdit={()=>setModalOpenEditClient(true)} */}
                            {
                            isClient&&<TextViewClient TheClient={client} onEdit={()=>setModalOpenEditClient(true)} onDelete={handleDialogDelete} />
                            
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