//import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import MiniBtn from '../../btns/miniBtn/MiniBtn'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
//  PDF styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    appointment: {
        fontSize: 10,
        marginBottom: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        textAlign: 'center',
        fontSize: 10,
    },
    loading: {
        animation: 'pulse 1s infinite', // animation
    },
});

//  PDF Component
const AppointmentsPDF = ({ appointments }) => {
    const totalPages = Math.ceil(appointments.length / 10);

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

    function formatStatusToSpanish(status){
        switch(status){
            case 'pending':
                return 'Pendiente';
                
            case 'canceled':
                return 'Cancelado';
            
            case 'attended':
                return 'Atendido';
                
            case 'missing':
                return 'Ausente';
            default:
                return "";
    }
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
        <Document>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <Text style={styles.title}>Listado Mensual de Turnos</Text>
                    {appointments.slice(pageIndex * 10, (pageIndex + 1) * 10).map((appointment, index) => (
                        <View key={index} style={styles.section}>
                            <Text style={styles.appointment}>{`Nombre: ${appointment.person}`}</Text>
                            <Text style={styles.appointment}>{`Email: ${appointment.email}`}</Text>
                            <Text style={styles.appointment}>{`Fecha: ${formatDateToSpanish(appointment.shiftDate)}`}</Text>
                            <Text style={styles.appointment}>{`Hora: ${formatHour(appointment.timeSlot)}`}</Text>
                            <Text style={styles.appointment}>{`Estado: ${formatStatusToSpanish(appointment.status)}`}</Text>
                            <View style={styles.line} />
                        </View>
                    ))}
                    <Text style={styles.footer}>{`Página ${pageIndex + 1} de ${totalPages}`}</Text>
                </Page>
            ))}
        </Document>
    );
};

// primary Component and download button
const AppointmentsListPDF = ({ appointments }) => {
    // const [loading, setLoading] = useState(false);

    const handleDownload = () => {
    
    };

    return (
        <div>
            <PDFDownloadLink
                document={<AppointmentsPDF appointments={appointments} />}
                fileName="Listado mensual de turnos.pdf"
                onClick={handleDownload}
            >
                {({ loading }) => (
                    <MiniBtn onClick={handleDownload} isWhite={true}>
                        {loading ? (
                            <span className={styles.loading}>...</span> // loading text
                        ) : (
                            <FontAwesomeIcon icon={faFilePdf} />
                        )}
                    </MiniBtn>
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default AppointmentsListPDF;