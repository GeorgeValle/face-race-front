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
    const [saleDate, setSaleDate] = useState("");
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
        await axios.post(`${config.API_BASE}item/register`, {
            payment:payment,
            itemList:itemsList,
            description:description,
            saleDate: saleDate,
            saleTime: saleTime,
            paid:paid,
            client:client,


        })
        //const response =  request.data;
        //setLoading(false);
        onSubmit(message);
    } catch (err) {
        //setError(err);
        onSubmit(`Error al crear Item`);
    }
}
const handleDateSubmit = () => {
    const dateSubmit = `${day}/${month + 1}/${year}`;
    setSaleDate(dateSubmit);
};

const getActualHour = () => {
    const dateNow = new Date();
    const hour = dateNow.getHours();
    const minutes = dateNow.getMinutes();
    const seconds = dateNow.getSeconds();
  
    const hourString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    setSaleTime(hourString)
  }

    return(
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Cobro"} btnBack={true} />
                <article className={Style.content}>
                    <div className={Style.column1}>
                        <div className={Style.row1}>
                            
                            <BtnCommon title={"Efectivo"} nameInput={"cash"} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} placeholderText={"Dinero recibido"}></TextInput>
                        </div>
                        <div className={Style.row2}>
                            <BtnCommon title={"Crédito"} nameInput={"credit"} colorViolet={true}  ></BtnCommon>
                            <div>
                                <TextInput typeInput={"number"} placeholderText={"Número operación"}></TextInput>
                                <TextInput typeInput={"number"} placeholderText={"Cantidad de cuotas"}></TextInput>
                                
                            </div>
                        </div>
                        <div className={Style.row3}>
                        
                            <BtnCommon title={"C. Corriente"} nameInput={"cash"} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} placeholderText={"Dinero recibido"}></TextInput>
                        </div>
                        <div className={Style.row4}>
                            <BtnCommon title={"Débito"} nameInput={"debit"} colorViolet={true}  ></BtnCommon>
                            <TextInput typeInput={"number"} placeholderText={"Número Operación"}></TextInput>
                        </div>
                        <div className={Style.row5}>
                            <BtnCommon title={"Cheque"} nameInput={"check"} colorViolet={true}  ></BtnCommon>
                            
                                <div>
                                <TextInput typeInput={"number"} nameInput={"checkNumber"} placeholderText={"Número Cheque"}></TextInput>
                                <TextInput typeInput={"number"}  nameInput={"checkAmount"} placeholderText={"Importe"}></TextInput>
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