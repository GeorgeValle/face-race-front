import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import {getConcatenatedMethods} from '../../../utils/paymentsUtils/getConcatenatedMethods'

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        fontSize: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 9,
    },
    companyInfo: {
        width: '45%',
        paddingRight: 10,
    },
    typeBill:{
        width: '10%',
        paddingRight: 10,
    },
    clientInfo: {
        width: '45%',
        paddingLeft: 10,
    },
    separator: {
        borderBottom: '1px solid black',
        marginVertical: 10,
    },
    table: {
        marginTop: 20,
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
    },
    tableCell: {
        border: '1px solid black',
        padding: 5,
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Times-Roman', 
    },
    tableCellName: {
        border: '1px solid black',
        padding: 5,
        textAlign: 'center',
        flex: 2,
        fontFamily: 'Times-Roman',  
    },
    tableCellB: {
        border: '1px solid black',
        padding: 5,
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Times-Roman',
        position: 'relative',
    },
    letterB: {
        fontSize: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    total: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'right',
        border: '1px solid black',
        padding: 10,
        fontFamily: 'Times-Roman',
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Helvetica',
        marginBottom: 3,
        marginTop: 5,
    },
    itemRow: {
        flexDirection: 'row',
        fontSize: 10,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontSize: 10,
    },
    paymentSection: {
        marginTop: 4,
        marginBottom: 2,
        marginHorizontal: 10,
        borderBottom: '1px solid black',
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

// Componente del PDF
const BillPDF = ({ clientData, items, method }) => {
    const totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0);
    const formattedDate = new Date().toLocaleDateString('es-ES');

    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <Text style={styles.headerText}>Colaneri Motoshop</Text>
                        <Text style={styles.headerText}>Tel: 0342-4567395</Text>
                        <Text style={styles.headerText}>BrickMan Esq. 25 de Mayo</Text>
                        <Text style={styles.headerText}>Rosario</Text>
                        <Text style={styles.headerText}>colanerimotoshop@gmail.com</Text>
                    </View>
                    <View style={styles.typeBill}>
                        <Text style={styles.tableCellB}><Text style={styles.letterB}>B</Text></Text>
                    </View>
                    <View style={styles.clientInfo}>
                        <Text style={styles.headerText}>Nombre: {`${clientData.name} ${clientData.surname}`}</Text>
                        <Text style={styles.headerText}>DNI: {clientData.dni}</Text>
                        <Text style={styles.headerText}>Celular: {clientData.cel}</Text>
                        <Text style={styles.headerText}>Email: {clientData.email}</Text>
                        <Text style={styles.headerText}>Fecha: {formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                <View>
                    {/* Sección de forma de pago */}
                    <View style={styles.paymentSection}>
                        <Text>Forma de pago: {getConcatenatedMethods(method)||""}</Text>
                    </View>
                    <Text style={styles.title}>Factura</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCell}>Código</Text>
                            <Text style={styles.tableCellName}>Nombre de Artículo</Text>
                            
                            <Text style={styles.tableCell}>Cantidad</Text>
                            <Text style={styles.tableCell}>Unitario</Text>
                            <Text style={styles.tableCell}>Importe</Text>
                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.itemRow}>
                                <Text style={styles.tableCell}>{item.code}</Text>
                                <Text style={styles.tableCellName}>{item.name}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{formatNumber(item.price)}</Text>
                                <Text style={styles.tableCell}>{formatNumber(item.quantity * item.price)}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.total}>Total: ${formatNumber(totalAmount)}</Text>

                    
                </View>
                <Text style={styles.pageNumber}>Página 1</Text>
            </Page>
        </Document>
    );
};

export default BillPDF;
