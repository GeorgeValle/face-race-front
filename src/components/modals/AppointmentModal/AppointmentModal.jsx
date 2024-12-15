import Style from './AppointmentModal.module.css'
// import MIniNavBar from '../../miniNavbar/MIniNavBar'
import BtnClose from '../../btns/btnClose/BtnClose'

import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPrint } from "@fortawesome/free-solid-svg-icons"
import { PDFDownloadLink } from "@react-pdf/renderer";
import TextViewShiftPDF from "../../textViews/textViewShiftPDF/TextViewShiftPDF"

// import axios from 'axios'
import { useState, useEffect } from 'react'
// import config from '../../../config/Envs'
// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


const AppointmentModal = ({ TheShift= null, onPrint, onEditStatus=null, onEditDescription=null, onClose, onDelete  }) =>{

    const [theStatus, setTheStatus] = useState("");
    const [selectedOption, setSelectedOption] = useState(TheShift.status);

    function formatDateToSpanish(dateString) { 
        // Create a object Date whit a String
        const date = new Date(dateString);
        
        // Obtain day, month and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        
        // Format to spanish DD-MM-YYYY
        return `${day}-${month}-${year}`;   
    }

    const handleBlur = () =>{
        if(!selectedOption==""){
        onEditStatus(selectedOption)
        //setTheStatus(selectedOption)
        }
    }

useEffect(() => {
        switch(selectedOption){
            case 'pending':
                setTheStatus('Pendiente');
                break;
            case 'attended':
                setTheStatus('Atendido');
                break;
            case 'missing':
                setTheStatus('Ausente');
                break;
            case 'canceled':
                setTheStatus('Cancelado');
                break;
            default:
                setTheStatus('Agendado');
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
                            <td>{TheShift.person}</td>
                            <th>DNI:</th>
                            <td>{TheShift.dni}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{TheShift.email}</td>
                            <th>Teléfono:</th>
                            <td>{TheShift.phone}</td>
                        </tr>
                        <tr>
                            <th>Fecha:</th>
                            <td>{formatDateToSpanish(TheShift.shiftDate)}</td>
                            <th>Hora:</th>
                            <td>{TheShift.timeSlot}</td>
                        </tr>
                        <tr>
                            <th>Estado:</th>
                            <td>{theStatus}</td>
                            <th>Observación:</th>
                            <td>{TheShift.description}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={Style.row_title}>
                
                    <MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn>
                    <div>
                    <PDFDownloadLink
                        document={<TextViewShiftPDF shift={TheShift}/>}
                        fileName="Turno rectificado.pdf"
                        >
                        <MiniBtn onClick={onPrint} isWhite={true}><FontAwesomeIcon icon={faPrint} /></MiniBtn>
                    </PDFDownloadLink>
                    </div>
                    <div className={Style.selectContainer}>
                        <select className={Style.styledSelect} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} onBlur={handleBlur}>
                            <option value="">Seleccione un Estado</option>
                            <option value="attended">Atendido</option>
                            <option value="canceled">Cancelado</option>
                            <option value="missing">Ausente</option>
                            <option value="pending">Pendiente</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default AppointmentModal