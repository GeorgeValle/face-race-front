
/* View Warehouse (Depósito) whit modal New Item and Edit Item  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import Style from './WareHouse.module.css'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import TextViewItem from '../../components/textViews/textViewItem/TextViewItem'
import {TableCategoryItems} from '../../components/tables/tableCategoryItems/TableCategoryItems'
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
    const [categoryList, setCategoryList] = useState([]);
    const item = useSelector((state)=> state.item);
    
    
    const dispatch = useDispatch();

    
    
    

    
    

        const fetchItem = async() => {
            
            setIsListItems(false)
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

        

        const fetchListItems = async() => {
            
            setIsItem(false)
            setIsListItems(true)
            try{
                const request = await axios.get((`${config.API_BASE}item/category/${inputList}`))
                const response = request.data
                setCategoryList(response)
            }catch(error){
                setMessage("Artículo NO encontrado")
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


    const handleSubmitEdit=()=>{
        
        setIsListItems(false)
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
                                        <TextInputStyled placeholderText={"Ej: casco or guante "} typeInput={"text"} titleLabel="Categoría" value={inputList} onChange={(e) =>setInputList(e.target.value)} size={true} />
                                        <MiniBtn  onClick={fetchListItems} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
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