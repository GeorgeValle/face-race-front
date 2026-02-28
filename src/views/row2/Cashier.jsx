import Container from '../../components/container/Container';
import MiniNavBar from '../../components/miniNavbar/MIniNavBar';
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon';
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled';
import InputTextSearchStyled from '../../components/inputs/inputTextSearchStyled/InputTextSearchStyled';
import MidTotal from '../../components/totals/midTotal/MidTotal';
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge';
import InputSelectDateStyled from '../../components/inputs/inputSelectDateStyled/InputSelectDateStyled'
import Style from './Cashier.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTruck, faWallet, faXmark,faBox , faPencil, faMagnifyingGlass, faBroomBall } from "@fortawesome/free-solid-svg-icons";
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation';
import MessageModal from '../../components/modals/messageModal/MessageModal';
import NewSupplierModal from '../../components/modals/newSupplierModal/NewSupplierModal'
import ItemModal from '../../components/modals/itemPurchaseModal/ItemModal';
import NewItemModal from '../../components/modals/newItemModal/NewItemModal'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { addItem, deleteItem, updatePrice, subtractStock } from "../../redux/ItemSlice";
import { addItems, removeItem, clearItems, updateItemQuantity } from '../../redux/ItemsListSlice';
import { useDispatch, useSelector } from "react-redux";
import { addSupplier, deleteSupplier } from "../../redux/SupplierSlice";
import { NavLink } from "react-router-dom";
import config from "../../config/Envs"
import axios from "axios";


const Cashier = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalItemOpen, setModalItemOpen] = useState(false);
    const [modalSupplierOpen, setModalSupplierOpen] = useState(false);
    const [modalOpenNewItem, setModalOpenNewItem] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [totalSubAmount, setTotalSubAmount] = useState(0.00);
    const [totalAdjustment, setTotalAdjustment] = useState(0.00);
    const [totalFake, setTotalFake] = useState(0);
    const [inputCUIT, setInputCUIT] = useState("")
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //colocar el open modal
    const [message, setMessage] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputItemName, setInputItemName] = useState("")
    const [inputNameSupplier, setInputNameSupplier] = useState("")
    const [isFetchSupplier, setIsFetchSupplier] = useState(false);
    //const [isDataItem, setIsDataItem] = useState(false);
    //date
    // const [day, setDay] = useState('');
    // const [month, setMonth] = useState('');
    // const [year, setYear] = useState('');
    // const [days, setDays] = useState([]);
    // const [months, setMonths] = useState([]);
    // const [years, setYears] = useState([])
    

    //Variables Redux
    const supplier = useSelector((state) => state.supplier);
    const item = useSelector((state) => state.item);
    const itemsList = useSelector((state) => state.itemsList);
    const dispatch = useDispatch();



    // fetching data

    const fetchItem = async (code= null) => {
        const codeToFetch = code || inputCode
        try {
            const request = await axios.get((`${config.API_BASE}item/code/${codeToFetch}`))
            const response = request.data
            dispatch(addItem(response.item))
            setInputItemName(`${response.item.name} ${response.item.brand}`)
        
        } catch (error) {
            setMessage("Artículo NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage();
            }, 3500);
        }
    }

    const fetchSupplier = async (cuit=null) => {
        const cuitToFetch = cuit || inputCUIT;
        try {
            const request = await axios.get((`${config.API_BASE}supplier/cuit/${cuitToFetch}`))
            const response = request.data
            dispatch(addSupplier(response.data))
            setInputNameSupplier(`${response.data.businessName}, Alias: ${response.data.companyName}`)
            
            if (response.data) {
                setIsFetchSupplier(true);

            }
        } catch (error) {
            setMessage("Proveedor NO encontrado")
            MessageResponse(message);
        }
    }

    const handleEditStockItem = async (code, quantity) => {
        try {
            await axios.put(`${config.API_BASE}item/stock/${code}`, {
                stockQuantity: quantity,
            });

        } catch (error) {
            
            setMessage('Error al actualizar el Stock')
            MessageResponse();
        }
    };

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

    

    const handleSupplierListResults = async(letters) =>{
            setInputNameSupplier(letters)
            return await fetchSuppliersByLetters(letters)
            }
    
    const handleFetchOneSupplier = async (OneSupplier)=>{
                // dispatch(addSupplier(OneSupplier))
                setInputCUIT(OneSupplier.cuit)
                await fetchSupplier(OneSupplier.cuit)
                //setOpenSupplierList(false)
                //setOpenSupplier(true)
    }

    // function for clean items of redux and input
    const cleanItem = () =>{
    dispatch(deleteItem()); //delete item of redux
        setInputCode("");
        setInputItemName("");
    }

    const cleanSupplier = () =>{
        dispatch(deleteSupplier()); //delete item of redux
        setInputCUIT("");
        setInputNameSupplier("");
    }

    const handleListResults = async(letters) =>{
        setInputItemName(letters)
        return await fetchItemsByLetters(letters)
        
    }

    const fetchItemsByLetters = async(letters) =>{

            try{
                const request = await axios.get((`${config.API_BASE}item/name/${letters}`))
                const response = request.data
                return response.item
            }catch(error){
                
                setMessage("Artículo NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);7
                return []
            }
        } 

    const handleFetchOneItem = async (item)=>{
        // dispatch(addItem(item))
        setInputCode(item.code)
        await fetchItem(item.code)
        //setIsItem(true)
    }
    //onKeyDown handles 

    const handleOnKeyItem = async (event) => {
        if (event.key === 'Enter' || event.key === 'Intro') {
            await fetchItem();

        }
    }

    const handleOnKeySupplier = async (event) => {
        if (event.key === "Enter" || event.key === "Intro") {
            
            await fetchSupplier();
            
        }
    }

    const handleTotalAmount = (total) => {
        setTotalFake(total);
    }

    // const handleTotalAdjustment = (adjustment) => {
    //     // Actualizamos el estado del ajuste total (sin cambios)
    //     setTotalAdjustment(prevTotal => prevTotal + adjustment);
    // }

    //inputs handles
    // const handleInputItemName = (e) => {
    //     setInputItemName(e.target.value)
    // }

    // const handleInputNameSupplier = (e) =>{
    //     setInputNameSupplier(e.target.value)
    // }

    const handleInputCUIT = (e) => {
        setInputCUIT(e.target.value);
    }

    const handleInputCode = (e) => {
        setInputCode(e.target.value);
    }

    // const handleInputQuantity = (e) => {
    //     setInputQuantity(e.target.value);
    // }


    // modals handles
    const MessageResponse = () => {
        setModalOpenMessage(true)
        setTimeout(() => {
            setModalOpenMessage(false);
        }, 3500);
    }

    const CloseModals = () => {
        setModalOpen(false);
        setModalOpenMessage(false);
        setModalSupplierOpen(false);
        setModalOpenNewItem(false);
        // setModalItemOpen(false);
    }

    const handleSubmitNewSupplier= (message)=>{
        setMessage(message)
        setModalSupplierOpen(false)
        MessageResponse()
    }

    const handleSubmitNewItem= (message)=>{
        
        setMessage(message);
        modalOpenNewItem(false);
        setModalOpenMessage(true);
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
                    
        
}

    // const CloseItemsModal = () =>{
    //     setModalItemOpen(false);
    // }

    const handleOpenItemModal= () =>{
        setModalItemOpen(true)
    }

    // Function for format numbers
    // const formatNumber = (number) => {
    //     return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // };

    // redux handles
    const handleAddItem = (newItem) => {

        dispatch(addItems(newItem)); // add a new item or change quantity if already exist
        cleanItem();
        // setMessage("Item agregado a la factura")
        // MessageResponse();
        // CloseModals();
        setModalItemOpen(false);
    };

    const handleCancelItemModal =  () =>{
        
        // dispatch(subtractStock(defaultStock))
        // await handleEditStockItem(code, defaultStock);
        setModalItemOpen(false);    
    }

    const handleUpdateQuantity = (code, quantity) => {
        dispatch(updateItemQuantity({ code, quantity })); // update item quantity by code
    };

    const handleRemoveItem = (code) => {
        dispatch(removeItem(code)); // Delete item by code
    };

    const handleClearItems = () => {
        dispatch(clearItems()); // delete all content of the table (array)
        dispatch(deleteItem()); //delete item of redux
        setInputCode("");
        setInputItemName("");
    };

    const handleBill = () => {

    }

    const handleUpdateStock = (quantity) => {
        dispatch(subtractStock({ quantity: Number(quantity) })); // Dispatch the action to subtract stock
        
    }

    //calculate amounts
    const calculateTotalAmount = () => {
        const total = itemsList.reduce((acc, item) => acc + item.amount, 0);
        setTotalAmount(total);
    };

    const calculateTotalSubAmount = () => {
        const total = itemsList.reduce((acc, item) => acc + item.subAmount, 0);
        setTotalSubAmount(total);
    };

    const calculateTotalAdjustment = () => {
        const total = itemsList.reduce((acc, item) => acc + item.amountAdjustment, 0);
        setTotalAdjustment(total);
    };

    useEffect(() => {
        calculateTotalAmount();
        calculateTotalSubAmount();
        calculateTotalAdjustment();
    }, [itemsList]);

    

    //######### validations
// Verify Item data  for enable plus button
const isDataItem = item.name != null;
    
const isDataListItem = itemsList.length > 0 && supplier.businessName != null;

    return (
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Pedido de Insumos"} btnBack={true} />
                {modalOpenMessage && createPortal(<MessageModal onClose={CloseModals} messageModal={message} />, document.body)}
                {modalItemOpen && createPortal( <ItemModal size={false}  addItemList={handleAddItem}  onEditStock={handleEditStockItem} isPurchase={true} handleCancel={handleCancelItemModal}  />, document.body)}
                {modalSupplierOpen && createPortal(<NewSupplierModal onSubmit={handleSubmitNewSupplier} onCancel={CloseModals} onClose={CloseModals} />, document.body)}
                {modalOpenNewItem&&createPortal(<NewItemModal onSubmit={handleSubmitNewItem} onCancel={CloseModals} onClose={CloseModals}  />,document.body)}
                <article className={Style.content}>
                    <div className={Style.column1}>
                        <div className={Style.row1}>
                            <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} value={inputCode} onChange={handleInputCode} onKey={handleOnKeyItem} />
                            {/* <TextInputStyled titleLabel={"Nombre de Artículo"} nameLabel={"itemName"} placeholderText={"Ej: Guantes"} value={inputItemName} onChange={handleInputItemName} typeInput={"text"} size={false} /> */}
                            <InputTextSearchStyled placeholderText={"Ej: Casco Italy "} typeInput={"text"} titleLabel={"Nombre Artículo"} size={false} value={inputItemName} onSearch={handleListResults} setOneResult={handleFetchOneItem} onChange={setInputItemName} displayFields={["name","brand"]}/>
                            <div className={Style.btnLayout}>
                                {isDataItem ? (<MiniBtn onClick={handleOpenItemModal} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>) : (<MiniBtn onClick={handleOpenItemModal} bgDisable={true} disabled={true} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>)}
                                {/* <MiniBtn onClick={handleShowPrice} isWhite={true}> $<FontAwesomeIcon icon={faMagnifyingGlass} />  </MiniBtn>
                                <MiniBtn onClick={handleEditPrice} isWhite={true}> $<FontAwesomeIcon icon={faPencil} />  </MiniBtn> */}
                                {/* <BtnCommon title={"Agregar"} colorViolet={true}> <FontAwesomeIcon icon={faPlus} /> </BtnCommon> */}
                                {/* <BtnCommon title={"Precio"} colorViolet={true}> $</BtnCommon> */}
                            </div>

                        </div>
                        <div className={Style.row2}>
                            <TableQuotation rows={itemsList} totals={handleTotalAmount} size={true} modalRemoveItem={handleRemoveItem} modalUpdateItem={handleUpdateQuantity} isEdit={false} isQuotation={false}/>
                        </div>
                        <div className={Style.row3}>
                            <TextInputStyled typeInput="number" nameLabel={"cuit"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputCUIT} onChange={handleInputCUIT} onKey={handleOnKeySupplier} />
                            {/* <TextInputStyled titleLabel={"Nombre Proveedor"} nameLabel={"suppplier"} placeholderText={"Ej: Electro Moto"} value={inputNameSupplier} onChange={handleInputNameSupplier} typeInput={"text"} size={false} /> */}
                            <InputTextSearchStyled placeholderText={"Ej: Lona Flex "} typeInput={"text"} titleLabel="Nombre Proveedor" size={false} value={inputNameSupplier} listPosition={'top-right'} onSearch={handleSupplierListResults} setOneResult={handleFetchOneSupplier} onChange={setInputNameSupplier} displayFields={["businessName","companyName"]}/>
                            <MiniBtn onClick={cleanSupplier} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} />  </MiniBtn>
                            
                        </div>
                        
                    </div>
                    <div className={Style.column2}>
                        <MidTotal subTotal={totalSubAmount} adjustment={totalAdjustment} total={totalAmount} />
                        <div className={Style.BtnLarge}>
                        <NavLink to='/checkout' >
                            {isDataListItem ? (<BtnVioletLarge onClick={handleBill} >Pago <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>):(<BtnVioletLarge onClick={handleBill} bgDisable={true} disabled={true} >Pago <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>)}
                        </NavLink >
                        </div>
                        <div className={Style.BtnsShort}>
                            <BtnCommon title={"Nuevo "} colorViolet={true} onClick={()=>setModalSupplierOpen(true)}><FontAwesomeIcon icon={faTruck}  /></BtnCommon>
                            <BtnCommon title={"Nuevo "} colorViolet={true}  onClick={()=>setModalOpenNewItem(true)}><FontAwesomeIcon icon={faBox}  /></BtnCommon>
                            
                        </div>
                        <div className={Style.BtnLarge}>
                            <BtnVioletLarge onClick={handleClearItems} bgRed={true} >Cancelar <FontAwesomeIcon icon={faXmark} /></BtnVioletLarge>
                        </div>
                    </div>

                </article>
            </Container>
        </div>
    )
}

export default Cashier