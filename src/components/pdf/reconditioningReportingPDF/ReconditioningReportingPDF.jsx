import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Registrar componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente para el PDF
const ReportPDF = ({ chartImage, statusCounts }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 40
    },
    header: {
      marginBottom: 20,
      paddingBottom: 20,
      borderBottom: '1px solid #eeeeee'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: 10
    },
    subtitle: {
      fontSize: 12,
      color: '#7f8c8d',
      textAlign: 'center',
      marginBottom: 5
    },
    chartContainer: {
      width: '100%',
      height: 300,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    legendContainer: {
      marginTop: 20,
      padding: 10,
      border: '1px solid #eeeeee',
      borderRadius: 5
    },
    legendItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      fontSize: 12
    },
    footer: {
      marginTop: 20,
      paddingTop: 20,
      borderTop: '1px solid #eeeeee',
      fontSize: 10,
      color: '#7f8c8d',
      textAlign: 'center'
    },
    companyInfo: {
      fontSize: 10,
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: 5
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Rectificaciones</Text>
          <Text style={styles.subtitle}>Análisis de estado de rectificaciones</Text>
          <Text style={styles.subtitle}>
            Generado el {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.chartContainer}>
          {chartImage && <Image src={chartImage} />}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <Text>Pendientes:</Text>
            <Text>{statusCounts.pending || 0}</Text>
          </View>
          <View style={styles.legendItem}>
            <Text>Cancelado:</Text>
            <Text>{statusCounts.cancelled || 0}</Text>
          </View>
          <View style={styles.legendItem}>
            <Text>Listo:</Text>
            <Text>{statusCounts.ready || 0}</Text>
          </View>
          <View style={styles.legendItem}>
            <Text>Entregado:</Text>
            <Text>{statusCounts.delivered || 0}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text>Colaneri e Hijos</Text>
          <Text style={styles.companyInfo}>Email: colaneriehijos@gmail.com</Text>
          <Text style={styles.companyInfo}>
            Face Race © {new Date().getFullYear()} - Todos los derechos reservados
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Componente principal
const ReconditioningReportingPDF = ({ appointments, selectedMonth=0,selectedYear=0  }) => {
  const chartRef = useRef(null);
  
  // Filtrar y contar los estados
  const statusCounts = appointments.reduce((acc, appointment) => {
    acc[appointment.status] = (acc[appointment.status] || 0) + 1;
    return acc;
  }, {});

  // Datos para el gráfico de torta
  const data = {
    labels: [
      `Pendientes (${statusCounts.pending || 0})`,
      `Cancelado (${statusCounts.cancelled || 0})`,
      `Listo (${statusCounts.ready || 0})`,
      `Entregado (${statusCounts.delivered || 0})`
    ],
    datasets: [
      {
        label: 'Estado Mensual de Rectificaciones',
        data: [
          statusCounts['pending'] || 0,
          statusCounts['cancelled'] || 0,
          statusCounts['ready'] || 0,
          statusCounts['delivered'] || 0
        ],
        backgroundColor: [
          'rgba(28, 200, 138, 0.8)', // Verde para Pendientes
          'rgba(231, 74, 59, 0.8)',  // Rojo para Cancelado
          'rgba(246, 194, 62, 0.8)',  // Amarillo para Listo
          'rgba(54, 185, 204, 0.8)'    // Azul para Entregado
        ],
        borderColor: [
          'rgba(28, 200, 138, 1)', // Verde para Pendientes
          'rgba(231, 74, 59, 1)',  // Rojo para Cancelado
          'rgba(246, 194, 62, 1)',  // Amarillo para Listo
          'rgba(54, 185, 204, 1)'    // Azul para Entregado
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Distribución de Rectificaciones por Estado Mes: ${selectedMonth} Año: ${selectedYear}`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };
 //let lineMonth = `Distribución por estado mes ${appointments[0].shiftDate.getMonth()+1} Año ${appointments[0].shiftDate.getFullYear()}`;
  return (
    <div style={{
      maxWidth: '700px', // Ajustar el ancho del contenedor
      margin: '30px auto',
      padding: '30px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      position: 'relative' // Para asegurar que el botón esté visible
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', fontWeight: '700', marginBottom: '10px' }}>
          Análisis de Rectificaciones
        </h1>
        <p style={{ color: '#7f8c8d' }}>Distribución por estado </p>
      </div>
      
      <div style={{ position: 'relative', height: '740px', margin: '30px 0' }}>
        <div ref={chartRef}>
          <Pie data={data} options={options} />
        </div>
      </div>
      
      <PDFDownloadLink 
        document={<ReportPDF chartImage={chartRef.current?.querySelector('canvas')?.toDataURL('image/png')} statusCounts={statusCounts} />}
        fileName={`reporte_rectificaciones_${new Date().toISOString().split('T')[0]}.pdf`}
        style={{
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
          padding: '12px 25px',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'block',
          margin: '0 auto',
          textDecoration: 'none',
          textAlign: 'center',
          width: '200px'
        }}
      >
        {({ loading }) => (
          loading ? 'Generando PDF...' : 'Exportar a PDF'
        )}
      </PDFDownloadLink>
      
      <div style={{ textAlign: 'center', marginTop: '30px', color: '#7f8c8d', fontSize: '14px' }}>
        <p>Haz clic en el botón para exportar este reporte como PDF</p>
      </div>
    </div>
  );
};

export default ReconditioningReportingPDF;
