import Style from './ItemModal.module.css'
// import MIniNavBar from '../../miniNavbar/MIniNavBar'
import BtnClose from '../../btns/btnClose/BtnClose'
import TextInputStyled from '../../inputs/inputTextStyled/TextInputStyled'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { /* faTrash, faPencil,*/ faXmark,faFloppyDisk  } from "@fortawesome/free-solid-svg-icons"
import { /* addItem, deleteItem, updatePrice, */ subtractStock } from "../../../redux/ItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState} from 'react'
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import TextViewShiftPDF from "../../textViews/textViewShiftPDF/TextViewShiftPDF"

// import axios from 'axios'

// import config from '../../../config/Envs'
//import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";



const ItemModal = ({  size=false, addItemList=null, isPurchase=false, onEditStock=null, handleCancel=null  }) =>{

    //Variables Redux
    const item = useSelector((state) => state.item);

    const dispatch = useDispatch();
    
    
    // const [selectedOption, setSelectedOption] = useState(TheShift.status);
    //const [row, setRow] = useState(TheItem);
    const [inputQuantity, setInputQuantity] = useState(1);
    const [inputPrice, setInputPrice] = useState(isPurchase?0:item.price);
    const [localStock, setLocalStock] = useState(item.stockQuantity);
    // const [defaultStock, setDefaultStock] = useState(item.stockQuantity)
    const [discount, setDiscount] = useState(0);
    const [amountDiscount, setAmountDiscount] = useState(0);
    const [surcharge, setSurcharge] = useState(0);
    const [amountSurcharge, setAmountSurcharge] = useState(0);
    // const [amountAdjustment, setAmountAdjustment] =useState(0);
    const [referencePrice, setReferencePrice] = useState(item.price||0);
    const [amount, setAmount] = useState(isPurchase?0:item.price)


// useEffect(() => {
//         switch(selectedOption){
//             case 'pending':
//                 setTheStatus('Pendiente');
//                 break;
//             case 'attended':
//                 setTheStatus('Atendido');
//                 break;
//             case 'missing':
//                 setTheStatus('Ausente');
//                 break;
//             case 'canceled':
//                 setTheStatus('Cancelado');
//                 break;
//             default:
//                 setTheStatus('Agendado');
//         }
//     }, [selectedOption]);
    
// formatStatusToSpanish(TheShift.status);

const handleQuantityChange = (e) => {
    let quantity = parseFloat(e.target.value);
    
    setInputQuantity(quantity);
    if (quantity!=""||quantity > 0 ) {
        // setInputQuantity(quantity);
        let stock = localStock
        //if (quantity <= stock) {
            if(!discount && !surcharge){
                setAmount(quantity*inputPrice)
                
            }else{
                // let newAmount = ((inputPrice * quantity ) * (1 - (adjustments / 100))).toFixed(2);
                // setAmount(Number(newAmount));
                // setAmountAdjustment((inputPrice * quantity) - Number(newAmount))
                if(surcharge!=discount){ 
                    if(surcharge>discount){
                        const newAdjustment = surcharge - discount;
                         // calculate the amount of adjustment in money
                         const surchargeValue = ((inputPrice * quantity) * (newAdjustment / 100)).toFixed(2);
                        setAmountDiscount(0);
                        setAmountSurcharge(Number(surchargeValue));
            
                        const newAmount = ((inputPrice * quantity ) * (1 + newAdjustment / 100)).toFixed(2);
                
                        setAmount(Number(newAmount))
                    }
                    if(discount>surcharge){
                        const newAdjustment = discount - surcharge;
                        // calculate the amount of adjustment in money
                        const discountValue = ((inputPrice * quantity) * (newAdjustment / 100)).toFixed(2);
                        setAmountSurcharge(0);
                        setAmountDiscount(Number(discountValue));
            
                        const newAmount = ((inputPrice * quantity ) * (1 - newAdjustment / 100)).toFixed(2);
                
                        setAmount(Number(newAmount))
                    }
            }
                
                
        }
        // }else{
        //     alert('No hay suficiente stock')
        // }
    }
};

const handlePriceChange = (e) =>{
    let inputValue = (parseFloat(e.target.value)).toFixed(2);
    let priceEdited = Number(inputValue);
    if(priceEdited!=""){
        setInputPrice(priceEdited);
        // If the discount and surcharge are worth zero
        if(!discount && !surcharge){
            setAmount(inputQuantity*priceEdited)
            
        }else{
            if(surcharge!=discount){ 
                if(surcharge>discount){
                    const newAdjustment = surcharge - discount;
                     // calculate the amount of adjustment in money
                     const surchargeValue = ((priceEdited * inputQuantity) * (newAdjustment / 100)).toFixed(2);
                    setAmountDiscount(0);
                    setAmountSurcharge(Number(surchargeValue));
        
                    const newAmount = ((priceEdited * inputQuantity ) * (1 + newAdjustment / 100)).toFixed(2);
            
                    setAmount(Number(newAmount))
                }
                if(discount>surcharge){
                    const newAdjustment = discount - surcharge;
                    // calculate the amount of adjustment in money
                    const discountValue = ((priceEdited * inputQuantity) * (newAdjustment / 100)).toFixed(2);
                    setAmountSurcharge(0);
                    setAmountDiscount(Number(discountValue));
        
                    const newAmount = ((priceEdited * inputQuantity ) * (1 - newAdjustment / 100)).toFixed(2);
            
                    setAmount(Number(newAmount))
                }
            }
        }
    }
}

const handleDiscountChange = (e) =>{
    let inputDiscount = parseFloat(e.target.value);
    //If inputDiscount is an empty string, then it will be zero.
    inputDiscount=inputDiscount||0
    
    setDiscount(inputDiscount);
    if(surcharge==0){
        const newDiscount = inputDiscount;
        if(newDiscount!=0){
            // calculate the amount of adjustment in money
             const discountValue = ((inputPrice * inputQuantity) * (newDiscount / 100)).toFixed(2);
            setAmountDiscount(Number(discountValue));

        
            const newAmount = ((inputPrice * inputQuantity ) * (1 - newDiscount / 100)).toFixed(2);
    
            setAmount(Number(newAmount))
        }else{
            setAmount(inputPrice*inputQuantity)
        }
    }else{
        if(surcharge==inputDiscount){
            setAmountDiscount(0)
            setAmountSurcharge(0)
            setAmount(inputPrice*inputQuantity)
        }
        if(surcharge>inputDiscount){
            const newAdjustment = surcharge - inputDiscount;
             // calculate the amount of adjustment in money
             const surchargeValue = ((inputPrice * inputQuantity) * (newAdjustment / 100)).toFixed(2);
            setAmountDiscount(0);
            setAmountSurcharge(Number(surchargeValue));

            const newAmount = ((inputPrice * inputQuantity ) * (1 + newAdjustment / 100)).toFixed(2);
    
            setAmount(Number(newAmount))
        }
        if(inputDiscount>surcharge){
            const newAdjustment = inputDiscount - surcharge;
            // calculate the amount of adjustment in money
            const discountValue = ((inputPrice * inputQuantity) * (newAdjustment / 100)).toFixed(2);
            setAmountSurcharge(0);
            setAmountDiscount(Number(discountValue));

            const newAmount = ((inputPrice * inputQuantity ) * (1 - newAdjustment / 100)).toFixed(2);
    
            setAmount(Number(newAmount))
        }
    }
}

const handleSurchargeChange = (e) =>{
    let inputSurcharge = parseFloat(e.target.value);
    //If inputSurcharge is an empty string, then it will be zero.
    inputSurcharge = inputSurcharge || 0;
    
    setSurcharge(inputSurcharge);
    if(discount==0){
        const newSurcharge = inputSurcharge;
        if(newSurcharge!=0){
            // calculate the amount of adjustment in money
            const surchargeValue = (inputPrice * inputQuantity) * (newSurcharge / 100).toFixed(2);
            setAmountSurcharge(Number(surchargeValue));

            
            const newAmount = ((inputPrice * inputQuantity ) * (1 + newSurcharge / 100)).toFixed(2);
        
            //assign the new total amount
            setAmount(Number(newAmount))
                
        }else{
                //assign the new total amount
                setAmount(inputPrice*inputQuantity)
        }
    }else{
        if(inputSurcharge==discount){
            setAmountDiscount(0)
            setAmountSurcharge(0)
            setAmount(inputPrice*inputQuantity)
        }
        if(inputSurcharge>discount){
            const newAdjustment = inputSurcharge - discount;
             // calculate the amount of adjustment in money
             const surchargeValue = ((inputPrice * inputQuantity) * (newAdjustment / 100)).toFixed(2);
            setAmountDiscount(0);
            setAmountSurcharge(Number(surchargeValue));

            const newAmount = ((inputPrice * inputQuantity ) * (1 + newAdjustment / 100)).toFixed(2);
    
            setAmount(Number(newAmount))
        }
        if(discount>inputSurcharge){
            const newAdjustment = discount - inputSurcharge;
            // calculate the amount of adjustment in money
            const discountValue = ((inputPrice * inputQuantity) * (newAdjustment / 100)).toFixed(2);
            setAmountSurcharge(0);
            setAmountDiscount(Number(discountValue));

            const newAmount = ((inputPrice * inputQuantity ) * (1 - newAdjustment / 100)).toFixed(2);
    
            setAmount(Number(newAmount))
        }
    }
}



const handleAddItemList = async () =>{
    //edit mount of stock
    //await onEditStock(item.code, localStock-inputQuantity)
    // setLocalStock(localStock-inputQuantity)
    //!isPurchase&&dispatch(subtractStock(inputQuantity))

    // adjustment:
    let amountAdjustment =0;
    if(discount>surcharge){
        amountAdjustment= -amountDiscount;
    }
    if(surcharge>discount){
        amountAdjustment = amountSurcharge;
    }
    //subAmount:
    const subAmount = (inputPrice* inputQuantity)

    //add this custom item in array itemList
    const newItem =
        { code: item.code, name: item.name, quantity: Number(inputQuantity), price: inputPrice, referencePrice: referencePrice, discountPercentage:discount, amountDiscount: amountDiscount, surchargePercentage:surcharge, amountSurcharge: amountSurcharge, amountAdjustment: amountAdjustment, subAmount: subAmount, amount: amount, checked:false }
        
    addItemList(newItem)

}



// const handleCancel = async () =>{
//     onclose()
//     await onEditStock(defaultStock);
//     dispatch(subtractStock(defaultStock))
    
// }

// const handleEditQuantity = ( quantity) => {
//     setDefaultQuantity(quantity);
//     setdefaultCode(code);
//     setIsModalQuantity(true);
//     }



// Function for format price numbers
const formatNumber = (number) => {
    return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};  

// function for close 
const closeBtn = () =>{
    handleCancel()
}

// let amount;
// amount = calculateAmount(inputQuantity, inputPrice)

    return(
    <div className={Style.modal_container}  >
        <div className={Style.modal} >
            <div className={Style.item}>
                {/* <MIniNavBar miniTitle={""} btnClose={true} close={onClose} /> */}
                <div className={Style.close} ><BtnClose close={closeBtn}/></div>
                {/* <table className={`${Style.table} ${Style.content}`}>
                    <thead >
                        <tr>
                            <th colSpan="4" >DATOS DEL TURNO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nombre:</th>
                            <td>{TheShift.person}</td>
                            <th>DNI:</th>
                            <td>{TheShift.dni}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td colSpan={3}>{TheShift.email}</td>
                            
                        </tr>
                        <tr>
                        <th>Estado:</th>
                        <td>{theStatus}</td>
                        <th>Teléfono:</th>
                        <td>{TheShift.phone}</td>    
                            
                        </tr>
                        <tr>
                            <th>Fecha:</th>
                            <td>{formatDateToSpanish(TheShift.shiftDate)}</td>
                            <th>Hora:</th>
                            <td>{formatHour(TheShift.timeSlot)}</td>
                        </tr>
                        <tr>
                            <th>Observación:</th>
                            <td colSpan={3}>{theDescription}</td>
                            
                        </tr>
                    </tbody>
                </table> */}
                <table className={`${Style.table} ${size?Style.sizeM:Style.sizeL}`}>
                {   
                                        // amount = calculateAmount(inputQuantity, inputPrice)
                                }
                            <thead>
                                <tr>
                                    
                                    <th>Código</th>
                                    <th className={Style.expand}>Artículo</th>
                                    <th>Stock</th>
                                    <th>Cant.</th>
                                    <th>Uní.</th>
                                    <th>Importe</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                            <tr>
                                                
                                                <td>{item.code|| '-'}</td>
                                                <td className={Style.expand}>{item.name || '-'}</td>
                                                <td>
                                                    {/* <span className={Style.actions}>
                                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} onClick={()=>handleModalDialogDeleteRow(row.code||0)} />
                                                        <FontAwesomeIcon icon={faPencil} onClick={()=> handleEditQuantity(row.code||0, row.quantity||0) } />
                                                    </span> */}
                                                    {localStock||0}
                                                </td>
                                                <td>{inputQuantity||0}</td>
                                                <td>
                                                    $ {formatNumber(inputPrice)}
                                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                                </td>
                                                <td>$ {formatNumber(amount)}</td>
                                            </tr>
                            </tbody>
                        </table>
                <div className={Style.row_title}>
                    <TextInputStyled titleLabel={"Cantidad"} size={false} onChange={handleQuantityChange} value={inputQuantity} typeInput={"number"} />
                    <TextInputStyled titleLabel={"Precio"} size={false} onChange={handlePriceChange} value={inputPrice} typeInput={"number"} />
                    <TextInputStyled titleLabel={"Descuento"} size={true} onChange={handleDiscountChange} value={discount} typeInput={"number"} />
                    <TextInputStyled titleLabel={"Recargo"} size={true} onChange={handleSurchargeChange} value={surcharge} typeInput={"number"} />
                    <div className={Style.row_title}>
                        <div className={Style.btn_position}>
                            <MiniBtn tooltip={"Cancelar"} onClick={closeBtn} isRed={true}><FontAwesomeIcon icon={faXmark} /></MiniBtn>
                        </div>
                        <div className={Style.btn_position}>
                            <MiniBtn tooltip={"Agregar Item"} onClick={handleAddItemList} isWhite={true}><FontAwesomeIcon icon={faFloppyDisk} /></MiniBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default ItemModal