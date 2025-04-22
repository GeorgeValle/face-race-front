import Container from '../../components/container/Container';
import MiniNavBar from '../../components/miniNavbar/MIniNavBar';
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon';
import TextInput from '../../components/inputs/textInput/TextInput';
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled';
import MidTotal from '../../components/totals/midTotal/MidTotal';
import MiniTotal from '../../components/totals/miniTotal/MiniTotal'
import MiniDescription from '../../components/totals/miniDescription/MiniDescription';
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge';
import InputSelectDateStyled from '../../components/inputs/inputSelectDateStyled/InputSelectDateStyled'
import InputSelectStyled from '../../components/inputs/inputSelectStyled/InputSelectStyled';
import Style from './Payment.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserPlus, faWallet, faXmark, faPencil, faMagnifyingGlass, faBroomBall, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation';
import { useState, useEffect } from 'react'
import { addItems, removeItem, clearItems, updateItemQuantity } from '../../redux/ItemsListSlice';
import { useDispatch, useSelector } from "react-redux";
import { addClient, deleteClient } from "../../redux/ClientSlice";
import config from "../../config/Envs"
import axios from "axios";



const Payment = () =>{

    const [isPayment, setIsPayment] = useState(false);
    
    const [payment, setPayment] = useState([]);
    const [paid, setPaid] = useState(false);
    const [saleDate, setSaleDate] = useState(Date);
    const [saleTime, setSaleTime] = useState("");

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    const [payDays, setPayDays] = useState([]);
    const [payMonths, setPayMonths] = useState([]);
    const [payYears, setPayYears] = useState([]);

    const [payDay, setPayDay]= useState("");
    const [payMonth, setPayMonth]= useState("");
    const [payYear, setPayYear]= useState("");

    // const [expirationDay, setExpirationDate] = useState(0);
    // const [expirationMonth, setExpirationMonth] = useState(0);
    // const [expirationYear, setExpirationYear] = useState(0);

    const [description, setDescription] = useState("");

    const [oneMessage, setOneMessage] = useState("");

    const [inputCash, setInputCash] = useState("")
    const [inputCredit, setInputCredit] = useState("")
    const [inputOperationCredit, setInputOperationCredit] = useState("")
    const [installments, setInstallments] = useState(1)
    const [inputDebit, setInputDebit] = useState()
    const [inputOperationDebit, setInputOperationDebit] = useState("")
    const [inputCurrentAccount, setInputCurrentAccount] = useState("")
    const [inputCheck, setInputCheck] = useState("")
    const [inputNumberCheck, setInputNumberCheck] = useState("")

    

    




    const vuelto = "0.00"

const cobrado = "1.00"

const dispatch = useDispatch()
const items = useSelector((state) => state.itemsList)
const client = useSelector((state)=> state.client)

//handles
const handlePay = () =>{

}

const handleClearItems = ()=>{
    dispatch(clearItems())
    dispatch(deleteClient())
}

// const handleDayChange = () =>{

// }

// const handleMonthChange = () =>{

// }

// const handleYearChange = () =>{

// }


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
        for (let i = 2024; i <= currentDate.getFullYear(); i++) {
            yearsArray.push(i);
        }
        setYears(yearsArray);
    };

    const calculatePayDays = (month, year) => {
        const date = new Date(year, month, 0);
        const numberOfDays = date.getDate();
        const currentDate = new Date();
        const daysArray = [];
        for (let i = 1; i <= numberOfDays; i++) {
            if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1) {
                if (i >= currentDate.getDate()) {
                    daysArray.push(i);
                }
            } else {
                daysArray.push(i);
            }
        }
        setPayDays(daysArray);
    };

    const calculatePayMonths = (year) => {
        const currentDate = new Date();
        const monthsArray = [];
        for (let i = 1; i <= 12; i++) {
            if (year === currentDate.getFullYear()) {
                if (i >= currentDate.getMonth() + 1) {
                    monthsArray.push(i);
                }
            } else {
                monthsArray.push(i);
            }
        }
        setPayMonths(monthsArray);
    };

    const calculatePayYears = () => {
        const currentDate = new Date();
        const yearsArray = [];
        for (let i = currentDate.getFullYear(); i <= 2030; i++) {
            yearsArray.push(i);
        }
        setPayYears(yearsArray);
    };

    // handles date
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

    const handlePayYearChange = (e) => {
        setPayYear(e.target.value);
        calculatePayMonths(e.target.value);
        calculatePayDays(payMonth, e.target.value);
    };

    const handlePayMonthChange = (e) => {
        setPayMonth(e.target.value);
        calculatePayDays(e.target.value, payYear);
    };

    const handlePayDayChange = (e) => {
        setPayDay(e.target.value);
    };



    const handleSaveDate = (day, month, year) => {
        let date;

        //assign date today
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // months of 0 to 11
        const currentYear = today.getFullYear();


        if (day === currentDay && month === currentMonth && year === currentYear) {
            const currentDate = new Date();
            date = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
            const currentIsoTime = currentDate.toISOString().split("T")[1];
            setSaleTime(currentIsoTime)
        } else {
            //create date whit value in 0
            const zeroTimeISO = new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0)).toISOString();
            // update state whit hout in 0
            setSaleTime(zeroTimeISO.split("T")[1]); //save only the hour part
            date = new Date(year, month - 1, day);
        }
        // const utcHours = date.getUTCHours();
        // const utcMinutes = date.getUTCMinutes();
        // const utcSeconds = date.getUTCSeconds();
        // const utcMilliseconds = date.getUTCMilliseconds();
        // const timezoneOffset = -3 * 60 * 60 * 1000; // UTC-3 para Argentina
        // const argentinaDate = new Date(date.getTime() + timezoneOffset);
        // return argentinaDate;
        setSaleDate(date);
    };
    //example generate day
    // let fecha = generateDate(day, month, year);

    // fecha = fecha.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })

    // restring values date in selects
    useEffect(() => {
        //assign date today
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // Los meses van de 0 a 11
        const currentYear = today.getFullYear();

        setPayDay(currentDay.toString());
        setPayMonth(currentMonth.toString());
        setPayYear(currentYear.toString());

        setDay(currentDay.toString())
        setMonth(currentMonth.toString())
        setYear(currentYear.toString())
        

        calculateDays(currentMonth, currentYear);
        calculateMonths(currentYear);
        calculateYears();

        calculatePayDays(currentMonth, currentYear)
        calculatePayMonths(currentYear);
        calculatePayYears();
    }, []);

const handleNewSale = async ()=>{
    try{

        handleSaveDate(day, month, year);


        await axios.post(`${config.API_BASE}item/register`, {
            payment:payment,
            itemList:items,
            description:description,
            saleDate: saleDate,
            saleTime: saleTime,
            paid:paid,
            client:client,


        })
        //const response =  request.data;
        //setLoading(false);
        setOneMessage("Venta Exitosa");
    } catch (err) {
        //setError(err);
        setOneMessage(`Error al realizar la venta`);
    }
}
const handleSavePayDate = () => {
    const formattedDate = new Date(`${payYear}-${payMonth.padStart(2, "0")}-${payDay.padStart(2, "0")}T00:00:00.000Z`);
    return formattedDate;
};

const getActualHour = () => {
    const dateNow = new Date();
    const hour = dateNow.getHours();
    const minutes = dateNow.getMinutes();
    const seconds = dateNow.getSeconds();
  
    const hourString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    setSaleTime(hourString)
  }

  const handleCashPayment = () =>{
    
    setPayment([...{cash:{amount:inputCash}}])
    setPaid(true)

  }

  const handleDebitPayment =()=>{
    
    setPayment([...{debit:{amount:inputDebit,operation:inputOperationDebit}}])
    setPaid(true)


  }

  const handleCreditPayment= () =>{
    
   setPayment([...{credit:{amount:inputCredit,operation:inputOperationCredit,installments:installments}}])
   setPaid(true)
  }

  const handleCurrentAccountPayment=()=>{
    
    setPayment([...{currentAccount:{amount:inputCurrentAccount}}])
    setPaid(false)
  }

  const handleCheckPayment=()=>{
    
    setPayment([...{check:{amount:inputCheck,numberCheck:inputNumberCheck,payDay:handleSavePayDate()}}])
  }

  const handleInstalment = (num)=>{
    setInstallments(num)
  }
  const quantityCredit = [{label:"1",value:1},{label:"3",value:3},{label:"6",value:6},{label:"9",value:9},{label:"12",value:12}]
    return(
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Cobro"} btnBack={true} />
                <article className={Style.content}>
                    <div className={Style.column1}>
                        <div className={Style.row1}>
                            
                            <BtnCommon title={"Efectivo"} nameInput={"cash"} onClick={handleCashPayment} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} value={inputCash} onChange={(e)=>setInputCash(e.target.value)} placeholderText={"Dinero recibido"}></TextInput>
                        </div>
                        <div className={Style.row2}>
                            <BtnCommon title={"Crédito"} nameInput={"credit"} colorViolet={true}  ></BtnCommon>
                            <div>
                                <TextInput typeInput={"number"} value={inputOperationCredit} onChange={(e)=>setInputOperationCredit(e.target.value)} placeholderText={"Operación"}></TextInput>
                                <TextInput typeInput={"number"} value={inputCredit} onChange={(e)=>setInputCredit(e.target.value)} placeholderText={"Importe"}></TextInput>
                                <div className={Style.selectGroup}>
                                    <div>
                                        <InputSelectStyled onLabel={"Cuotas"} onSetValue={ handleInstalment} defaultValue={installments} options={quantityCredit}>
                                        
                                        </InputSelectStyled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.row3}>
                        
                            <BtnCommon title={"C. Corriente"} nameInput={"currentAccount"} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} value={inputCurrentAccount} onChange={(e)=>setInputCurrentAccount(e.target.value)} placeholderText={"Importe"}></TextInput>
                        </div>
                        <div className={Style.row4}>
                            <BtnCommon title={"Débito"} nameInput={"debit"} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} placeholderText={"Operación"}></TextInput>
                            <TextInput typeInput={"number"} value={inputDebit} placeholderText={"Importe"} onChange={(e)=>setInputDebit(e.target.value)}></TextInput>
                        </div>
                        <div className={Style.row5}>
                            <BtnCommon title={"Cheque"} nameInput={"check"} colorViolet={true}  ></BtnCommon>
                            
                                <div>
                                <TextInput typeInput={"number"} nameInput={"checkNumber"} value={inputNumberCheck} onChange={(e)=>setInputNumberCheck(e.target.value)} placeholderText={"Número Cheque"}></TextInput>
                                <TextInput typeInput={"number"}  nameInput={"checkAmount"} value={inputCheck} onChange={(e)=>setInputCheck(e.target.value)} placeholderText={"Importe"}></TextInput>
                                </div>
                            <div className={Style.selectGroup}>
                                <div>
                                    <InputSelectDateStyled onLabel={"Día"} onChange={handlePayDayChange} defaultValue={payDay}>
                                    {payDays.map((Day) => (
                                        <option key={Day} value={Day}>
                                            {Day}
                                        </option>
                                    ))}
                                    </InputSelectDateStyled>
                                </div>
                                <div>
                                    <InputSelectDateStyled defaultValue={payMonth} onChange={handlePayMonthChange} onLabel={"Mes"}>
                                        {payMonths.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                        
                                    </InputSelectDateStyled>
                                </div>
                                <div>
                                    <InputSelectDateStyled defaultValue={payYear} onChange={handlePayYearChange} onLabel={"Año"}>
                                        {payYears.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </InputSelectDateStyled>
                                </div>                                    
                            </div>
                        </div>
                        <div className={Style.row6}>
                            <InputSelectDateStyled onLabel={"Día"} onChange={handleDayChange} defaultValue={day}>
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </InputSelectDateStyled>
                            <InputSelectDateStyled defaultValue={month} onChange={handleMonthChange} onLabel={"Mes"}>
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </InputSelectDateStyled>
                            <InputSelectDateStyled defaultValue={year} onChange={handleYearChange} onLabel={"Año"}>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </InputSelectDateStyled>
                            <TextInputStyled titleLabel={"Observaciones"} size={false} onChange={(e) => setDescription(e.target.value)} value={description} />
                        </div>
                    </div>
                    <div className={Style.column2}>
                        
                        <MiniTotal > 125.000 </MiniTotal>
                        <MiniDescription description={"Recibido"} isGreen={true} > {cobrado} </MiniDescription>
                        <MiniDescription description={"Vuelto"} isGreen={false} isWhite={true}> {vuelto} </MiniDescription>
                        <div className={Style.BtnLarge}>
                            {isPayment ?
                                (<BtnVioletLarge onClick={handlePay} > Confirmar Cobro <FontAwesomeIcon icon={faCircleCheck} /></BtnVioletLarge>)
                                :(<BtnVioletLarge onClick={handlePay} bgDisable={true} disabled={true} >Confirmar Pago <FontAwesomeIcon icon={faCircleCheck} /></BtnVioletLarge>)
                            }
                        </div>
                        <div className={Style.Cancel}>
                            <BtnCommon title={"Cancelar "} colorRed={true} onClick={handleClearItems}> <FontAwesomeIcon icon={faXmark} /> </BtnCommon>
                        </div>
                        <div className={Style.BtnsShort}>
                        </div>
                    </div>

                </article>
            </Container>
        </div>
    )
}

export default Payment;