

/* View Supplier (Proveedor) whit modal New Supplier and Edit Supplier  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import Style from './Supplier.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewSupplier from '../../components/textViews/textViewSupplier/TextViewSupplier'
import NewSupplierModal from '../../components/modals/newSupplierModal/NewSupplierModal'
import { createPortal } from 'react-dom'
import EditSupplierModal from '../../components/modals/editSupplierModal/EditSupplierModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
// import {useFetchGet} from '../../hooks/UseFetchGet'
import { useDispatch } from "react-redux";
import { addSupplier,/* changeClient,*/ deleteSupplier  } from "../../redux/SupplierSlice";
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from "../../config/Envs"



const Supplier = () => {

    

    const [modalOpenNewSupplier, setModalOpenNewModal] = useState(false);
    const [modalOpenEditSupplier, setModalOpenEditSupplier] = useState(false);
    const [message, setMessage] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //const [cliente, setCliente] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [inputCUIT, setInputCUIT] = useState("");
    const supplier = useSelector((state)=> state.supplier);
    
    
    const dispatch = useDispatch();

    
    
    

    
    

        const fetchSupplier = async() => {
        
            
            try{
                const request = await axios.get((`${config.API_BASE}supplier/cuit/${inputCUIT}`))
                const response = request.data
                dispatch(addSupplier(response.supplier))
            }catch(error){
                setMessage("Proveedor NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            
        }


    


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditSupplier(false);
        setModalOpenMessage(false);
    }


    const handleSubmitEdit=()=>{
        
        setModalOpenEditSupplier(false);
        setModalOpenMessage(true);
                    setMessage("Proveedor Editado")
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
        await axios.delete(`${config.API_BASE}supplier/cuit/${supplier.cuit}`)
        dispatch(deleteSupplier())
        setMessage("Proveedor Eliminado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }catch(error){
        console.log(error);
        setMessage("Proveedor NO encontrado")
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
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI o CUIT Proveedor" value={inputCUIT} onChange={(e) =>setInputCUIT(e.target.value)} />
                                        <MiniBtn onClick={fetchSupplier} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Proveedor" size={false} />
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
                            supplier&&<TextViewSupplier TheSupplier={supplier} onEdit={()=>setModalOpenEditSupplier(true)} onDelete={handleDeleteSupplier} />
                            
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