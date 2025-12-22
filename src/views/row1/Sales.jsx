import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import InputTextSearchStyled from '../../components/inputs/inputTextSearchStyled/InputTextSearchStyled'
import InputSelectDateStyled from '../../components/inputs/inputSelectDateStyled/InputSelectDateStyled'
import InputSelectStyled from '../../components/inputs/inputSelectStyled/InputSelectStyled'
import Style from './Sales.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBroomBall, faPlus, faTruck/*, faPencil*/ } from "@fortawesome/free-solid-svg-icons"
import Dialog from '../../components/modals/dialog/Dialog'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import { TableSale } from '../../components/tables/tableSale/TableSale'
import { createPortal } from 'react-dom'
import MiniTotal from '../../components/totals/miniTotal/MiniTotal'
import SalesCharts from '../../components/graphics/salesChart/SalesChart'
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem/* changeClient, deleteItem  */ } from "../../redux/ItemSlice";
import { addClient, deleteClient } from '../../redux/ClientSlice'
import { addSale, resetSale } from '../../redux/SaleSlice';
import SaleModal from '../../components/modals/saleModal/SaleModal'
import axios from 'axios'
import config from '../../config/Envs'

const Sales = () => {
    const [date, setDate] = useState(new Date());
    const [sales, setSales] = useState([])
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("")
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [modalOpenDialog, setModalOpenDialog] = useState(false);
    const [inputNumber, setInputNumber] = useState(Number);
    const [inputName, setInputName] = useState("");
    const [inputSaleNumber, setInputSaleNumber] = useState(Number)
    const [inputReportType, setInputReportType] = useState("");
    const [isMonthly, setIsMonthly] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    const [isMethod, setIsMethod] = useState(false);
    const [isByClient, setIsByClient] = useState(false);
    const [isByItem, setIsByItem] = useState(false);
    const [isSale, setIsSale] = useState(false)
    const [weeks, setWeeks] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [inputMethod, setInputMethod] = useState("cash");
    const [inputNameClient, setInputNameClient] = useState("");
    const [inputDNI, setInputDNI] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputItemName, setInputItemName] = useState("");
    const [totalPrint, setTotalPrint] = useState(0);
    const [monthlyTotalsByName, setMonthlyTotalsByName] = useState([]);
    const [clientSales, setClientSales] = useState([])
    const [methodSales, setMethodSales] = useState({})
    const [itemSales, setItemSales] = useState({})
    const [modalOpenSale, setModalOpenSale] = useState(false)
    //for IA predict
    const [forecastData, setForecastData] = useState(null);
    const [advice, setAdvice] = useState("");
    const [isForecast, setIsForecast] = useState(false);
    const [totalForecast, setTotalForecast] = useState(0);



    const item = useSelector((state) => state.item);
    const sale = useSelector((state) => state.sale)


    const dispatch = useDispatch()




    //const handleBlurMonthly = () =>{
    //if(!selectedYear&&!selectedYear==""){

    //setTheStatus(selectedOption)
    //}
    // }

    const handleClose = () => {
        // setModalOpenNewModal(false);
        // setModalOpenEditItem(false);
        setModalOpenMessage(false);
        setModalOpenDialog(false);
        setModalOpenSale(false)
    }

    /* ++++++++++++++++++++++++ */
    //function for request forecast
    const fetchForecast = async () => {
        try {
            const response = await axios.get(`${config.API_BASE}forecast/${selectedYear}`);
            setForecastData(response.data);   // contiene forecast, history, changepoints, advice
            setAdvice(response.data.advice);
            setTotalForecast(response.data.totalForecast)
        } catch (error) {
            setMessage("Error al obtener proyección");
            setModalOpenMessage(true);
            setTimeout(() => setModalOpenMessage(false), 3500);
        }
    };

    // **************** ********************


    // const fetchForecast = async () => {
    //     try {
    //         const response = await axios.get(`${config.API_BASE}forecast`);
    //         setForecastData(response.data);
    //         setAdvice(response.data.advice);
    //     } catch (error) {
    //         setMessage("Error al obtener predicción");
    //         setModalOpenMessage(true);
    //         setTimeout(() => setModalOpenMessage(false), 3500);
    //     }
    // };

    const handleDeleteSale = () => {

    }

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value))


    }

    const handleYearChangeMonthly = (e) => {
        setSelectedYear(parseInt(e.target.value))
    }

    const handleAnnualChange = (e) => {
        setSelectedYear(parseInt(e.target.value))
    }
    const handleInputNameClient = () => {

    }

    const handleInputDNI = (e) => {
        setInputDNI(e.target.value)
    }

    const handleInputItemName = () => {

    }

    const handleInputCode = (e) => {
        setInputCode(e.target.value)

    }

    const handleInputSaleNumber = (e) => {
        setInputSaleNumber(e.target.value)
    }

    const cleanClient = () => {
        dispatch(deleteClient()); //delete item of redux
        dispatch(resetSale());
        setInputDNI("");
        setInputNameClient("");
    }

    const cleanItem = () => {
        dispatch(deleteItem()); //delete item of redux
        setInputCode("");
        setInputItemName("");
    }

    // functions for InputTextSearchStyled
    const fetchItemsByLetters = async (letters) => {

        try {
            const request = await axios.get((`${config.API_BASE}item/name/${letters}`))
            const response = request.data
            return response.item
        } catch (error) {

            setMessage("Artículo NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500); 7
            return []
        }
    }

    const fetchClientsByLetters = async (letters) => {

        try {
            const request = await axios.get((`${config.API_BASE}client/name/${letters}`))
            const response = request.data
            return response.client
        } catch (error) {

            setMessage("Cliente NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500); 7
            return []
        }
    }

    const handleListResultsItems = async (letters) => {
        setInputItemName(letters)
        return await fetchItemsByLetters(letters)

    }

    const handleListResultsClients = async (letters) => {
        setInputNameClient(letters)
        return await fetchClientsByLetters(letters)
    }

    const handleFetchOneItem = async (OneItem) => {
        dispatch(addItem(OneItem))
        setInputCode(OneItem.code)
        await fetchFindTotalProductAmountByCodeAndMonthNotItem(OneItem.code)

        // setIsListItems(false)
        //     setIsReorderPointList(false)
        //     setIsItem(true)

    }

    const handleFetchOneClient = async (oneClient) => {
        dispatch(addClient(oneClient))
        setInputDNI(oneClient.dni)
        await fetchAnnualClientSalesByDNI(oneClient.dni);
        // setIsListItems(false)
        //     setIsReorderPointList(false)
        //     setIsItem(true)

    }

    // const fetchMonthlyTotalsByName = async ()=>{
    //     try {
    //         const response =
    //             await axios.get(`${config.API_BASE}sale/year/${selectedYear}`)
    //             setMonthlyTotalsByName(response.data.data);
    //         console.log(response.data.data)

    //     } catch (error) {
    //         setMessage("sin info")

    //     }
    // }

    const sumMonthlyAmounts = (monthlyData) => {
        return Object.values(monthlyData).reduce((total, amount) => total + amount, 0);
    };

    const fetchMonthly = async () => {
        //params: { month: selectedMonth + 1, year: selectedYear }
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/month/${selectedMonth + 1}/year/${selectedYear}`)
            setSales(response.data.data);

        } catch (error) {
            setMessage("sin info")

        }
    }

    const fetchSale = async (saleNumber) => {
        try {
            const request = await axios.get((`${config.API_BASE}sale/number/${saleNumber}`))
            const response = request.data
            dispatch(addSale(response.data))
            if (response.data) {
                setModalOpenSale(true)
            }
        } catch (error) {
            setMessage("Venta NO encontrada")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500);
        }
    }

    const fetchItem = async (code = null) => {
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
                setModalOpenMessage(false);
            }, 3500);
        }


    }

    const fetchMonthlyTotalsByName = async () => {
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/year/${selectedYear}`)
            setMonthlyTotalsByName(response.data.data);
            //console.log(response.data.data)

        } catch (error) {
            setMessage("sin info")

        }
    }

    const fetchFindTotalProductAmountByCodeAndMonth = async (code = null) => {

        const codeToFetch = code || inputCode
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/item/${codeToFetch}/${selectedYear}`)
            setItemSales(response.data.data);
            await fetchItem();

            setTotalPrint(sumMonthlyAmounts(response.data.data))
        } catch (error) {
            setMessage("sin info")
        }
    }

    const fetchFindTotalProductAmountByCodeAndMonthNotItem = async (code = null) => {

        const codeToFetch = code || inputCode
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/item/${codeToFetch}/${selectedYear}`)
            setItemSales(response.data.data);


            setTotalPrint(sumMonthlyAmounts(response.data.data))
        } catch (error) {
            setMessage("sin info")
        }
    }

    const fetchAnnualClientSalesByDNI = async (dni = null) => {

        const DNIToFetch = dni || inputDNI
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/client/${DNIToFetch}/${selectedYear}`)
            setClientSales(response.data.data)
            setInputNameClient(`${response.data.data[0].client.name} ${response.data.data[0].client.surname}`)

            //console.log(response.data.data)
        } catch (error) {
            setMessage("Error al buscar las ventas")
        }
    }



    const fetchTotalPaymentsByTypeAndMonth = async () => {
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/payments/${inputMethod}/${selectedYear}`)
            setMethodSales(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        } catch (error) {
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchTotalPaymentsByTypeAndYear = async (pay=null) => {
        const payToFetch = pay || inputMethod;
        
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/payments/${payToFetch}/${selectedYear}`)
            setMethodSales(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        } catch (error) {
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchTotalPaymentsByMethodAndYear = async () => {
    
        
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/payments/${inputMethod}/${parseInt(selectedYear)}`)
            setMethodSales(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        } catch (error) {
            setMessage("Error al buscar las ventas")
        }
    }



    const fetchEditPaidStatusSale = async (saleNumber, oneStatus) => {
        try {

            await axios.put((`${config.API_BASE}sale/paid/${saleNumber}`), { paid: oneStatus })



        } catch (error) {
            setMessage("venta NO actualizada")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500);
        }
    }

    const fetchEditDescription = async (saleNumber, oneDescription) => {
        try {

            await axios.put((`${config.API_BASE}sale/description/${saleNumber}`), { description: oneDescription });


        } catch (error) {
            setMessage("venta NO actualizada")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500);
        }
    }



    useEffect(() => {


        const generateWeeks = () => {
            const startOfMonth = new Date(selectedYear, selectedMonth, 1);
            const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
            const weeksData = [];
            let week = [];

            for (let day = startOfMonth.getDate(); day <= endOfMonth.getDate(); day++) {
                const currentDate = new Date(selectedYear, selectedMonth, day);
                const dayOfWeek = currentDate.getDay();

                // Not saturdays (6) and sundays (0)
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    week.push(currentDate);
                }

                // if sunday (weekend) o last day of month, add week to the weeks
                if (dayOfWeek === 0 || day === endOfMonth.getDate()) {
                    if (week.length > 0) {
                        weeksData.push(week);
                        week = [];
                    }
                }
            }



            setWeeks(weeksData);
        };
        generateWeeks();

        isMonthly && fetchMonthly();
        isAnnual && fetchMonthlyTotalsByName();
        isByClient && fetchAnnualClientSalesByDNI();
        isMethod && fetchTotalPaymentsByTypeAndMonth();
        isByItem && fetchFindTotalProductAmountByCodeAndMonth();
        isForecast && fetchForecast();   // for predict

    }, [selectedMonth, selectedYear]);


    const handleFetchReportType = (type) => {
        if (type !== "") {
            setInputReportType(type);
            // switch(Type){
            //     case "monthly":
            //         setIsMonthly(true);
            //         setIsAnnual(false);
            //         setIsMethod(false);
            //         setIsByClient(false);
            //         setIsByItem(false);
            //         break;
            //     case "annual":
            //         setIsAnnual(true);
            //         setIsMonthly(false);
            //         setIsMethod(false);
            //         setIsByClient(false);
            //         setIsByItem(false);
            //         break;
            //     case "method":
            //         setIsMethod(true);
            //         setIsMonthly(false);
            //         setIsAnnual(false);
            //         setIsByClient(false);
            //         setIsByItem(false);
            //         break;
            //     case "client":
            //         setIsByClient(true);
            //         setIsMonthly(false);
            //         setIsAnnual(false);
            //         setIsMethod(false);
            //         setIsByItem(false);
            //         break;
            //     case "item":
            //         setIsByItem(true);
            //         setIsMonthly(false);
            //         setIsAnnual(false);
            //         setIsMethod(false);
            //         setIsByClient(false);
            //         break;
            //     default:
            //         setIsMonthly(false);
            //         setIsAnnual(false);
            //         setIsMethod(false);
            //         setIsByClient(false);
            //         setIsByItem(false);
            //         break;
            // }
            const reportTypes = {
                monthly: { isMonthly: true, isAnnual: false, isMethod: false, isByClient: false, isByItem: false, isSale: false, isForecast: false },
                annual: { isMonthly: false, isAnnual: true, isMethod: false, isByClient: false, isByItem: false, isSale: false, isForecast: false },
                method: { isMonthly: false, isAnnual: false, isMethod: true, isByClient: false, isByItem: false, isSale: false, isForecast: false },
                client: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: true, isByItem: false, isSale: false, isForecast: false },
                item: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: true, isSale: false, isForecast: false },
                sale: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: false, isSale: true, isForecast: false },
                forecast: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: false, isSale: false, isForecast: true } // for predict
            };



            const reportType = reportTypes[type] || { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: false, isSale: false };

            setIsMonthly(reportType.isMonthly);
            setIsAnnual(reportType.isAnnual);
            setIsMethod(reportType.isMethod);
            setIsByClient(reportType.isByClient);
            setIsByItem(reportType.isByItem);
            setIsSale(reportType.isSale);
            setIsForecast(reportType.isForecast);
        }
    }

    const handleMethodChange = async (pay) => {
        setInputMethod(pay);
        await fetchTotalPaymentsByTypeAndYear(pay);
    }

    const handleOnKeyClient = async (e) => {
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchAnnualClientSalesByDNI();

        }
    }

    const handleOnKeyItem = async (e) => {
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchFindTotalProductAmountByCodeAndMonth();
        }

    }

    const handleOnKeySaleNumber = async (e) => {
        if (e.key === 'Enter' || e.key === 'Intro') {
            try {
                await fetchSale(inputSaleNumber);

            } catch {
                setMessage("Venta NO encontrada")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                }, 3500);
            }
        }
    }

    const handleTotalPrint = (total) => {
        setTotalPrint(total)
    }

    const handleFetchSale = async (number) => {
        await fetchSale(number)
    }

    const payment = [{ label: "Efectivo", value: "cash" }, { label: "Credito", value: "credit" }, { label: "Debito", value: "debit" }, { label: "Cuenta Corriente", value: "currentAccount" }, { label: "Cheque", value: "check" }]

    const reportType = [{ label: "Selecciona una opción", value: "" }, { label: "Venta Mensual", value: "monthly" }, { label: "Venta Anual", value: "annual" }, { label: "Metodo de Pago", value: "method" }, { label: "Ventas por Clientes", value: "client" }, { label: "Ventas por Producto", value: "item" }, { label: "Número de venta", value: "sale" }, { label: "Proyección de Ventas", value: "forecast" }]

    // const rows =[{numberSale:2343,saleDate:"01/05/2024",itemList:[{amount:200200}], payment:[{type:"Cash"}], client:{id:345,name:"Victor", surname:"Azimov"}},
    //             {numberSale:2236,saleDate:"01/05/2024",itemList:[{amount:300200}], payment:[{type:"Cash"}], client:{id:123,name:"Ramiro", surname:"Peña"}},
    //             {numberSale:2320,saleDate:"02/05/2024",itemList:[{amount:100200}], payment:[{type:"Cash"}], client:{id:345,name:"Sergio", surname:"Rezimov"}},
    //             {numberSale:2364,saleDate:"02/05/2024",itemList:[{amount:100500}], payment:[{type:"Cash"}], client:{id:342,name:"Miriam", surname:"Padula"}}
    //         ]




    return (

        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Ventas"} btnBack={true} />
                {modalOpenMessage && (<MessageModal messageModal={message} onClose={handleClose} />)}
                {modalOpenDialog && (<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDeleteSale} onClose={handleClose} />)}
                {modalOpenSale && createPortal(<SaleModal TheSale={sale} onEditStatus={fetchEditPaidStatusSale} onEditDescription={fetchEditDescription} onPrint={null} onDelete={null} onClose={handleClose} />, document.body)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>
                            <div className={Style.article}>
                                <article className={Style.separate}>
                                    <div className={Style.article}>
                                        <InputSelectStyled defaultValue={inputReportType} onSetValue={handleFetchReportType} onLabel={"Tipo de Reporte"} options={reportType} />
                                        {isMonthly && (
                                            <article className={Style.separate}>
                                                <InputSelectDateStyled onLabel={"Mes"} onChange={handleMonthChange} defaultValue={selectedMonth} >
                                                    {Array.from({ length: 12 }, (_, i) => (
                                                        <option key={i} value={i}>
                                                            {new Date(0, i).toLocaleString('es', { month: 'long' })}
                                                        </option>
                                                    ))}
                                                </InputSelectDateStyled>
                                                <InputSelectDateStyled onLabel={"Año"} onChange={handleYearChangeMonthly} defaultValue={selectedYear}>
                                                    {Array.from({ length: 10 }, (_, i) => (
                                                        <option key={i} value={new Date().getFullYear() - 5 + i}>
                                                            {new Date().getFullYear() - 5 + i}
                                                        </option>
                                                    ))}
                                                </InputSelectDateStyled>
                                                <MiniBtn onClick={fetchMonthly} isWhite={false}>
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                </MiniBtn>
                                            </article>
                                        )}
                                        {
                                            isAnnual && (
                                                <article className={Style.separate}>
                                                    <InputSelectDateStyled onLabel={"Año"} onChange={handleAnnualChange} defaultValue={selectedYear}>
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <option key={i} value={date.getFullYear() - 5 + i}>
                                                                {date.getFullYear() - 5 + i}
                                                            </option>
                                                        ))}
                                                    </InputSelectDateStyled>
                                                    <MiniBtn onClick={fetchMonthlyTotalsByName} isWhite={false}>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </MiniBtn>
                                                </article>
                                            )
                                        }
                                        {
                                            isMethod && (
                                                <article className={Style.separate}>
                                                    <InputSelectStyled defaultValue={inputMethod} onSetValue={handleMethodChange} onLabel={"Tipos"} options={payment} />
                                                    <InputSelectDateStyled onLabel={"Año"} onChange={handleAnnualChange} defaultValue={selectedYear}>
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <option key={i} value={date.getFullYear() - 5 + i}>
                                                                {date.getFullYear() - 5 + i}
                                                            </option>
                                                        ))}
                                                    </InputSelectDateStyled>
                                                    <MiniBtn onClick={fetchTotalPaymentsByMethodAndYear} isWhite={false}>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </MiniBtn>
                                                </article>
                                            )
                                        }
                                        {
                                            isByClient && (
                                                <article className={Style.separate}>
                                                    {/* <TextInputStyled titleLabel={"Nombre del Cliente"} nameLabel={"client"} placeholderText={"Ej: Juan Gomez"} value={inputNameClient} onChange={handleInputNameClient} typeInput={"text"} size={false} /> */}
                                                    <TextInputStyled typeInput="number" nameLabel={"dni"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputDNI} onChange={handleInputDNI} onKey={handleOnKeyClient} />
                                                    <InputTextSearchStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre de Cliente" size={false} value={inputNameClient} onSearch={handleListResultsClients} setOneResult={handleFetchOneClient} onChange={setInputNameClient} displayFields={["name", "surname"]} />
                                                    <MiniBtn onClick={cleanClient} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} />  </MiniBtn>
                                                    <InputSelectDateStyled onLabel={"Año"} onChange={handleAnnualChange} defaultValue={selectedYear}>
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <option key={i} value={date.getFullYear() - 5 + i}>
                                                                {date.getFullYear() - 5 + i}
                                                            </option>
                                                        ))}
                                                    </InputSelectDateStyled>

                                                </article>
                                            )
                                        }
                                        {
                                            isByItem && (
                                                <article className={Style.separate}>
                                                    <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} value={inputCode} onChange={handleInputCode} onKey={handleOnKeyItem} />
                                                    {/* <TextInputStyled titleLabel={"Nombre de Artículo"} nameLabel={"itemName"} placeholderText={"Ej: Guantes"} value={inputItemName} onChange={handleInputItemName} typeInput={"text"} size={false} /> */}
                                                    <InputTextSearchStyled placeholderText={"Ej: Casco Italy "} typeInput={"text"} titleLabel="Nombre de Artículo" size={false} value={inputItemName} onSearch={handleListResultsItems} setOneResult={handleFetchOneItem} onChange={setInputItemName} displayFields={["name", "brand"]} />
                                                    <MiniBtn onClick={cleanItem} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} /> </MiniBtn>
                                                    <InputSelectDateStyled onLabel={"Año"} onChange={handleAnnualChange} defaultValue={selectedYear}>
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <option key={i} value={date.getFullYear() - 5 + i}>
                                                                {date.getFullYear() - 5 + i}
                                                            </option>
                                                        ))}
                                                    </InputSelectDateStyled>
                                                </article>
                                            )
                                        }
                                        {
                                            isSale && (
                                                <>
                                                    <article className={Style.separate}>
                                                        <TextInputStyled typeInput="number" nameLabel={"numberSale"} titleLabel={"Número de Venta"} placeholderText={"Ej: 21923"} value={inputSaleNumber} onChange={handleInputSaleNumber} onKey={handleOnKeySaleNumber} />
                                                    </article>
                                                </>
                                            )
                                        }
                                        {  /*  For generate prediction  */
                                            isForecast && (
                                                <article className={Style.separate}>
                                                    <InputSelectDateStyled
                                                        onLabel={"Año"}
                                                        onChange={handleAnnualChange}
                                                        defaultValue={selectedYear}
                                                    >
                                                        {/* Array.from({ length: 10 }, (_, i) => (
                                                            <option key={i} value={date.getFullYear() - 5 + i}>
                                                                {date.getFullYear() - 5 + i}
                                                            </option>
                                                        )) */}
                                                        {
                                                            Array.from({ length: 10 }, (_, i) => {
                                                                const yearOption = new Date().getFullYear() - 5 + i;
                                                                return (
                                                                <option key={i} value={yearOption}>
                                                                    {yearOption}
                                                                </option>
                                                                );
                                                            })
                                                        }
                                                    </InputSelectDateStyled>

                                                    <MiniBtn onClick={fetchForecast} isWhite={false}>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </MiniBtn>
                                                </article>
                                            )
                                        }


                                    </div>
                                </article>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        <article className={Style.center}>
                            <div className={Style.vertical_article}>
                                {isMonthly && (
                                    <>
                                        <TableSale rows={sales} totals={handleTotalPrint} isShow={true} onShow={handleFetchSale} />,
                                        <MiniTotal size={true}>{totalPrint}</MiniTotal>
                                    </>
                                )}
                                {
                                    isByClient && (
                                        <>
                                            <TableSale rows={clientSales} totals={handleTotalPrint} />,
                                            <MiniTotal>{totalPrint}</MiniTotal>
                                        </>
                                    )
                                }
                                {
                                    isMethod && (
                                        <MiniTotal size={true}>{totalPrint}</MiniTotal>
                                    )
                                }
                                {
                                    isByItem && (
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                    )
                                }
                                {
                                    isForecast && (
                                    <>
                                        <MiniTotal size={true}>
                                            {totalForecast}
                                        </MiniTotal>
                                    </>
                                )}
                            </div>
                        </article>
                    </div>
                    <div className={Style.item3}>

                        {
                            (isByClient || isAnnual || isMonthly || isMethod || isByItem || isForecast/* by predict  */) && (
                                <>


                                    <SalesCharts
                                        salesData={sales}
                                        clientSales={clientSales}
                                        item={itemSales}
                                        method={methodSales}
                                        methodName={inputMethod}
                                        selectedYear={selectedYear}
                                        selectedMonth={selectedMonth + 1}
                                        reportType={inputReportType}
                                        monthlyTotalsByName={monthlyTotalsByName}
                                        clientName={inputNameClient}
                                        forecastData={forecastData}
                                        advice={advice}
                                    ></SalesCharts>


                                </>

                            )
                        }

                    </div>
                </article>

            </Container>
        </div>
    )

}

export default Sales
