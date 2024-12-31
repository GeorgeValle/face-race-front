// BudgetPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
        fontSize: 9, // Tamaño de fuente para la cabecera (3 puntos menos)
    },
    companyInfo: {
        width: '50%',
        borderRight: '1px solid black',
        paddingRight: 10,
    },
    clientInfo: {
        width: '50%',
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
    total: {
        marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15, // Aumentar tamaño de fuente para Total
    textAlign: 'right', // Alinear a la derecha
    border: '1px solid black', // Borde alrededor del total
    padding: 10,
    fontFamily: 'Times-Roman', // Fuente para el total
    },
    title: {
        textAlign: 'center', // Centrar el texto
        fontSize: 14, // Tamaño de fuente para el título
        fontFamily: 'Helvetica',
        marginBottom: 3,
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
    

});

// Componente del PDF
const BudgetPDF = ({ clientData, items }) => {
    const totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0);

    // Formatear la fecha en formato DD/MM/AAAA
  const formattedDate = new Date().toLocaleDateString('es-ES');

  // Función para formatear números
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
                    <View style={styles.clientInfo}>
                        <Text style={styles.headerText}>Nombre: {clientData.name}</Text>
                        <Text style={styles.headerText}>DNI: {clientData.dni}</Text>
                        <Text style={styles.headerText}>Teléfono: {clientData.phone}</Text>
                        <Text style={styles.headerText}>Email: {clientData.email}</Text>
                        <Text style={styles.headerText}>Fecha Presupuesto: {formattedDate}</Text>
                    </View>
                </View>
                {/* separator */}
                <View style={styles.separator} />

                <View>
                    <Text style={styles.title}>Listado de Productos</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCell}>Código</Text>
                            <Text style={styles.tableCellName}>Nombre de Artículo</Text>
                            <Text style={styles.tableCell}>Cantidad</Text>
                            <Text style={styles.tableCell}>Unitario</Text>
                            <Text style={styles.tableCell}>Importe</Text>
                        </View>
                        {items.map((item, index) => {
                            // const amount = item.quantity * item.price; // Calcular el importe
                            return (
                                <View key={index} style={styles.itemRow}>
                                    <Text style={styles.tableCell}>{item.code}</Text>
                                    <Text style={styles.tableCellName}>{item.name}</Text>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>{formatNumber(item.price)}</Text>
                                    <Text style={styles.tableCell}>{formatNumber(item.quantity * item.price)}</Text>
                                </View>
                            );
                        })}
                    </View>
                    {/* <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text> */}
                    <Text style={styles.total}>Total: ${formatNumber(totalAmount)}</Text>
                </View>
                <Text style={styles.pageNumber}>Página 1</Text>
            </Page>
        </Document>
    );
};

export default BudgetPDF;