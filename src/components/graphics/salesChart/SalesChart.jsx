import React, { useRef, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

//  PDF Styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica'
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5
    },
    date: {
        fontSize: 12,
        color: '#666'
    },
    chartContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    totals: {
        marginTop: 20,
        marginBottom: 40
    },
    totalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        fontSize: 10,
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 10
    },
    boldText: {
        fontWeight: 'bold'
    }
});

// names of months in spanish
const MONTH_NAMES_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

const SalesChart = ({
    salesData = [],
    monthlyTotalsByName = {},
    clientSales = [],
    method = {},
    methodName="",
    item = {},
    selectedYear = new Date().getFullYear(),
    selectedMonth = new Date().getMonth() + 1,
    reportType = 'monthly',
    clientName = '',
    forecastData = null,
    advice = ""
}) => {
    const chartRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfData, setPdfData] = useState(null);

    // common config for charts
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Ventas: $${context.raw.toLocaleString('es-AR')}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '$' + value.toLocaleString('es-AR');
                    }
                }
            }
        }
    };

    // Common config for line chart
    const lineChartOptions = {
        ...commonChartOptions,
        elements: {
            line: {
                fill: false,
                borderWidth: 3
            },
            point: {
                radius: 5,
                hitRadius: 10,
                hoverRadius: 8
            }
        }
    }; 

    const methods = (methodName) =>{
        switch (methodName){
            case 'cash':
                return 'Efectivo';
            case 'debit':
                return "Débito";
            case 'credit':
                return 'Credito'
            case "check":
            return "Cheque";
            case 'currentAccount':
                return 'Cuenta Corriente'
            default:
                return ''
        }
    }

    // Defensive validation for forecast 
    if (reportType === 'forecast' && (!forecastData || !Array.isArray(forecastData.forecast))) {
        return <p>No hay datos de predicción disponibles.</p>;
    }

    // prepare data for charts
    const getChartData = () => {
        switch (reportType) {
            case 'annual':
                return {
                    labels: MONTH_NAMES_ES,
                    datasets: [{
                        label: `Ventas ${selectedYear}`,
                        data: MONTH_NAMES_ES.map(month => monthlyTotalsByName[month] || 0),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }]
                };

            case 'monthly':
                const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
                return {
                    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
                    datasets: [{
                        label: `Ventas ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`,
                        data: Array.from({ length: daysInMonth }, (_, i) =>
                            salesData.filter(sale => {
                                const saleDate = new Date(sale.saleDate);
                                return saleDate.getDate() === i + 1 &&
                                    saleDate.getMonth() + 1 === Number(selectedMonth) &&
                                    saleDate.getFullYear() === Number(selectedYear);
                            }).reduce((sum, sale) => sum + sale.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0)
                        ),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
                };

            case 'item':
                return {
                    labels: Object.keys(item),
                    datasets: [{
                        label: 'Ventas por Producto',
                        data: Object.values(item),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }]
                };

            case 'client':
                return {
                    labels: MONTH_NAMES_ES,
                    datasets: [{
                        label: `Ventas del Cliente ${clientName}, DNI: ${clientSales[0]?.client?.dni || ''}`,
                        data: MONTH_NAMES_ES.map((_, index) => {
                            return clientSales.filter(sale => {
                                const saleDate = new Date(sale.saleDate);
                                return saleDate.getMonth() === index &&
                                    saleDate.getFullYear() === Number(selectedYear);
                            }).reduce((sum, sale) => sum + sale.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0);
                        }),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1,
                        pointBackgroundColor: 'rgb(75, 192, 192)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgb(75, 192, 192)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHitRadius: 10,
                        pointBorderWidth: 2
                    }]
                };

            case 'method':
                return {
                    labels: Object.keys(method),
                    datasets: [{
                        label: `Método ${methods(methodName)}`,
                        data: Object.values(method),
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    }]
                };

            case 'forecast':
                //if (!forecastData)  return { labels: [], datasets: [] };
                return {
                    labels: forecastData.forecast.map(f => f.ds),
                    datasets: [
                    {
                        label: "Histórico",
                        data: forecastData.history.map(h => h.y),
                        borderColor: "#1f77b4",
                        backgroundColor: "rgba(31,119,180,0.2)",
                        fill: false
                    },
                    {
                        label: "Proyección",
                        data: forecastData.forecast.map(f => f.yhat),
                        borderColor: "#7f7f7f",
                        backgroundColor: "rgba(127,127,127,0.2)",
                        borderDash: [5, 5],
                        fill: false
                    },
                    {
                        label: "Intervalo inferior",
                        data: forecastData.forecast.map(f => f.yhat_lower ?? null),
                        borderColor: "rgba(200,200,200,0.6)",
                        pointRadius: 0,
                        borderDash: [2, 2],
                        fill: false
                    },
                    {
                        label: "Intervalo superior",
                        data: forecastData.forecast.map(f => f.yhat_upper ?? null),
                        borderColor: "rgba(200,200,200,0.6)",
                        pointRadius: 0,
                        borderDash: [2, 2],
                        fill: false
                    }
                    ]
                };

            default:
                return {
                    labels: [],
                    datasets: []
                };
        }
    };

    //  function for catch actual chart
    const captureCurrentChart = async () => {
        if (!chartRef.current) return null;

        // wait to chart.js finish the render
        const chart = ChartJS.getChart(chartRef.current.canvas);
        if (chart) {
            await new Promise(resolve => {
                const checkAnimation = () => {
                    if (!chart.animating) resolve();
                    else requestAnimationFrame(checkAnimation);
                };
                checkAnimation();
            });
        }

        // little delay for aditional security in render
        await new Promise(resolve => setTimeout(resolve, 300));

        //  catch the canvas as image
        try {
            const canvas = await html2canvas(chartRef.current.canvas);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error("Error capturando gráfico:", error);
            return null;
        }
    };

    //  function for prepare data in the PDF
    const preparePdfData = async () => {
        setIsGenerating(true);

        try {
            //  catch actual chart Image
            const chartImage = await captureCurrentChart();
            if (!chartImage) return;

            // Calculate totals by reportType
            let totalSales = 0;
            const monthlyDetails = {};

            switch (reportType) {
                case 'annual':
                    totalSales = Object.values(monthlyTotalsByName).reduce((sum, val) => sum + (Number(val) || 0), 0);
                    MONTH_NAMES_ES.forEach(month => {
                        if (monthlyTotalsByName[month]) {
                            monthlyDetails[month] = monthlyTotalsByName[month];
                        }
                    });
                    break;

                case 'monthly':
                    salesData.forEach(sale => {
                        const saleDate = new Date(sale.saleDate);
                        if (saleDate.getMonth() + 1 === Number(selectedMonth) &&
                            saleDate.getFullYear() === Number(selectedYear)) {
                            const amount = sale.payment.reduce((sum, p) => sum + Number(p.amount), 0);
                            totalSales += amount;
                            const day = saleDate.getDate();
                            monthlyDetails[`Día ${day}`] = amount;
                        }
                    });
                    break;

                case 'item':
                    Object.entries(item).forEach(([month, value]) => {
                        totalSales += Number(value) || 0;
                        monthlyDetails[month] = value;
                    });
                    break;

                case 'client':
                    MONTH_NAMES_ES.forEach((month, index) => {
                        const amount = clientSales
                            .filter(sale => new Date(sale.saleDate).getMonth() === index)
                            .reduce((sum, sale) => sum + sale.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0);
                        if (amount > 0) {
                            totalSales += amount;
                            monthlyDetails[month] = amount;
                        }
                    });
                    break;

                case 'method':
                    Object.entries(method).forEach(([methodName, value]) => {
                        totalSales += Number(value) || 0;
                        monthlyDetails[methodName] = value;
                    });
                    break;

                case 'forecast':
                    // Use date of ds for more clarity in  PDF
                     // Usamos el totalForecast directamente
                    totalSales = forecastData.totalForecast || 0;

                    // También podemos listar cada predicción por fecha
                    forecastData.forecast.forEach((f) => {
                        monthlyDetails[`Predicción ${f.ds}`] = Math.round(f.yhat);
                    });
                    break;

                // case 'forecast':
                    
                    // forecastData.forecast.forEach((f) => {
                    //     const yhatRounded = Math.round(f.yhat);
                    //     monthlyDetails[`Predicción ${f.ds}`] = yhatRounded;
                    //     totalSales += yhatRounded;
                    // });
                    // break;
            }

            setPdfData({
                chartImage,
                totalSales,
                monthlyDetails
            });

        } catch (error) {
            console.error('Error al generar PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    //  PDF Component
    const SalesReportPDF = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reporte de Ventas</Text>
                    <Text style={styles.subtitle}>
                        {reportType === 'annual' && `Análisis de ventas anuales ${selectedYear}`}
                        {reportType === 'monthly' && `Análisis de ventas mensuales ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`}
                        {reportType === 'item' && `Ventas por producto`}
                        {reportType === 'client' && `Ventas por cliente`}
                        {reportType === 'method' && `Ventas por método de pago`}
                        {reportType === 'forecast' && `Proyección de ventas desde ${selectedYear}`}
                    </Text>
                    <Text style={styles.date}>Generado el {new Date().toLocaleDateString('es-ES')}</Text>
                </View>

                {pdfData?.chartImage && (
                    <View style={styles.chartContainer}>
                        <Image src={pdfData.chartImage} style={{ width: '100%' }} />
                    </View>
                )}

                <View style={styles.totals}>
                    <Text style={styles.boldText}>Resumen</Text>

                    <View style={styles.totalItem}>
                        <Text>Total General:</Text>
                        <Text>$ {pdfData?.totalSales?.toLocaleString('es-AR') || 0}</Text>
                    </View>

                    {Object.entries(pdfData?.monthlyDetails || {}).map(([period, amount]) => (
                        <View style={styles.totalItem} key={period}>
                            <Text>{period}:</Text>
                            <Text>$ {Number(amount).toLocaleString('es-AR')}</Text>
                        </View>
                    ))}
                </View>

                {reportType === 'forecast' && advice && (
                    <View style={styles.totals}>
                        <Text style={styles.boldText}>Consejo de Predicción</Text>
                        <Text>{advice}</Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text>Colaneri e Hijos</Text>
                    <Text>Email: colaneriehijos@gmail.com</Text>
                    <Text>Face Race © {new Date().getFullYear()} - Todos los derechos reservados</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div style={{
            position: 'relative',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minHeight: '600px'
        }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
                <button
                    onClick={preparePdfData}
                    disabled={isGenerating}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 15px',
                        marginRight: '10px'
                    }}
                >
                    {isGenerating ? 'Preparando...' : 'Preparar PDF'}
                </button>

                {pdfData && (
                    <PDFDownloadLink
                        document={<SalesReportPDF />}
                        fileName={`reporte_ventas_${reportType}_${new Date().toISOString().slice(0, 10)}.pdf`}
                    >
                        {({ loading }) => (
                            <button
                                style={{
                                    backgroundColor: loading ? '#2E7D32' : '#4CAF50',
                                    color: 'white',
                                    padding: '10px 15px'
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Generando PDF...' : 'Descargar PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                )}
            </div>

            <h2 style={{ color: '#333', marginBottom: '20px' }}>
                {reportType === 'annual' && `Ventas Anuales ${selectedYear}`}
                {reportType === 'monthly' && `Ventas de ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`}
                {reportType === 'item' && `Ventas por Producto`}
                {reportType === 'client' && `Ventas por Cliente${clientName ? `: ${clientName}`: ''  }`}
                {reportType === 'method' && `Ventas por Método de Pago${methods(methodName) ? `: ${methods(methodName)}` : ''}`}
                {reportType === 'forecast' && `Proyección de Ventas`}
            </h2>

            <div style={{ height: '500px', marginTop: '40px' }}>
                {reportType === 'client' ? (
                    <Line
                        ref={chartRef}
                        data={getChartData()}
                        options={lineChartOptions}
                    />
                    ) : reportType === 'forecast' ? (
                        <Line
                            ref={chartRef}
                            data={getChartData()}
                            options={lineChartOptions}
                        />
                    ) : (
                        <Bar
                            ref={chartRef}
                            data={getChartData()}
                            options={commonChartOptions}
                        />
                    )}
            </div>
            {reportType === 'forecast' && advice && (
                <p style={{ marginTop: 16 }}>
                    <strong>Consejo:</strong> {advice}
                </p>
            )}
        </div>
    );
};

export default SalesChart;
