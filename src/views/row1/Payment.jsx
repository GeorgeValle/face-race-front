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
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);


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

const handleDayChange = () =>{

}

const handleMonthChange = () =>{

}

const handleYearChange = () =>{

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
                                    <InputSelectDateStyled onLabel={"Día"} onChange={handleDayChange} defaultValue={day}>
                                    {/* {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))} */}
                                    </InputSelectDateStyled>
                                </div>
                                <div>
                                    <InputSelectDateStyled defaultValue={month} onChange={handleMonthChange} onLabel={"Mes"}>
                                        {/* {months.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))} */}
                                        
                                    </InputSelectDateStyled>
                                </div>
                                <div>
                                    <InputSelectDateStyled defaultValue={year} onChange={handleYearChange} onLabel={"Año"}>
                                        {/* {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))} */}
                                    </InputSelectDateStyled>
                                </div>                                    
                            </div>
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