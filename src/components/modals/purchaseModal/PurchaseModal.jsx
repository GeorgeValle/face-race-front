import Style from './PurchaseModal.module.css'
// import MIniNavBar from '../../miniNavbar/MIniNavBar'
import BtnClose from '../../btns/btnClose/BtnClose'
import TextInputStyled from '../../inputs/inputTextStyled/TextInputStyled'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPrint,faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { PDFDownloadLink } from "@react-pdf/renderer";
import TextViewShiftPDF from "../../textViews/textViewShiftPDF/TextViewShiftPDF"
import {formatHourFromISO} from '../../../utils/datesUtils/formatHourFromIso'
import {formatDateToSpanish} from '../../../utils/datesUtils/formatDateToSpanish'
import {getConcatenatedTypes} from '../../../utils/paymentsUtils/getConcatenatedTypes'
//import {TableSale} from '../../tables/tableSale/TableSale'
import  {TableQuotation}  from '../../tables/tableQuotation/TableQuotation'
import MiniTotal from '../../totals/miniTotal/MiniTotal';
import InputSelectStyled from '../../inputs/inputSelectStyled/InputSelectStyled'
//import {toggleChecked} from '../../../redux/PurchaseSlice';


// import axios from 'axios'
import { useState, useEffect } from 'react'
// import config from '../../../config/Envs'
// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


// eslint-disable-next-line react/prop-types
const PurchaseModal = ({ ThePurchase, onPrint, onEditStatus=null, onEditPaid=null, onEditDescription=null, onEditChecked=null, onClose, onDelete  }) =>{
    const statusTypes = ["shipped","Partially","Complete","draft","dispute","cancelled","processing","refunded","failed","others"]

    //const [theStatus, setTheStatus] = useState("");
    const [theDescription, setTheDescription] = useState(ThePurchase.description);
    //const [selectedOption, setSelectedOption] = useState(Boolean(ThePurchase.paid));
    const [paidStatus, setPaidStatus] = useState(Boolean(ThePurchase.paid))
    const [totalPrint, setTotalPrint] = useState("")
    const [status, setStatus] = useState(ThePurchase.status);
    
    
    const allStatus = [{label:'Seleccione un estado de Compra',value:''}, {label:'Borrador',value:'draft'}, {label:'Procesando',value:'processing'}, {label:'En Camino',value:'shipped'}, {label:'Entrega Parcial', value:'partially'}, {label:'Entrega Completa',value:'complete'},  {label:'Bajo reclamo',value:'dispute'}, {label:'Cancelada',value:'Cancelled'},{label:'Reintegrada',value:'Refunded'},{label:'Fallida', value:'failed'},{label:"Otros",value:"others"}]
    const allPaidStatus = [{label:'Seleccione una opción',value:''},{label:'Sí',value:true},{label:'No', value:false}]

    //const dispatch = useDispatch()


    const handleDescription = () =>{

        onEditDescription(ThePurchase.purchaseNumber,theDescription)
    }

    const handleStatus = ( oneStatus) =>{
    
        if(!oneStatus==""){
        setStatus(oneStatus)
        onEditStatus(ThePurchase.purchaseNumber,oneStatus)
        }
    }

    const handlePaidStatus = ( statusPaid) =>{
    
        if(!statusPaid==""){
        setPaidStatus(statusPaid)
        onEditPaid(ThePurchase.purchaseNumber,statusPaid)
        }
    }

    const handleCheckStatus = (code, checkStatus , quantity) =>{

        if(!checkStatus==true&&code){
            onEditChecked(ThePurchase.purchaseNumber,code,true, quantity)
        }
    }


    const handleTotalPrint = (total) => {
        setTotalPrint(total)
    }


    useEffect(() => {

        }, []); 

// formatStatusToSpanish(TheShift.status);

    return(
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}}>
        <div className={Style.modal} >
            <div className={Style.item}>
                {/* <MIniNavBar miniTitle={""} btnClose={true} close={onClose} /> */}
                <div className={Style.close} ><BtnClose close={onClose}/></div>
                <table className={`${Style.table} ${Style.content}`}>
                    <thead >
                        <tr>
                            <th colSpan="4" >{`DATOS DE LA COMPRA Nº ${ThePurchase.purchaseNumber} `}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nombre:</th>
                            <td>{`${ThePurchase.supplier.businessName}`}</td>
                            <th>DNI/CUIT:</th>
                            <td>{ThePurchase.supplier.cuit}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td colSpan={3}>{ThePurchase.supplier.email}</td>
                            
                        </tr>
                        <tr>
                        <th>Pagado:</th>
                        <td><InputSelectStyled  defaultValue={paidStatus} onLabel={" "} sideLabel={true} isLabel={false} isGroup={false} titleLabel={"Pagado:"} onSetValue={handlePaidStatus} options={allPaidStatus} /></td>
                        <th>Tipo Pago:</th>
                        <td>{getConcatenatedTypes(ThePurchase)}</td>    
                            
                        </tr>
                        <tr>
                            <th>Fecha:</th>
                            <td>{formatDateToSpanish(ThePurchase.purchaseDate)}</td>
                            <th>Hora:</th>
                            <td>{formatHourFromISO(ThePurchase.purchaseDate)}</td>
                        </tr>
                        <tr>
                            <th>Observación:</th>
                            <td>{theDescription}</td>
                            <th>Estado:</th>
                            <td><InputSelectStyled  defaultValue={status} onLabel={" "} sideLabel={true} isLabel={false} isGroup={false} titleLabel={"Estado:"} onSetValue={handleStatus} options={allStatus} /></td>
                            
                        </tr>
                    </tbody>
                </table>
                <div className={Style.row_title}>
                    <MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn>
                    <div>
                    <PDFDownloadLink
                        document={<TextViewShiftPDF shift={ThePurchase}/>}
                        fileName="Comprobante Compra.pdf"
                        >
                        <MiniBtn onClick={onPrint} isWhite={true}><FontAwesomeIcon icon={faPrint} /></MiniBtn>
                    </PDFDownloadLink>
                    </div>
                   
                    <TextInputStyled titleLabel={"Observaciones"} size={false} onChange={(e) => setTheDescription(e.target.value)} value={theDescription} />
                    <MiniBtn onClick={handleDescription} isWhite={true}><FontAwesomeIcon icon={faFloppyDisk} /></MiniBtn>
                    <MiniTotal >{totalPrint}</MiniTotal>
                </div>
            </div>
            <div className={Style.item2}>
                <TableQuotation rows={ThePurchase.itemList} editChecked={handleCheckStatus} isChecked={true} totals={handleTotalPrint} perPage={3}></TableQuotation>
            </div>
        </div>
    </div>
    )
};

export default PurchaseModal