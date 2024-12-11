import Style from './AppointmentModal.module.css'
// import MIniNavBar from '../../miniNavbar/MIniNavBar'
import BtnClose from '../../btns/btnClose/BtnClose'

import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPrint } from "@fortawesome/free-solid-svg-icons"
import { PDFDownloadLink } from "@react-pdf/renderer";
import TextViewShiftPDF from "../../textViews/textViewShiftPDF/TextViewShiftPDF"

// import axios from 'axios'
// import { useState } from 'react'
// import config from '../../../config/Envs'
// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


const AppointmentModal = ({ TheShift= null, onPrint, onClose, onDelete  }) =>{

    

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
                        
                    </tbody>
                </table>
                <div className={Style.row_title}>
                    <MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn>
                <PDFDownloadLink
                    document={<TextViewShiftPDF shift={TheShift}/>}
                    fileName="Turno rectificado.pdf"
                    >
                    <MiniBtn onClick={onPrint} isWhite={true}><FontAwesomeIcon icon={faPrint} /></MiniBtn>
                </PDFDownloadLink>
                </div>
            </div>
        </div>
    </div>
    )
};

export default AppointmentModal