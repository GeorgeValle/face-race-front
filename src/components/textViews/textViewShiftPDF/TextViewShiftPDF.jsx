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
            <View style={{flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
                <Text style={{ color: "#3388af", fontSize: "13px" }}>
                    TURNO PARA RECTIFICACIÓN
                </Text>
                <Text style={{ color: "#3388af"}}>
                    __________________________________________________________
                </Text>
            </View>
            <View  style={{marginTop: "22px", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Nombre: ${shift.person}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {` Email: ${shift.email}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Dia: ${formatDateToSpanish(shift.shiftDate)}`}
                </Text>
                <Text style={{ marginBottom: "10px", color: "#3388af", fontSize: "8px" }} >
                    {`Hora entre: ${shift.timeSlot}`}
                </Text>

                
            </View>
            <View style={{marginTop: "70px",flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
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