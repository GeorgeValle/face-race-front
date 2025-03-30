import Container from '../../components/container/Container';
import MiniNavBar from '../../components/miniNavbar/MIniNavBar';
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon';
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled';
import MidTotal from '../../components/totals/midTotal/MidTotal';
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge';
import InputSelectDateStyled from '../../components/inputs/inputSelectDateStyled/InputSelectDateStyled'
import Style from './RegisterCash.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserPlus, faWallet, faXmark, faPencil, faMagnifyingGlass, faBroomBall } from "@fortawesome/free-solid-svg-icons";
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation';
import MessageModal from '../../components/modals/messageModal/MessageModal';
import ItemModal from '../../components/modals/itemModal/ItemModal';
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { addItem, deleteItem, updatePrice, subtractStock } from "../../redux/ItemSlice";
import { addItems, removeItem, clearItems, updateItemQuantity } from '../../redux/ItemsListSlice';
import { useDispatch, useSelector } from "react-redux";
import { addClient, deleteClient } from "../../redux/ClientSlice";
import { NavLink } from "react-router-dom";
import config from "../../config/Envs"
import axios from "axios";


const RegisterCash = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalItemOpen, setModalItemOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [totalSubAmount, setTotalSubAmount] = useState(0.00);
    const [totalAdjustment, setTotalAdjustment] = useState(0.00);
    const [totalFake, setTotalFake] = useState(0);
    const [inputDNI, setInputDNI] = useState("")
    const [description, setDescription] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //colocar el open modal
    const [message, setMessage] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputItemName, setInputItemName] = useState("")
    const [inputNameClient, setInputNameClient] = useState("")
    const [isFetchClient, setIsFetchClient] = useState(false);
    //const [isDataItem, setIsDataItem] = useState(false);
    //date
    // const [day, setDay] = useState('');
    // const [month, setMonth] = useState('');
    // const [year, setYear] = useState('');
    // const [days, setDays] = useState([]);
    // const [months, setMonths] = useState([]);
    // const [years, setYears] = useState([])
    

    //Variables Redux
    const client = useSelector((state) => state.client);
    const item = useSelector((state) => state.item);
    const itemsList = useSelector((state) => state.itemsList);
    const dispatch = useDispatch();



    // fetching data

    const fetchItem = async () => {
        try {
            const request = await axios.get((`${config.API_BASE}item/code/${inputCode}`))
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

    const fetchClient = async () => {
        try {
            const request = await axios.get((`${config.API_BASE}client/dni/${inputDNI}`))
            const response = request.data
            dispatch(addClient(response.data))
            setInputNameClient(`${response.data.name} ${response.data.surname}`)
            
            if (response.data) {
                setIsFetchClient(true);

            }
        } catch (error) {
            setMessage("Cliente NO encontrado")
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

    // function for clean items of redux and input
    const cleanItem = () =>{
    dispatch(deleteItem()); //delete item of redux
        setInputCode("");
        setInputItemName("");
    }

    const cleanClient = () =>{
        dispatch(deleteClient()); //delete item of redux
        setInputDNI("");
        setInputNameClient("");
    }
    //onKeyDown handles 

    const handleOnKeyItem = async (event) => {
        if (event.key === 'Enter' || event.key === 'Intro') {
            await fetchItem();

        }
    }

    const handleOnKeyClient = async (event) => {
        if (event.key === "Enter" || event.key === "Intro") {
            
            await fetchClient();
            
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
    const handleInputItemName = (e) => {
        setInputItemName(e.target.value)
    }

    const handleInputNameClient = (e) =>{
        setInputNameClient(e.target.value)
    }

    const handleInputDNI = (e) => {
        setInputDNI(e.target.value);
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
        // setModalItemOpen(false);
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
    
const isDataListItem = itemsList.length > 0 && client.name != null;

    return (
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Caja"} btnBack={true} />
                {modalOpen && (<MessageModal onClose={CloseModals} messageModal={"Impreso"} />)}
                {modalItemOpen && createPortal( <ItemModal size={false}  addItemList={handleAddItem}  onEditStock={handleEditStockItem} handleCancel={handleCancelItemModal}  />, document.body)}
                <article className={Style.content}>
                    <div className={Style.column1}>
                        <div className={Style.row1}>
                            <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} value={inputCode} onChange={handleInputCode} onKey={handleOnKeyItem} />
                            <TextInputStyled titleLabel={"Nombre de Artículo"} nameLabel={"itemName"} placeholderText={"Ej: Guantes"} value={inputItemName} onChange={handleInputItemName} typeInput={"text"} size={false} />
                            <div className={Style.btnLayout}>
                                {isDataItem ? (<MiniBtn onClick={handleOpenItemModal} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>) : (<MiniBtn onClick={handleOpenItemModal} bgDisable={true} disabled={true} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>)}
                                {/* <MiniBtn onClick={handleShowPrice} isWhite={true}> $<FontAwesomeIcon icon={faMagnifyingGlass} />  </MiniBtn>
                                <MiniBtn onClick={handleEditPrice} isWhite={true}> $<FontAwesomeIcon icon={faPencil} />  </MiniBtn> */}
                                {/* <BtnCommon title={"Agregar"} colorViolet={true}> <FontAwesomeIcon icon={faPlus} /> </BtnCommon> */}
                                {/* <BtnCommon title={"Precio"} colorViolet={true}> $</BtnCommon> */}
                            </div>

                        </div>
                        <div className={Style.row2}>
                            <TableQuotation rows={itemsList} totals={handleTotalAmount} size={true} modalRemoveItem={handleRemoveItem} modalUpdateItem={handleUpdateQuantity} isEdit={false} />
                        </div>
                        <div className={Style.row3}>
                            <TextInputStyled typeInput="number" nameLabel={"dni"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputDNI} onChange={handleInputDNI} onKey={handleOnKeyClient} />
                            <TextInputStyled titleLabel={"Nombre del Cliente"} nameLabel={"client"} placeholderText={"Ej: Juan Gomez"} value={inputNameClient} onChange={handleInputNameClient} typeInput={"text"} size={false} />
                            <MiniBtn onClick={cleanClient} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} />  </MiniBtn>
                            
                        </div>
                        
                    </div>
                    <div className={Style.column2}>
                        <MidTotal subTotal={totalSubAmount} adjustment={totalAdjustment} total={totalAmount} />
                        <div className={Style.BtnLarge}>
                        <NavLink to='/payment' >
                            {isDataListItem ? (<BtnVioletLarge onClick={handleBill} >Cobrar <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>):(<BtnVioletLarge onClick={handleBill} bgDisable={true} disabled={true} >Cobrar <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>)}
                        </NavLink >
                        </div>
                        <div className={Style.BtnsShort}>
                            <BtnCommon title={"Cliente "} colorViolet={true}><FontAwesomeIcon icon={faUserPlus} /></BtnCommon>
                            <BtnCommon title={"Cancelar "} colorRed={true} onClick={handleClearItems}> <FontAwesomeIcon icon={faXmark} /> </BtnCommon>
                        </div>
                    </div>

                </article>
            </Container>
        </div>
    )
}

export default RegisterCash