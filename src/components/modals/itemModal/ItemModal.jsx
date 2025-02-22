import Style from './ItemModal.module.css'
// import MIniNavBar from '../../miniNavbar/MIniNavBar'
import BtnClose from '../../btns/btnClose/BtnClose'
import TextInputStyled from '../../inputs/inputTextStyled/TextInputStyled'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faXmark,faFloppyDisk, faPencil } from "@fortawesome/free-solid-svg-icons"
import { addItem, deleteItem, updatePrice, subtractStock } from "../../../redux/ItemSlice";
import { useDispatch, useSelector } from "react-redux";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import TextViewShiftPDF from "../../textViews/textViewShiftPDF/TextViewShiftPDF"

// import axios from 'axios'
import { useState, useEffect } from 'react'
// import config from '../../../config/Envs'
// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


const ItemModal = ({  size=false, addItemList=null, onAdjustment=null, onEditStock=null, onClose=null  }) =>{

    //Variables Redux
    const item = useSelector((state) => state.item);
    
    
    // const [selectedOption, setSelectedOption] = useState(TheShift.status);
    //const [row, setRow] = useState(TheItem);
    const [inputQuantity, setInputQuantity] = useState(1);
    const [inputPrice, setInputPrice] = useState(item.price);
    const [localStock, setLocalStock] = useState(item.stockQuantity);
    const [defaultStock, setDefaultStock] = useState(item.stockQuantity)
    const [adjustments, setAdjustments] = useState(0);
    const [referencePrice, setReferencePrice] = useState(item.price||0);

    
    
    // function formatDateToSpanish(dateString) { 
    //     // Create a object Date whit a String
    //     const date = new Date(dateString);
        
    //     // Obtain day, month and year
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); 
    //     const year = date.getFullYear();
        
    //     // Format to spanish DD-MM-YYYY
    //     return `${day}-${month}-${year}`;   
    // }

    
    // const handleBlur = () =>{
    //     if(!selectedOption==""){
    //     onEditStatus(selectedOption)
    //     //setTheStatus(selectedOption)
    //     }
    // }

    // function formatHour(hour){
    //     switch(hour){
    //         case '10-12':
    //             return '10:00 a 12:00';
                
    //         case '13-15':
    //             return '13:00 a 15:00';
            
    //         case '16-18':
    //             return '16:00 a 18:00';
                
    //         default:
    //             return "";
    //     }
    // }

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
    let quantity = e.target.value;
    setInputQuantity(quantity);
    let stock = localStock
    if (quantity >= stock) {
        onEditStock(stock-quantity)
        setLocalStock(stock-quantity)
    }else{
        alert('No hay suficiente stock')
    }
};
const handlePriceChange = (e) =>{
    let priceEdited = e.target.value;
    setInputPrice(priceEdited);
}

const handleAdjustmentsChange = (e) =>{
    const newAdjustment = parseFloat(e.target.value);
    setAdjustments(newAdjustment);

    // Calculamos el valor del ajuste en moneda
    const adjustmentValue = inputPrice * (newAdjustment / 100);
    onAdjustment(adjustmentValue);

    const newPrice = inputPrice * (1 - newAdjustment / 100);
    
    setInputPrice(newPrice);
    
}
// adjustment:
const handleAddItemList = () =>{
const newItem = { code: item.code, name: item.name, quantity: inputQuantity, price: inputPrice, referencePrice: referencePrice, adjustmentPercentage:adjustments  };
onclose()
addItemList(newItem)

}

const handleCancel = () =>{
    onClose();
    onEditStock(defaultStock);
}

// const handleEditQuantity = ( quantity) => {
//     setDefaultQuantity(quantity);
//     setdefaultCode(code);
//     setIsModalQuantity(true);
//     }

 // Function for calculate amount of each item 
const calculateAmount = (quantity, price) => {
    return quantity * price;
};

// Function for format price numbers
const formatNumber = (number) => {
    return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};  

let amount;
    return(
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){handleCancel()}}}>
        <div className={Style.modal} >
            <div className={Style.item}>
                {/* <MIniNavBar miniTitle={""} btnClose={true} close={onClose} /> */}
                <div className={Style.close} ><BtnClose close={handleCancel}/></div>
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
                            {amount = calculateAmount(inputQuantity, inputPrice)}
                                        
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
                    <TextInputStyled titleLabel={"Cantidad"} size={false} onChange={handleQuantityChange} value={inputQuantity} />
                    <TextInputStyled titleLabel={"Precio"} size={false} onChange={handlePriceChange} value={inputPrice} />
                    <TextInputStyled titleLabel={"Descuento"} size={false} onChange={handleAdjustmentsChange} value={adjustments} />
                    
                    <div>
                    <MiniBtn tooltip={"Cancelar"} onClick={handleCancel} isRed={true}><FontAwesomeIcon icon={faXmark} /></MiniBtn>
                    </div>
                
                    <MiniBtn tooltip={"Guardar en la factura"} onClick={handleAddItemList} isWhite={true}><FontAwesomeIcon icon={faFloppyDisk} /></MiniBtn>
                </div>
            </div>
        </div>
    </div>
    )
};

export default ItemModal