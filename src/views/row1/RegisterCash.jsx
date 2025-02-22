import Container from '../../components/container/Container';
import MiniNavBar from '../../components/miniNavbar/MIniNavBar';
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon';
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled';
import MidTotal from '../../components/totals/midTotal/MidTotal';
import Style from './RegisterCash.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserPlus, faWallet, faXmark, faPencil, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation';
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge';
import InputDate from '../../components/inputs/inputDate/InputDate';
import TextArea from '../../components/inputs/textArea/TextArea';
import TextInput from '../../components/inputs/textInput/TextInput';
import MessageModal from '../../components/modals/messageModal/MessageModal';
import ItemModal from '../../components/modals/itemModal/ItemModal';
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { addItem, deleteItem, updatePrice, subtractStock } from "../../redux/ItemSlice";
import { addItems, removeItem, clearItems, updateItemQuantity } from '../../redux/ItemsListSlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../redux/ClientSlice";
import config from "../../config/Envs"
import axios from "axios";
// const item1 =[
//     {code:323434,item:"Zapatillas Casual para motocicletas",quantity:2,price:"12,00",amount:54.45},
//     {code:323434,item:"Camperas para motocicletas",quantity:2,price:12000.00,amount:12000.00},
//     {code:1,item:"",quantity:0,price:0.00,amount:0.00},
//     {code:2,item:"",quantity:0,price:0.00,amount:0.00},
//     {code:3,item:"",quantity:0,price:0.00,amount:0.00}

// ]

//const item1 = [{ code: 323434, name: "Zapatillas Casual para motocicletas", quantity: 2, price: "120250", amount: 240500.00 }, { code: 323435, name: "Camperas para motocicletas", quantity: 2, price: 190000.00, amount: 380000.00 }]

const RegisterCash = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalItemOpen, setModalItemOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [inputDNI, setInputDNI] = useState("")
    const [discount, setDiscount] = useState(0)
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    //colocar el open modal
    const [message, setMessage] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputQuantity, setInputQuantity] = useState(0);
    const [inputItemName, setInputItemName] = useState("")
    const [isFetchClient, setIsFetchClient] = useState(false);
    const [totalAdjustment, setTotalAdjustment] = useState(0);

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
            //delete later
            console.error('Error al actualizar los datos:', error);
            setMessage('Error al actualizar el Stock')
            MessageResponse();
        }
    };

    //onKeyDown handles 

    const handleOnKeyItem = async (event) => {
        if (event.key === 'Enter' || event.key === 'Intro') {
            await fetchItem();

        }
    }

    const handleOnKeyClient = (event) => {
        if (event.key === "Enter") {
            
            fetchClient();
            
        }
    }

    const handleTotalAmount = (total) => {
        setTotalAmount(total);
    }

    const handleTotalAdjustment = (adjustment) => {
        // Actualizamos el estado del ajuste total (sin cambios)
        setTotalAdjustment(prevTotal => prevTotal + adjustment);
    }

    //inputs handles
    const handleInputItemName = (e) => {
        setInputItemName(e.target.value)
    }
    const handleInputDNI = (e) => {
        setInputDNI(e.target.value);
    }

    const handleInputCode = (e) => {
        setInputCode(e.target.value);
    }

    const handleInputQuantity = (e) => {
        setInputQuantity(e.target.value);
    }


    // modals handles
    const MessageResponse = () => {
        setModalOpenMessage(true)
        setTimeout(() => {
            setModalOpenMessage(false);
        }, 3500);
    }

    const CloseModals = () => {
        setModalOpen(false);
        setModalItemOpen(false);
    }

    const handleOpenItemModal= () =>{
        setModalItemOpen(true)
    }

    // Function for format numbers
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // redux handles
    const handleAddItem = (newItem) => {

        dispatch(addItems(newItem)); // Agrega un nuevo item o suma la cantidad si ya existe
    };

    const handleUpdateQuantity = (code, quantity) => {
        dispatch(updateItemQuantity({ code, quantity })); // update item quantity
    };

    const handleRemoveItem = (code) => {
        dispatch(removeItem(code)); // Elimina el item por código
    };

    const handleClearItems = () => {
        dispatch(clearItems()); // Borra todo el contenido del array
    };

    const handleShowPrice = () => {

    }

    const handleEditPrice = () => {

    }

    const handleBill = () => {

    }

    const handleUpdateStock = (quantity) => {
        dispatch(subtractStock({ quantity: Number(quantity) })); // Dispatch the action to subtract stock
        
    }

    return (
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Caja"} btnBack={true} />
                {modalOpen && (<MessageModal onClose={CloseModals} messageModal={"Impreso"} />)}
                {modalItemOpen &&createPortal( <ItemModal onClose={CloseModals}  addItemList={handleAddItem} onAdjustment={null} onEditStock={null} />, document.body)}
                <article className={Style.content}>
                    <div className={Style.column1}>
                        <div className={Style.row1}>
                            <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} value={inputCode} onChange={handleInputCode} onKey={handleOnKeyItem} />
                            <TextInputStyled titleLabel={"Nombre de Artículo"} nameLabel={"itemName"} placeholderText={"Ej: Guantes"} value={inputItemName} onChange={handleInputItemName} typeInput={"text"} size={false} />
                            <div className={Style.btnLayout}>
                                <MiniBtn onClick={handleOpenItemModal} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>
                                <MiniBtn onClick={handleShowPrice} isWhite={true}> $<FontAwesomeIcon icon={faMagnifyingGlass} />  </MiniBtn>
                                <MiniBtn onClick={handleEditPrice} isWhite={true}> $<FontAwesomeIcon icon={faPencil} />  </MiniBtn>
                                {/* <BtnCommon title={"Agregar"} colorViolet={true}> <FontAwesomeIcon icon={faPlus} /> </BtnCommon> */}
                                {/* <BtnCommon title={"Precio"} colorViolet={true}> $</BtnCommon> */}
                            </div>

                        </div>
                        <div className={Style.row2}>
                            <TableQuotation rows={itemsList} totals={handleTotalAmount} size={true} modalRemoveItem={handleRemoveItem} modalUpdateItem={handleUpdateQuantity} isEdit={false} />
                        </div>
                        <div className={Style.row3}>
                            <div>
                                <InputDate side={false} titleLabel={"Fecha:"} ></InputDate>

                            </div>
                            <div className={Style.area1}>
                                <TextArea titleLabel={"Observaciones:"} nameLabel={"observaciones"} placeholderText={"* Opcional: Detalles varios"} sideLabel={true} />
                            </div>

                        </div>
                        <div className={Style.row4}>
                            <TextInput typeInput={"text"} isLabel={true} titleLabel={"Cliente:"} nameLabel={"cliente"} placeholderText={"Ej: Juan Gomez"} sideLabel={true} data={null} />
                            <TextInput typeInput={"number"} isLabel={true} titleLabel={"DNI / CUIT:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} data={null} />
                        </div>
                    </div>
                    <div className={Style.column2}>
                        <MidTotal />
                        <div className={Style.BtnLarge}>
                            <BtnVioletLarge onClick={handleBill} >Cobrar <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>
                        </div>
                        <div className={Style.BtnsShort}>
                            <BtnCommon title={"Cliente "} colorViolet={true}><FontAwesomeIcon icon={faUserPlus} /></BtnCommon>
                            <BtnCommon title={"Cancelar "} colorRed={true}> <FontAwesomeIcon icon={faXmark} /> </BtnCommon>
                        </div>
                    </div>

                </article>
            </Container>
        </div>
    )
}

export default RegisterCash