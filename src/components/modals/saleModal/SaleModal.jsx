import Style from './AppointmentModal.module.css'
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
import TableSale from '../../tables/tableSale/TableSale'
import MiniTotal from '../../totals/miniTotal/MiniTotal'


// import axios from 'axios'
import { useState, useEffect } from 'react'
// import config from '../../../config/Envs'
// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


// eslint-disable-next-line react/prop-types
const SaleModal = ({ TheSale= null, onPrint, onEditStatus=null, onEditDescription=null, onClose, onDelete  }) =>{

    const [theStatus, setTheStatus] = useState("");
    const [theDescription, setTheDescription] = useState(TheSale.description);
    const [selectedOption, setSelectedOption] = useState(TheSale.paid);
    const [totalPrint, setTotalPrint] = useState("")
    

    

    const handleDescription = () =>{
        onEditDescription(theDescription)
    }
    const handleBlur = () =>{
        if(!selectedOption==""){
        onEditStatus(selectedOption)
        //setTheStatus(selectedOption)
        }
    }

    const handleTotalPrint = (total) => {
        setTotalPrint(total)
    }

    

useEffect(() => {
        switch(selectedOption){
            case true:
                setTheStatus('Pagado');
                break;
            case false:
                setTheStatus('NO Pagado')
                break;
            default:
                setTheStatus('');
        }
    }, [selectedOption]);
    
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
                            <th colSpan="4" >DATOS DEL TURNO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nombre:</th>
                            <td>{`${TheSale.client.Name} ${TheSale.client.surname}`}</td>
                            <th>DNI:</th>
                            <td>{TheSale.client.dni}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td colSpan={3}>{TheSale.client.email}</td>
                            
                        </tr>
                        <tr>
                        <th>Estado:</th>
                        <td>{theStatus}</td>
                        <th>Tipo Pago:</th>
                        <td>{getConcatenatedTypes(TheSale.payments)}</td>    
                            
                        </tr>
                        <tr>
                            <th>Fecha:</th>
                            <td>{formatDateToSpanish(TheSale.saleDate)}</td>
                            <th>Hora:</th>
                            <td>{formatHourFromISO(TheSale.SaleDate)}</td>
                        </tr>
                        <tr>
                            <th>Observación:</th>
                            <td colSpan={3}>{theDescription}</td>
                            
                        </tr>
                    </tbody>
                </table>
                <div className={Style.row_title}>
                
                    <MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn>
                    <div>
                    <PDFDownloadLink
                        document={<TextViewShiftPDF shift={TheSale}/>}
                        fileName="Comprobante venta.pdf"
                        >
                        <MiniBtn onClick={onPrint} isWhite={true}><FontAwesomeIcon icon={faPrint} /></MiniBtn>
                    </PDFDownloadLink>
                    </div>
                    <div className={Style.selectContainer}>
                        <select className={Style.styledSelect} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} onBlur={handleBlur}>
                            <option value="">Seleccione un Estado</option>
                            <option value={true} >Pagado</option>
                            <option value={false}>No Pagado</option>
                        </select>
                    </div>
                    <TextInputStyled titleLabel={"Observaciones"} size={false} onChange={(e) => setTheDescription(e.target.value)} value={theDescription} />
                    <MiniBtn onClick={handleDescription} isWhite={true}><FontAwesomeIcon icon={faFloppyDisk} /></MiniBtn>
                </div>
            </div>
            <div className={Style.item}>
                <TableSale rows={TheSale} totals={handleTotalPrint}></TableSale>
            </div>
            <div className={Style.item}>
                <MiniTotal >{totalPrint}</MiniTotal>
            </div>
        </div>
    </div>
    )
};

export default SaleModal