

/* View Supplier (Proveedor) whit modal New Supplier and Edit Supplier  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import InputTextSearchStyled from '../../components/inputs/inputTextSearchStyled/InputTextSearchStyled'
import Style from './Supplier.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewSupplier from '../../components/textViews/textViewSupplier/TextViewSupplier'
import NewSupplierModal from '../../components/modals/newSupplierModal/NewSupplierModal'
import { createPortal } from 'react-dom'
import EditSupplierModal from '../../components/modals/editSupplierModal/EditSupplierModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import Dialog from '../../components/modals/dialog/Dialog'
import {TableSupplierList} from '../../components/tables/tableSupplierList/TableSuppliersList'
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
    const [messageModal, setMessageModal] = useState("");
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [modalOpenDialog, setModalOpenDialog] = useState(false);
    const [openSupplier, setOpenSupplier] = useState(false);
    const [openSupplierList, setOpenSupplierList] = useState(false);
    //const [cliente, setCliente] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [inputCUIT, setInputCUIT] = useState("");
    const [inputList, setInputList] = useState("");
    const [inputName, setInputName] = useState("");
    const [list, setList] = useState([{}]);
    const supplier = useSelector((state)=> state.supplier);

    
    
    const dispatch = useDispatch();

        const fetchSupplier = async() => {
        
            setOpenSupplierList(false)
            setOpenSupplier(true)

            try{
                const request = await axios.get((`${config.API_BASE}supplier/cuit/${inputCUIT}`))
                const response = request.data
                dispatch(addSupplier(response.data))
            }catch(error){
                setMessage("Proveedor NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            
        }


        const fetchListSupplier = async() => {
            
            setOpenSupplier(false)
            setOpenSupplierList(true)
        
            try{
                const request = await axios.get((`${config.API_BASE}supplier/list/${inputList}`))
                const response = request.data

                console.log('Response-s:',response.suppliers )
                console.log('Response-r:',response)
                
                setList(response.suppliers)
                
                
            }catch(error){
                setMessage("Proveedores NO encontrados")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            
        }

        const fetchSuppliersByLetters = async(letters) =>{

            try{
                const request = await axios.get((`${config.API_BASE}supplier/list/${letters}`))
                const response = request.data
                return response.suppliers
            }catch(error){
                
                setMessage("Proveedor NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);7
                return []
            }
        }

        const cleanSupplier = () =>{
                dispatch(deleteSupplier()); //delete item of redux
                setInputCUIT("");
                setInputName("");
            }

        const handleInputCUIT = (e) => {
        setInputCUIT(e.target.value);
        }
        
        const handleOnKeySupplier = async (event) => {
            if (event.key === "Enter" || event.key === "Intro") {
            
            await fetchSupplier();
            
            }
        }

        const handleListResults = async(letters) =>{
        setInputName(letters)
        return await fetchSuppliersByLetters(letters)
        }

        const handleFetchOneSupplier = (OneSupplier)=>{
                    dispatch(addSupplier(OneSupplier))
                    setInputCUIT(OneSupplier.cuit)
                    setOpenSupplierList(false)
                    setOpenSupplier(true)
        }


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditSupplier(false);
        setModalOpenMessage(false);
        setModalOpenDialog(false);
    }


    const handleSubmitEdit=(message)=>{
        
        setModalOpenEditSupplier(false);
                    setMessage(message)
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }

    const handleSubmitNewSupplier= (message)=>{
        setOpenSupplierList(false)
        setOpenSupplier(true)
        setModalOpenNewModal(false);
        setMessage(message);
        
        setModalOpenMessage(true);
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 4500);
                    
        
}



const handleDialogDelete = () =>{
    setMessageModal("¿Seguro quieres Borrar al Proveedor?");
    setMessageDialog("Borrar");
    setModalOpenDialog(true);
}

const handleDeleteSupplier = async () => {
        setModalOpenDialog(false);
    try{
        await axios.delete(`${config.API_BASE}supplier/cuit/${supplier.cuit}`)
        dispatch(deleteSupplier())
        setMessage("Proveedor Borrado")
       
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
                {modalOpenDialog&&(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDeleteSupplier} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                
                                <article className={Style.separate}>
                                    
                                    <BtnCommon title={"Registrar"} onClick={()=>setModalOpenNewModal(true)} colorViolet={true}> <FontAwesomeIcon icon={faPlus}/></BtnCommon>
                                    <div className={Style.article} >
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI o CUIT Proveedor" value={inputCUIT} onChange={handleInputCUIT} onKey={handleOnKeySupplier} />
                                        <MiniBtn onClick={fetchSupplier} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        {/* <TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Proveedor" size={false} /> */}
                                        <InputTextSearchStyled placeholderText={"Ej: Lona Flex "} typeInput={"text"} titleLabel="Nombre Proveedor" size={false} value={inputName} onSearch={handleListResults} setOneResult={handleFetchOneSupplier} onChange={setInputName} displayFields={["businessName","companyName"]}/>
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: aba or moto "} typeInput={"text"} titleLabel="Listado" value={inputList} onChange={(e) =>setInputList(e.target.value)} size={true} />
                                        <MiniBtn  onClick={fetchListSupplier} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
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
                                openSupplier&&<TextViewSupplier TheSupplier={supplier} onEdit={()=>setModalOpenEditSupplier(true)} onDelete={handleDialogDelete} />
                            
                            }
                            {
                                openSupplierList&&<TableSupplierList rows={list || []}/>
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