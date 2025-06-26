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

//  register components of chart.js
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

// PDF Styles
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

const PurchaseChart = ({
    purchasesData = [],
    monthlyTotalsByName = {},
    supplierPurchases = [],
    method = {},
    methodName = '',
    item = {},
    itemName = "",
    selectedYear = new Date().getFullYear(),
    selectedMonth = new Date().getMonth() + 1,
    reportType = 'monthly'

    

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
                        return `Compras: $${context.raw.toLocaleString('es-AR')}`;
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

    // common config for line chart
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

    //  prepare data for charts
    const getChartData = () => {
        switch (reportType) {
            case 'annual':
                return {
                    labels: MONTH_NAMES_ES,
                    datasets: [{
                        label: `Compras ${selectedYear}`,
                        data: MONTH_NAMES_ES.map(month => monthlyTotalsByName[month] || 0),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }]
                };

            case 'monthly':
                const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
                return {
                    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
                    datasets: [{
                        label: `Compras ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`,
                        data: Array.from({ length: daysInMonth }, (_, i) =>
                            purchasesData.filter(purchase => {
                                const purchaseDate = new Date(purchase.purchaseDate);
                                return purchaseDate.getDate() === i + 1 &&
                                    purchaseDate.getMonth() + 1 === Number(selectedMonth) &&
                                    purchaseDate.getFullYear() === Number(selectedYear);
                            }).reduce((sum, purchase) => sum + purchase.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0)
                        ),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
                };

            case 'item':
                return {
                    labels: Object.keys(item),
                    datasets: [{
                        label: `Datos de ${itemName}  `,
                        data: Object.values(item),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }]
                };

            case 'supplier':
                return {
                    labels: MONTH_NAMES_ES,
                    datasets: [{
                        label: `Compras al Proveedor  ${supplierPurchases[0]?.supplier?.businessName || ''}`,
                        data: MONTH_NAMES_ES.map((_, index) => {
                            return supplierPurchases.filter(purchase => {
                                const purchaseDate = new Date(purchase.purchaseDate);
                                return purchaseDate.getMonth() === index &&
                                    purchaseDate.getFullYear() === Number(selectedYear);
                            }).reduce((sum, purchase) => sum + purchase.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0);
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

            default:
                return {
                    labels: [],
                    datasets: []
                };
        }
    };

    //  function for catch te actual chart image
    const captureCurrentChart = async () => {
        if (!chartRef.current) return null;

        // Esperar a que Chart.js termine de renderizar
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

        //  little delay for aditional security in the render
        await new Promise(resolve => setTimeout(resolve, 300));

        // Capturar el canvas como imagen
        try {
            const canvas = await html2canvas(chartRef.current.canvas);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error("Error capturando gráfico:", error);
            return null;
        }
    };

    //  function for prepare the data for the PDF
    const preparePdfData = async () => {
        setIsGenerating(true);

        try {
            //  catch the actual chart image
            const chartImage = await captureCurrentChart();
            if (!chartImage) return;

            // calculate totals according to type of report
            let totalPurchases = 0;
            const monthlyDetails = {};

            switch (reportType) {
                case 'annual':
                    totalPurchases = Object.values(monthlyTotalsByName).reduce((sum, val) => sum + (Number(val) || 0), 0);
                    MONTH_NAMES_ES.forEach(month => {
                        if (monthlyTotalsByName[month]) {
                            monthlyDetails[month] = monthlyTotalsByName[month];
                        }
                    });
                    break;

                case 'monthly':
                    purchasesData.forEach(purchase => {
                        const purchaseDate = new Date(purchase.purchaseDate);
                        if (purchaseDate.getMonth() + 1 === Number(selectedMonth) &&
                            purchaseDate.getFullYear() === Number(selectedYear)) {
                            const amount = purchase.payment.reduce((sum, p) => sum + Number(p.amount), 0);
                            totalPurchases += amount;
                            const day = purchaseDate.getDate();
                            monthlyDetails[`Día ${day}`] = amount;
                        }
                    });
                    break;

                case 'item':
                    Object.entries(item).forEach(([month, value]) => {
                        totalPurchases += Number(value) || 0;
                        monthlyDetails[month] = value;
                    });
                    break;

                case 'supplier':
                    MONTH_NAMES_ES.forEach((month, index) => {
                        const amount = supplierPurchases
                            .filter(purchase => new Date(purchase.purchaseDate).getMonth() === index)
                            .reduce((sum, purchase) => sum + purchase.payment.reduce((pSum, p) => pSum + Number(p.amount), 0), 0);
                        if (amount > 0) {
                            totalPurchases += amount;
                            monthlyDetails[month] = amount;
                        }
                    });
                    break;

                case 'method':
                    Object.entries(method).forEach(([methodName, value]) => {
                        totalPurchases += Number(value) || 0;
                        monthlyDetails[methodName] = value;
                    });
                    break;
            }

            setPdfData({
                chartImage,
                totalPurchases,
                monthlyDetails
            });

        } catch (error) {
            console.error('Error al generar PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    //  PDF Component
    const PurchaseReportPDF = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reporte de Compras</Text>
                    <Text style={styles.subtitle}>
                        {reportType === 'annual' && `Análisis de compras anuales ${selectedYear}`}
                        {reportType === 'monthly' && `Análisis de compras mensuales ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`}
                        {reportType === 'item' && `Compras por producto`}
                        {reportType === 'supplier' && `Compras por proveedor`}
                        {reportType === 'method' && `Compras por método de pago`}
                    </Text>
                    <Text style={styles.date}>Generado el {new Date().toLocaleDateString('es-ES')}</Text>
                </View>

                {pdfData?.chartImage && (
                    <View style={styles.chartContainer}>
                        <Image src={pdfData.chartImage} style={{ width: '100%' }} />
                    </View>
                )}

                <View style={styles.totals}>
                    <Text style={styles.boldText}>Resumen de Compras</Text>

                    <View style={styles.totalItem}>
                        <Text>Total General:</Text>
                        <Text>$ {pdfData?.totalPurchases?.toLocaleString('es-AR') || 0}</Text>
                    </View>

                    {Object.entries(pdfData?.monthlyDetails || {}).map(([period, amount]) => (
                        <View style={styles.totalItem} key={period}>
                            <Text>{period}:</Text>
                            <Text>$ {amount.toLocaleString('es-AR')}</Text>
                        </View>
                    ))}
                </View>

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
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 3}}>
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
                        document={<PurchaseReportPDF />}
                        fileName={`reporte_compras_${reportType}_${new Date().toISOString().slice(0, 10)}.pdf`}
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
                {reportType === 'annual' && `Compras Anuales ${selectedYear}`}
                {reportType === 'monthly' && `Compras de ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`}
                {reportType === 'item' && `Compras por Producto`}
                {reportType === 'supplier' && `Compras por Proveedor`}
                {reportType === 'method' && `Compras por Método de Pago`}
            </h2>

            <div style={{ height: '500px', marginTop: '40px' }}>
                {reportType === 'supplier' ? (
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
        </div>
    );
};

export default PurchaseChart;
