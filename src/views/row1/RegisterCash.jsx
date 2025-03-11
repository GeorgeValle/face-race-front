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
import { useState, useEffect } from 'react'
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
    const [isFetchClient, setIsFetchClient] = useState(false);
    //date
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([])
    

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
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // redux handles
    const handleAddItem = (newItem) => {

        dispatch(addItems(newItem)); // add a new item or change quantity if already exist
        dispatch(deleteItem()); //delete item of redux
        setInputCode("");
        setInputItemName("");
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

    //######### date functions ############

    const calculateDays = (month, year) => {
    const date = new Date(year, month, 0);
    const numberOfDays = date.getDate();
    const currentDate = new Date();
    const daysArray = [];
    for (let i = 1; i <= numberOfDays; i++) {
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1) {
            if (i <= currentDate.getDate()) {
                daysArray.push(i);
            }
        } else {
            daysArray.push(i);
        }
        }
        setDays(daysArray);
    };

    const calculateMonths = (year) => {
        const currentDate = new Date();
        const monthsArray = [];
        for (let i = 1; i <= 12; i++) {
        if (year === currentDate.getFullYear()) {
            if (i <= currentDate.getMonth() + 1) {
            monthsArray.push(i);
            }
        } else {
            monthsArray.push(i);
        }
        }
        setMonths(monthsArray);
    };

    const calculateYears = () => {
        const currentDate = new Date();
        const yearsArray = [];
        for (let i = 2023; i <= currentDate.getFullYear(); i++) {
            yearsArray.push(i);
        }
        setYears(yearsArray);
    };

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        calculateDays(e.target.value, year);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
        calculateMonths(e.target.value);
        calculateDays(month, e.target.value);
    };

    const generateDate = (day, month, year, useCurrentTime = false) => {
        let date;
        if (useCurrentTime) {
            const currentDate = new Date();
            date = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        } else {
            date = new Date(year, month - 1, day);
        }
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const utcSeconds = date.getUTCSeconds();
        const utcMilliseconds = date.getUTCMilliseconds();
        const timezoneOffset = -3 * 60 * 60 * 1000; // UTC-3 para Argentina
        const argentinaDate = new Date(date.getTime() + timezoneOffset);
        return argentinaDate;
    };
    //example generate day
    let fecha = generateDate(day, month, year);

    fecha = fecha.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })

    useEffect(() => {
        const currentDate = new Date();
        setDay(currentDate.getDate());
        setMonth(currentDate.getMonth() + 1); // getMonth devuelve un valor entre 0 y 11
        setYear(currentDate.getFullYear());
        
        calculateDays(currentDate.getMonth() + 1, currentDate.getFullYear());
        calculateMonths(currentDate.getFullYear());
        calculateYears();
    }, []);

    //######### validations

    // Verify items data for enable addItems button
    //const isDataItem =  item.length > 0;


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
                                <MiniBtn onClick={handleOpenItemModal} isWhite={true}> <FontAwesomeIcon icon={faPlus} />  </MiniBtn>
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
                            {/*<div>
                                <InputDate side={false} titleLabel={"Fecha:"} ></InputDate>
                            </div>
                            <div className={Style.area1}>
                                <TextArea titleLabel={"Observaciones:"} nameLabel={"observaciones"} placeholderText={"* Opcional: Detalles varios"} sideLabel={true} />
                            </div>*/}
                            <div className={Style.inputDate_group}>
                                <label className={Style.label}>
                                    Día:
                                </label>
                                <select className={Style.styledSelect} value={day} onChange={handleDayChange}>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={Style.inputDate_group}>
                                <label className={Style.label}>
                                    Mes:
                                </label>
                                <select className={Style.styledSelect} value={month} onChange={handleMonthChange}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={Style.inputDate_group} >
                                <label className={Style.label}>
                                    Año:
                                </label>
                                <select className={Style.styledSelect} value={year} onChange={handleYearChange}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <TextInputStyled titleLabel={"Observaciones"} size={false} onChange={(e) => setDescription(e.target.value)} value={description} />

                        </div>
                        <div className={Style.row4}>
                            <TextInput typeInput={"text"} isLabel={true} titleLabel={"Cliente:"} nameLabel={"cliente"} placeholderText={"Ej: Juan Gomez"} sideLabel={true} data={null} />
                            <TextInput typeInput={"number"} isLabel={true} titleLabel={"DNI / CUIT:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} data={null} />
                        </div>
                    </div>
                    <div className={Style.column2}>
                        <MidTotal subTotal={totalSubAmount} adjustment={totalAdjustment} total={totalAmount} />
                        <div className={Style.BtnLarge}>
                            <BtnVioletLarge onClick={handleBill} >Cobrar <FontAwesomeIcon icon={faWallet} /></BtnVioletLarge>
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