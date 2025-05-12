import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import InputSelectDateStyled from '../../components/inputs/inputSelectDateStyled/InputSelectDateStyled'
import InputSelectStyled from '../../components/inputs/inputSelectStyled/InputSelectStyled'
import Style from './Sales.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faTruck/*, faPencil*/ } from "@fortawesome/free-solid-svg-icons"
import Dialog from '../../components/modals/dialog/Dialog'
import MessageModal from '../../components/modals/messageModal/MessageModal'
import { TableSale } from '../../components/tables/tableSale/TableSale'
import { createPortal } from 'react-dom'
import MiniTotal from '../../components/totals/miniTotal/MiniTotal'
import SalesCharts from '../../components/graphics/salesChart/SalesChart'
import { useDispatch, useSelector } from "react-redux";
import { addItem,/* changeClient, deleteItem  */} from "../../redux/ItemSlice";
import {addSale} from '../../redux/SaleSlice';
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
    const [inputReportType, setInputReportType] = useState("");
    const [isMonthly, setIsMonthly] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    const [isMethod, setIsMethod] = useState(false);
    const [isByClient, setIsByClient] = useState(false);
    const [isByItem, setIsByItem] = useState(false);
    const [weeks, setWeeks] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [inputMethod, setInputMethod] = useState("");
    const [inputNameClient, setInputNameClient] = useState("");
    const [inputDNI, setInputDNI] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputItemName, setInputItemName] = useState("");
    const [totalPrint, setTotalPrint] = useState(0);
    const [monthlyTotalsByName, setMonthlyTotalsByName]= useState([]);
    const [clientSales, setClientSales] = useState([])
    const [methodSales, setMethodSales] = useState({})
    const [itemSales, setItemSales] = useState({})
    const [modalOpenSale, setModalOpenSale] = useState(false)


    
    const item = useSelector((state)=> state.item);
    const sale =useSelector((state)=> state.sale)
    

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

    const fetchSale = async(saleNumber) =>{
        try{
            const request = await axios.get((`${config.API_BASE}sale/number/${saleNumber}`))
            const response = request.data
            dispatch(addSale(response.data))
            
        }catch(error){
            setMessage("venta NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
                        }, 3500);
        }
    }

    const fetchItem = async() => {
        
        try{
            const request = await axios.get((`${config.API_BASE}item/code/${inputCode}`))
            const response = request.data
            dispatch(addItem(response.item))
            setInputItemName(`${response.item.name} ${response.item.brand}`)
        }catch(error){
            setMessage("Artículo NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
                        }, 3500);
        }
        
        
    }

    const fetchMonthlyTotalsByName = async ()=>{
        try {
            const response =
                await axios.get(`${config.API_BASE}sale/year/${selectedYear}`)
                setMonthlyTotalsByName(response.data.data);
            console.log(response.data.data)
    
        } catch (error) {
            setMessage("sin info")
    
        }
    }

    const fetchFindTotalProductAmountByCodeAndMonth = async () =>{
        
    try{   const response =
                await axios.get(`${config.API_BASE}sale/item/${inputCode}/${selectedYear}`)
                setItemSales(response.data.data);
                await fetchItem();
                
                setTotalPrint(sumMonthlyAmounts(response.data.data))
    }catch(error){
        setMessage("sin info")
    }
    }

    const fetchAnnualClientSalesByDNI = async ()=>{ 
        try{
            const response =
            await axios.get(`${config.API_BASE}sale/client/${inputDNI}/${selectedYear}`)
            setClientSales(response.data.data)
            console.log(response.data.data)
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    

    const fetchTotalPaymentsByTypeAndMonth = async () =>{
        try{
            const response =
            await axios.get(`${config.API_BASE}sale/payments/${inputMethod}/${selectedYear}`)
            setMethodSales(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchTotalPaymentsByTypeAndYear = async (pay) =>{
        try{
            const response =
            await axios.get(`${config.API_BASE}sale/payments/${pay}/${selectedYear}`)
            setMethodSales(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchEditPaidStatusSale = async(saleNumber,oneStatus) =>{
        try{
            const newStatus = {paid:oneStatus}
            await axios.put((`${config.API_BASE}sale/paid/${saleNumber}`),{newStatus})
            
            
        }catch(error){
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

            const fetchSale = async(saleNumber) =>{
        try{
            const request = await axios.get((`${config.API_BASE}sale/number/${saleNumber}`))
            const response = request.data
            dispatch(addSale(response.data))
            
        }catch(error){
            setMessage("venta NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
                        }, 3500);
        }
    }

            setWeeks(weeksData);
        };
        generateWeeks();
        
        isMonthly&&fetchMonthly();
        isAnnual&&fetchMonthlyTotalsByName();
        isByClient&&fetchAnnualClientSalesByDNI();
        isMethod&&fetchTotalPaymentsByTypeAndMonth();
        isByItem&&fetchFindTotalProductAmountByCodeAndMonth();

        


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
                monthly: { isMonthly: true, isAnnual: false, isMethod: false, isByClient: false, isByItem: false },
                annual: { isMonthly: false, isAnnual: true, isMethod: false, isByClient: false, isByItem: false },
                method: { isMonthly: false, isAnnual: false, isMethod: true, isByClient: false, isByItem: false },
                client: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: true, isByItem: false },
                item: { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: true },
            };



            const reportType = reportTypes[type] || { isMonthly: false, isAnnual: false, isMethod: false, isByClient: false, isByItem: false };

            setIsMonthly(reportType.isMonthly);
            setIsAnnual(reportType.isAnnual);
            setIsMethod(reportType.isMethod);
            setIsByClient(reportType.isByClient);
            setIsByItem(reportType.isByItem);
        }
    }

    const handleMethodChange = async(pay) => {
        setInputMethod(pay);
        await fetchTotalPaymentsByTypeAndYear(pay);

    }

    const handleOnKeyClient = async (e) => {
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchAnnualClientSalesByDNI();

        }
    }

    const handleOnKeyItem = async (e) =>{
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchFindTotalProductAmountByCodeAndMonth();
        }

    }

    const handleTotalPrint = (total) => {
        setTotalPrint(total)
    }

    const handleFetchSale = async(number) =>{
        await fetchSale(number)
        setModalOpenSale(true)

    }

    const payment = [{ label: "Efectivo", value: "cash" }, { label: "Credito", value: "credit" }, { label: "Debito", value: "debit" }, { label: "Cuenta Corriente", value: "currentAccount" }, { label: "Cheque", value: "check" }]

    const reportType = [{ label: "Selecciona una opción", value: "" }, { label: "Venta Mensual", value: "monthly" }, { label: "Venta Anual", value: "annual" }, { label: "Metodo de Pago", value: "method" }, { label: "Ventas por Clientes", value: "client" }, { label: "Ventas por Producto", value: "item" }]

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
                {modalOpenSale && createPortal(<SaleModal TheSale={sale} onEditStatus={fetchEditPaidStatusSale} onEditDescription={null} onPrint={null} onDelete={null} onClose={handleClose}  />, document.body)}
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
                                                </article>
                                            )
                                        }
                                        {
                                            isByClient && (
                                                <article className={Style.separate}>
                                                    <TextInputStyled titleLabel={"Nombre del Cliente"} nameLabel={"client"} placeholderText={"Ej: Juan Gomez"} value={inputNameClient} onChange={handleInputNameClient} typeInput={"text"} size={false} />
                                                    <TextInputStyled typeInput="number" nameLabel={"dni"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputDNI} onChange={handleInputDNI} onKey={handleOnKeyClient} />
                                                    
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
                                                    <TextInputStyled titleLabel={"Nombre de Artículo"} nameLabel={"itemName"} placeholderText={"Ej: Guantes"} value={inputItemName} onChange={handleInputItemName} typeInput={"text"} size={false} />
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


                                    </div>
                                </article>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        <article className={Style.center}>
                            <div className={Style.vertical_article}>
                                { isMonthly && (
                                    <>
                                        <TableSale rows={sales} totals={handleTotalPrint} isShow={true} onShow={handleFetchSale} />,
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                    </>
                                )}
                                {
                                    isByClient&&(
                                        <>
                                        <TableSale rows={clientSales} totals={handleTotalPrint} />,
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                        </>
                                    )
                                }
                                {
                                    isMethod&&(
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                    )
                                }
                                {
                                    isByItem&&(
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                    )
                                }
                            </div>
                        </article>
                    </div>
                    <div className={Style.item3}>
                        
                        {
                            (isByClient || isAnnual || isMonthly || isMethod || isByItem) && (
                                <>
                                    
                                        
                                            <SalesCharts salesData={sales} clientSales={clientSales} item={itemSales} method={methodSales} selectedYear={selectedYear} selectedMonth={selectedMonth+1} reportType={inputReportType} monthlyTotalsByName={monthlyTotalsByName}></SalesCharts>
                                        
                                    
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
