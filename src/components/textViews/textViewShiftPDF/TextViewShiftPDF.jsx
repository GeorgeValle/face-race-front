//import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
//import logo from '../../assets/images/general/logo-face-race.png'
//import logo from '../../../assets/images/general/logo-face-race.png'

// import { useDispatch } from "react-redux";
// import {  changeClient  } from "../../../redux/ClientSlice";


const TextViewShiftPDF = ({shift}) => {

    

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

    function formatHour(hour){
        switch(hour){
            case '10-12':
                return '10:00 a 12:00';
                
            case '13-15':
                return '13:00 a 15:00';
            
            case '16-18':
                return '16:00 a 18:00';
                
            default:
                return "";
        }
    }
    return (
        <>
        <Document>
        <Page
        size="A7"
        style={{
            display: "flex",
            flexDirection: "column",
            
            alignItems: "center",
            backgroundColor: "#ccc",
            padding: "8",
        }}>
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Text style={{ color: "#3388af", fontSize: "13px" }}>
                    TURNO PARA PRESUPUESTAR
                </Text>
                <Text style={{ color: "#3388af", fontSize: "13px" }}>
                    RECTIFICACIÓN
                </Text>
                <Text style={{ color: "#3388af"}}>
                    __________________________________________________________
                </Text>
            </View>
            <View  style={{marginTop: "22px", flexDirection: "column", justifyContent: "left", alignItems: "left"}}>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Nombre: ${shift.person}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Email: ${shift.email}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Día: ${formatDateToSpanish(shift.shiftDate)}`}
                </Text>
                <Text style={{ marginBottom: "20px", color: "#3388af", fontSize: "8px" }} >
                    {`Hora entre: ${formatHour(shift.timeSlot)}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }}>
                    {`Recuerde que al dejar la moto en la brevedad nos contactaremos para enviarle el presupuesto`}
                </Text>

                
            </View>
            <View style={{marginTop: "30px",flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                <Text style={{ color: "#3388af", marginBottom: "4px"}}>
                    __________________________________________________________
                </Text>
                <Text style={{marginTop:"3px", color: "#3388af", fontSize: "11px" }}>
                    Colaneri Motoshop - Tel: 0342-4567395
                </Text>
                <Text style={{marginTop:"3px", color: "#3388af", fontSize: "9px" }}>
                    BrickMan Esq. 25 de Mayo - Rosario
                </Text>
                <Text style={{marginTop:"3px", color: "#3388af", fontSize: "9px" }}>
                    Email: colanerimotoshop@gmail.com
                </Text>
            </View>   
        </Page>
        </Document>
        </>
    )
}

export default TextViewShiftPDF