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
import PurchasesCharts from '../../components/graphics/purchasesChart/PurchasesChart'
import { useDispatch, useSelector } from "react-redux";
import { addItem,/* changeClient, deleteItem  */} from "../../redux/ItemSlice";
import {addPurchase} from '../../redux/PurchaseSlice';
import PurchaseModal from '../../components/modals/purchaseModal/PurchaseModal'
import axios from 'axios'
import config from '../../config/Envs'

const Purchases = () => {
    const [date, setDate] = useState(new Date());
    const [purchases, setPurchases] = useState([])
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("")
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [modalOpenDialog, setModalOpenDialog] = useState(false);
    const [inputNumber, setInputNumber] = useState(Number);
    const [inputName, setInputName] = useState("");
    const [inputPurchaseNumber, setInputPurchaseNumber] = useState(Number)
    const [inputReportType, setInputReportType] = useState("");
    const [isMonthly, setIsMonthly] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    const [isMethod, setIsMethod] = useState(false);
    const [isBySupplier, setIsBySupplier] = useState(false);
    const [isByItem, setIsByItem] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false)
    const [weeks, setWeeks] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [inputMethod, setInputMethod] = useState("");
    const [inputNameSupplier, setInputNameSupplier] = useState("");
    const [inputCUIT, setInputCUIT] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputItemName, setInputItemName] = useState("");
    const [totalPrint, setTotalPrint] = useState(0);
    const [monthlyTotalsByName, setMonthlyTotalsByName]= useState([]);
    const [supplierPurchases, setSupplierPurchases] = useState([])
    const [methodPurchases, setMethodPurchase] = useState({})
    const [itemPurchases, setItemPurchases] = useState({})
    const [modalOpenPurchase, setModalOpenPurchase] = useState(false)


    
    const item = useSelector((state)=> state.item);
    const purchase =useSelector((state)=> state.purchase)
    

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
        setModalOpenPurchase(false)
    }

    const handleDeletePurchase = () => {

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
    const handleInputNameSupplier = () => {

    }

    const handleInputCUIT = (e) => {
        setInputCUIT(parseInt(e.target.value))
    }

    const handleInputItemName = () => {

    }

    const handleInputCode = (e) => {
        setInputCode(e.target.value)

    }

    const handleInputPurchaseNumber = (e) =>{
        setInputPurchaseNumber(e.target.value)
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
                await axios.get(`${config.API_BASE}purchase/month/${selectedMonth + 1}/year/${selectedYear}`)
            setPurchases(response.data.data);
            
        } catch (error) {
            setMessage("sin info")

        }
    }

    const fetchPurchase = async(purchaseNumber) =>{
        try{
            const request = await axios.get((`${config.API_BASE}purchase/number/${purchaseNumber}`))
            const response = request.data
            dispatch(addPurchase(response.data))
            if (response.data){
            setModalOpenPurchase(true)
            }
        }catch(error){
            setMessage("Compra NO encontrada")
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
                await axios.get(`${config.API_BASE}purchase/year/${selectedYear}`)
                setMonthlyTotalsByName(response.data.data);
            console.log(response.data.data)
    
        } catch (error) {
            setMessage("sin info")
    
        }
    }

    const fetchFindTotalProductAmountByCodeAndMonth = async () =>{
        
    try{   const response =
                await axios.get(`${config.API_BASE}purchase/item/${inputCode}/${selectedYear}`)
                setItemPurchases(response.data.data);
                await fetchItem();
                
                setTotalPrint(sumMonthlyAmounts(response.data.data))
    }catch(error){
        setMessage("sin info")
    }
    }

    const fetchAnnualSupplierPurchasesByCUIT = async ()=>{ 
        try{
            const response =
            await axios.get(`${config.API_BASE}purchase/supplier/${inputCUIT}/${selectedYear}`)
            setSupplierPurchases(response.data.data)
            console.log(response.data.data)
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    

    const fetchTotalPaymentsByTypeAndMonth = async () =>{
        try{
            const response =
            await axios.get(`${config.API_BASE}purchase/payments/${inputMethod}/${selectedYear}`)
            setMethodPurchase(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchTotalPaymentsByTypeAndYear = async (pay) =>{
        try{
            const response =
            await axios.get(`${config.API_BASE}purchase/payments/${pay}/${selectedYear}`)
            setMethodPurchase(response.data.data)
            setTotalPrint(sumMonthlyAmounts(response.data.data))
        }catch(error){
            setMessage("Error al buscar las ventas")
        }
    }

    const fetchEditPaidStatusPurchase = async(purchaseNumber,oneStatus) =>{
        try{
            
            await axios.put((`${config.API_BASE}purchase/paid/${purchaseNumber}`),{paid:oneStatus})
            
            
            
        }catch(error){
            setMessage("Compra NO actualizada")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
                        }, 3500);
        }
    }

    const fetchEditDescription = async (purchaseNumber,oneDescription) =>{
        try{
            
            await axios.put((`${config.API_BASE}purchase/description/${purchaseNumber}`),{description:oneDescription});
            
            
        }catch(error){
            setMessage("Compra NO actualizada")
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
        
        isMonthly&&fetchMonthly();
        isAnnual&&fetchMonthlyTotalsByName();
        isBySupplier&&fetchAnnualSupplierPurchasesByCUIT();
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
                monthly: { isMonthly: true, isAnnual: false, isMethod: false, isBySupplier: false, isByItem: false, isPurchase: false },
                annual: { isMonthly: false, isAnnual: true, isMethod: false, isBYSupplier: false, isByItem: false, isPurchase: false },
                method: { isMonthly: false, isAnnual: false, isMethod: true, isBySupplier: false, isByItem: false, isPurchase: false },
                supplier: { isMonthly: false, isAnnual: false, isMethod: false, isBySupplier: true, isByItem: false, isPurchase: false },
                item: { isMonthly: false, isAnnual: false, isMethod: false, isBySupplier: false, isByItem: true, isPurchase: false },
                purchase:{isMonthly: false, isAnnual: false, isMethod: false, isBySupplier: false, isByItem: false, isPurchase: true }
            };



            const reportType = reportTypes[type] || { isMonthly: false, isAnnual: false, isMethod: false, isBySupplier: false, isByItem: false, isPurchase: false };

            setIsMonthly(reportType.isMonthly);
            setIsAnnual(reportType.isAnnual);
            setIsMethod(reportType.isMethod);
            setIsBySupplier(reportType.isBySupplier);
            setIsByItem(reportType.isByItem);
            setIsPurchase(reportType.isPurchase);
        }
    }

    const handleMethodChange = async(pay) => {
        setInputMethod(pay);
        await fetchTotalPaymentsByTypeAndYear(pay);

    }

    const handleOnKeySupplier = async (e) => {
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchAnnualSupplierPurchasesByCUIT();

        }
    }

    const handleOnKeyItem = async (e) =>{
        if (e.key === 'Enter' || e.key === 'Intro') {
            await fetchFindTotalProductAmountByCodeAndMonth();
        }

    }
    
    const handleOnKeyPurchaseNumber = async (e) =>{
        if (e.key === 'Enter' || e.key === 'Intro'){
            try{
            await fetchPurchase(inputPurchaseNumber);
            
            }catch{
                setMessage("Compra NO encontrada")
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

    const handleFetchPurchase = async(number) =>{
        await fetchPurchase(number)
    }

    const payment = [{ label: "Efectivo", value: "cash" }, { label: "Credito", value: "credit" }, { label: "Debito", value: "debit" }, { label: "Cuenta Corriente", value: "currentAccount" }, { label: "Cheque", value: "check" }]

    const reportType = [{ label: "Selecciona una opción", value: "" }, { label: "Venta Mensual", value: "monthly" }, { label: "Venta Anual", value: "annual" }, { label: "Metodo de Pago", value: "method" }, { label: "Ventas por Clientes", value: "client" }, { label: "Ventas por Producto", value: "item" },{label:"Número de venta",value:"sale"}]

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
                {modalOpenDialog && (<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDeletePurchase} onClose={handleClose} />)}
                {modalOpenPurchase&& createPortal(<PurchaseModal ThePurchase={purchase} onEditStatus={fetchEditPaidStatusPurchase} onEditDescription={fetchEditDescription} onPrint={null} onDelete={null} onClose={handleClose}  />, document.body)}
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
                                            isBySupplier && (
                                                <article className={Style.separate}>
                                                    <TextInputStyled titleLabel={"Nombre del proveedor"} nameLabel={"supplier"} placeholderText={"Ej: Juan Gomez"} value={inputNameSupplier} onChange={handleInputNameSupplier} typeInput={"text"} size={false} />
                                                    <TextInputStyled typeInput="number" nameLabel={"cuit"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputCUIT} onChange={handleInputCUIT} onKey={handleOnKeySupplier} />
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
                                        {
                                            isPurchase&&(
                                                <>
                                                <article className={Style.separate}>
                                                    <TextInputStyled typeInput="number" nameLabel={"numberPurchase"} titleLabel={"Número de compra"} placeholderText={"Ej: 21923"} value={inputPurchaseNumber} onChange={handleInputPurchaseNumber} onKey={handleOnKeyPurchaseNumber} />
                                                </article>
                                                </>
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
                                        <TableSale rows={purchases} totals={handleTotalPrint} isShow={true} onShow={handleFetchPurchase} />,
                                        <MiniTotal>{totalPrint}</MiniTotal>
                                    </>
                                )}
                                {
                                    isBySupplier&&(
                                        <>
                                        <TableSale rows={supplierPurchases} totals={handleTotalPrint} />,
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
                            (isBySupplier || isAnnual || isMonthly || isMethod || isByItem) && (
                                <>
                                    
                                        
                                            <PurchasesCharts purchasesData={purchase} supplierPurchases={supplierPurchases} item={itemPurchases} method={methodPurchases} selectedYear={selectedYear} selectedMonth={selectedMonth+1} reportType={inputReportType} monthlyTotalsByName={monthlyTotalsByName}></PurchasesCharts>
                                        
                                    
                                </>
                                
                            )
                        }
                    
                    </div>
                </article>

            </Container>
        </div>
    )

}

export default Purchases
