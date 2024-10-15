

/* View Supplier (Proveedor) whit modal New Supplier and Edit Supplier  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import Style from './Client.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewClient from '../../components/textViews/textViewClient/TextViewClient'
import NewSupplierModal from '../../components/modals/newSupplierModal/NewSupplierModal'
import { createPortal } from 'react-dom'
import EditSupplierModal from '../../components/modals/editClientModal/EditClientModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
// import {useFetchGet} from '../../hooks/UseFetchGet'
import { useDispatch } from "react-redux";
import { addClient,/* changeClient,*/ deleteClient  } from "../../redux/ClientSlice";
import { useSelector } from 'react-redux';
import axios from 'axios';



const Supplier = () => {

    

    const [modalOpenNewSupplier, setModalOpenNewModal] = useState(false);
    const [modalOpenEditSupplier, setModalOpenEditSupplier] = useState(false);
    const [message, setMessage] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //const [cliente, setCliente] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [inputDNI, setInputDNI] = useState("");
    const client = useSelector((state)=> state.client);
    
    
    const dispatch = useDispatch();

    
    
    //const { data, loading: fetchLoading, error: fetchError } = useFetchGet(`http://localhost:8080/api/client/dni/${dni}`);

    // useEffect(() => {
    //     setLoading(fetchLoading);
    //     setError(fetchError);
    //     setClient(data);
    // }, [data, fetchLoading, fetchError]);

    
    

        const fetchSupplier = async() => {
        
            // setLoading(true)
            // await fetch(`http://localhost:8080/api/client/dni/${inputDNI}`)
            //     .then((response) => response.json())
            //     .then((json) => dispatch(addClient(json)))
            //     .catch((error) => setError(error))
            //     .finally(() => setLoading(false)); 
            try{
                const request = await axios.get((`http://localhost:8080/api/client/dni/${inputDNI}`))
                const response = request.data
                dispatch(addClient(response.client))
            }catch(error){
                setMessage("Cliente NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            


            // const request = await axios.post('http://localhost:8080/api/session/login', {
            //     email: email,
            //     password: password
            // })
            // const response =  request.data;
            // dispatch(addUser(response.user))
            // navigate('/panel')
        }

   
    


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditSupplier(false);
        setModalOpenMessage(false);
    }


    const handleSubmitEdit=()=>{
        
        setModalOpenEditSupplier(false);
        setModalOpenMessage(true);
                    setMessage("Cliente Editado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }

    const handleSubmitNewSupplier= (message)=>{
        
        setMessage(message);
        setModalOpenNewModal(false);
        setModalOpenMessage(true);
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
                    
        
}

const handleDeleteSupplier = async () => {

    try{
        await axios.delete(`http://localhost:8080/api/client/dni/${client.dni}`)
        dispatch(deleteClient())
        setMessage("Cliente Eliminado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }catch(error){
        console.log(error);
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
                <MiniNavBar miniTitle={"Proveedor"} btnBack={true}/>
                {modalOpenEditSupplier&&createPortal(<EditSupplierModal onSubmit={handleSubmitEdit} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenNewSupplier&&createPortal(<NewSupplierModal onSubmit={handleSubmitNewSupplier} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                
                                <article className={Style.separate}>
                                    
                                    <BtnCommon title={"Registrar"} onClick={()=>setModalOpenNewModal(true)} colorViolet={true}> <FontAwesomeIcon icon={faPlus}/></BtnCommon>
                                    <div className={Style.article} >
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" value={inputDNI} onChange={(e) =>setInputDNI(e.target.value)} />
                                        <MiniBtn onClick={fetchSupplier} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Cliente" size={false} />
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
                            client&&<TextViewClient TheClient={client} onEdit={()=>setModalOpenEditSupplier(true)} onDelete={handleDeleteSupplier} />
                            
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

export default Supplier