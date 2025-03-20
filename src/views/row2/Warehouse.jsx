
/* View Warehouse (Depósito) whit modal New Item and Edit Item  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import InputSelectStyled from '../../components/inputs/inputSelectStyled/InputSelectStyled'
import Style from './WareHouse.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus, faTruck/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewItem from '../../components/textViews/textViewItem/TextViewItem'
import {TableCategoryItems} from '../../components/tables/tableCategoryItems/TableCategoryItems'
import { TableReorderPoint } from '../../components/tables/tableReorderPoint/TableReorderPoint'
import NewItemModal from '../../components/modals/newItemModal/NewItemModal'
import { createPortal } from 'react-dom'
import EditItemModal from '../../components/modals/editItemModal/EditItemModal'
import MessageModal from '../../components/modals/messageModal/MessageModal'
// import {useFetchGet} from '../../hooks/UseFetchGet'
import { useDispatch } from "react-redux";
import { addItem,/* changeClient,*/ deleteItem  } from "../../redux/ItemSlice";
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from "../../config/Envs"
import { handleError } from '../../config/ErrorHandling'
//import TextViewItem from '../../components/textViews/textViewItem/TextViewItem'



const Warehouse = () => {

    

    const [modalOpenNewItem, setModalOpenNewModal] = useState(false);
    const [modalOpenEditItem, setModalOpenEditItem] = useState(false);
    const [message, setMessage] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //const [cliente, setCliente] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [inputCode, setInputCode] = useState("");
    const [inputList, setInputList] = useState("");
    const [isListItems, setIsListItems] = useState(false);
    const [isItem, setIsItem ] = useState(false);
    const [isReorderPointList, setIsReorderPointList]= useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [reorderPointList, setReorderPointList] = useState([]);
    const item = useSelector((state)=> state.item);
    
    
    const dispatch = useDispatch();

    
    const handleErrors = (error) =>{

        if(error === 'ECONNREFUSED' ){
            setMessage("Error de conexión con el servidor")
        }
        if(error.status=== 500){
            setMessage("Error interno del servidor")
        }
        if(error.status === 404){
            setMessage("No se encontró el recurso solicitado")
            }
            if(error.status === 401){
                setMessage("No tienes permisos para realizar esta acción")
                }
                if(error.status === 422){
                    setMessage("Error de validación")
                    }
                    if(error.status === 403){
                        setMessage("No tienes permisos para realizar esta acción")
                        }
                        if(error.status === 400){
                            setMessage("Error de validación")
                            }
                            if(error.status === 409){
                                setMessage("El recurso ya existe")
                                }
                                error


    }
    

    
    

        const fetchItem = async() => {
            
            setIsListItems(false)
            setIsReorderPointList(false)
            setIsItem(true)
            
            try{
                const request = await axios.get((`${config.API_BASE}item/code/${inputCode}`))
                const response = request.data
                dispatch(addItem(response.item))
            }catch(error){
                setMessage("Artículo NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
            
            
        }

        

        const fetchListItems = async(category) => {
            
            setIsItem(false)
            setIsReorderPointList(false)
            setIsListItems(true)
            try{
                const request = await axios.get((`${config.API_BASE}item/category/${category}`))
                const response = request.data
                setCategoryList(response)
            }catch(error){
                setMessage(handleError(error)||"Artículo NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
        }

        const fetchReorderPointList = async() =>{

            try{
                const request = await axios.get((`${config.API_BASE}item/reorder/`))
                const response = request.data
                
                if(response.length==0){
                    setMessage("No hay items con punto de re ordenar")
                    setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
                }else{
                setReorderPointList(response)
                setIsReorderPointList(true)
                }
            }catch(error){
                setMessage(`${handleError(error)}`)
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
            }
        }


    const handleClose=()=>{
        setModalOpenNewModal(false);
        setModalOpenEditItem(false);
        setModalOpenMessage(false);
    }


    const handleFetchCategory= async(category)=>{
        if(category!==""){
        setInputList(category);
        await fetchListItems(category);
        }


    }
    const handleSubmitEdit=()=>{
        
        setIsListItems(false)
        setIsReorderPointList(false)
        setIsItem(true)

        setModalOpenEditItem(false);
        setModalOpenMessage(true);
                    setMessage("Artículo Editado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }

    const handleSubmitNewItem= (message)=>{
        setIsListItems(false)
        setIsItem(true)
        
        setMessage(message);
        setModalOpenNewModal(false);
        setModalOpenMessage(true);
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
                    
        
}

const handleDeleteItem = async () => {

    try{
        await axios.delete(`${config.API_BASE}item/code/${item.code}`)
        dispatch(deleteItem())
        setMessage("Artículo Eliminado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }catch(error){
        console.log(error);
        setMessage("Artículo NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
    }
    
}

const handleReorderPointList = () =>{
    setIsItem(false)
    setIsListItems(false)
    setIsReorderPointList(true)
    fetchReorderPointList();
}

//to du
const categories =[{label:"Selecciona una opción",value:""},{label:"Indumentaria", value:'Indumentaria'}, {label:'Protección Personal',value:'Protección Personal'}, {label:'Equipaje', value:'Equipaje'}, {label:'Lingas y Trabas', value:'Lingas y Trabas'}, {label:'Luces', value:"Luces"}, {label:'Cobertores', value:'Cobertores'},{label:'Redes y sujetadores', value:'Redes y sujetadores'},{label:'Parlantes',value:'Parlantes'},{label:'Parabrisas',value:'Parabrisas'},{label:'Herramientas',value:'Herramientas'},{label:'Emblemas',value:'Emblemas'},{label:'Tableros y Velocimetros',value:'Tableros y Velocimetros'},{label:'Pisadores', value:'Pisadores'},{label:'Escapes',value:'Escapes'},{label:'Frenos',value:'Frenos'},{label:'Repuestos',value:'Repuestos'},{label:'Servicios',value:'Servicios'},{label:'Otros',value:'Otros'}];
return (
    <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Depósito"} btnBack={true}/>
                {modalOpenEditItem&&createPortal(<EditItemModal onSubmit={handleSubmitEdit} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenNewItem&&createPortal(<NewItemModal onSubmit={handleSubmitNewItem} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                
                                <article className={Style.separate}>
                                    
                                    <BtnCommon title={"Registrar"} onClick={()=>setModalOpenNewModal(true)} colorViolet={true}> <FontAwesomeIcon icon={faPlus}/></BtnCommon>
                                    <div className={Style.article} >
                                        <TextInputStyled placeholderText={"Ej: 01122344"} typeInput={"number"} titleLabel="Código del Artículo" value={inputCode} onChange={(e) =>setInputCode(e.target.value)} />
                                        <MiniBtn onClick={fetchItem} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: Casco Italy "} typeInput={"text"} titleLabel="Nombre Artículo" size={false} />
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        {/* <TextInputStyled placeholderText={"Ej: casco or guante "} typeInput={"text"} titleLabel="Categoría" value={inputList} onChange={(e) =>setInputList(e.target.value)} size={true} />
                                        <MiniBtn  onClick={fetchListItems} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn> */}
                                        <InputSelectStyled defaultValue={inputList} onSetValue={handleFetchCategory} onLabel={"Categoría"} options={categories} />
                                    </div>
                                    <div className={Style.article}>
                                        <MiniBtn onClick={handleReorderPointList}><FontAwesomeIcon icon={faTruck} /></MiniBtn>
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
                                isItem&&<TextViewItem TheItem={item} onEdit={()=>setModalOpenEditItem(true)} onDelete={handleDeleteItem} />
                            }
                            
                            {
                                isListItems&&(<TableCategoryItems rows={categoryList} />)
                            }
                            
                            {
                                isReorderPointList&&(<TableReorderPoint rows={reorderPointList} />)
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

export default Warehouse