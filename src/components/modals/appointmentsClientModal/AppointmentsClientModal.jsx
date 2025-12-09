import Style from './EditClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import { TableAppointmentsClient } from '../../tables/tableAppointments/TableAppointmentsClient';
//import TextInput from '../../inputs/textInput/TextInput'
//import TextArea from '../../inputs/textArea/TextArea'
//import { useState } from 'react'
//import { useDispatch } from "react-redux";
//import {  changeClient, deleteClient  } from "../../../redux/ClientSlice";
//import { useSelector } from 'react-redux';
//import axios from 'axios'
//import MessageModal from '../messageModal/MessageModal'
//import config from '../../../config/Envs'


const AppointmentsClientModal = ({appointments, miniTitle="", onShow=null, onCancel=null, onClose=null, onNew=null}) => {

    //const client = useSelector((state)=> state.client);



    //const handleClose=()=>{
    //    onClose(false);
    //}

    

    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }> 
        
        <div className={Style.modal}  >
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={miniTitle} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                <TableAppointmentsClient appointments={appointments} onShow={onShow} /> 
                
            </div>
            <div className={Style.modal_buttons}>
                <button type="button" onClick={()=> onNew()} className={`${Style.btn} ${Style.btn_submit}`} >Nuevo Turno </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </div>
    </div>
);
};

export default AppointmentsClientModal