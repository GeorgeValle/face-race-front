import { useMemo } from 'react';
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

const MONTH_NAMES_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Componente SalesCharts para mostrar gráficos de ventas.
 * Props:
 * - salesData: array de ventas (usado para monthly y annual si no se pasa monthlyTotalsByName)
 * - monthlyTotalsByName: objeto con totales por mes { enero, febrero, ... } (usado para annual)
 * - clientSales: array de ventas filtradas para cliente específico y año (usado para gráfico client)
 * - method: objeto con totales por mes según método de pago (usado para gráfico method)
 * - item: objeto con totales por mes según item (usado para gráfico item)
 * - selectedYear: año seleccionado (number|null)
 * - selectedMonth: mes seleccionado (1-12|null)
 * - reportType: 'monthly' | 'annual' | 'client' | 'method' | 'item'
 */
const PurchasesCharts = ({
    salesData = [],
    monthlyTotalsByName,
    clientSales = [],
    method,
    item,
    selectedYear,
    selectedMonth,
    reportType
}) => {
    const formatDate = (date) => date.toISOString().split('T')[0];

    const validSales = useMemo(() => salesData.filter(sale => sale.paid), [salesData]);

    const yearlySalesData = useMemo(() => {
        if (reportType !== 'annual') return { labels: [], datasets: [] };
        if (!monthlyTotalsByName || typeof monthlyTotalsByName !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(monthlyTotalsByName[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Ventas del Año ${selectedYear || ''}`,
                    data: dataValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        };
    }, [reportType, monthlyTotalsByName, selectedYear]);

    const monthlySalesData = useMemo(() => {
        if (reportType !== 'monthly') return { labels: [], datasets: [] };
        if (!selectedYear || !selectedMonth) return { labels: [], datasets: [] };

        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const salesByDay = Array(daysInMonth).fill(0);

        validSales.forEach(sale => {
            const saleDate = new Date(sale.saleDate);
            if (
                saleDate.getFullYear() === Number(selectedYear) &&
                saleDate.getMonth() + 1 === Number(selectedMonth)
            ) {
                const day = saleDate.getDate();
                const totalPayment = sale.payment.reduce((sum, p) => sum + Number(p.amount), 0);
                salesByDay[day - 1] += totalPayment;
            }
        });

        const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

        return {
            labels,
            datasets: [
                {
                    label: `Ventas de ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`,
                    data: salesByDay,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }
            ]
        };
    }, [reportType, selectedYear, selectedMonth, validSales]);

    const clientSalesData = useMemo(() => {
        if (reportType !== 'client') return { labels: [], datasets: [] };
        if (!clientSales || clientSales.length === 0) return { labels: [], datasets: [] };

        const client = clientSales[0]?.client;
        const clientName = client ? `${client.name} ${client.surname}` : 'Cliente';

        const salesByMonth = Array(12).fill(0);
        clientSales.forEach(sale => {
            const saleDate = new Date(sale.saleDate);
            const month = saleDate.getMonth();
            const totalPayment = sale.payment.reduce((sum, p) => sum + Number(p.amount), 0);
            salesByMonth[month] += totalPayment;
        });

        return {
            labels: MONTH_NAMES_ES,
            datasets: [
                {
                    label: `Ventas cliente: ${clientName}`,
                    data: salesByMonth,
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.5)',
                    tension: 0.3
                }
            ]
        };
    }, [reportType, clientSales]);

    const methodSalesData = useMemo(() => {
        if (reportType !== 'method') return { labels: [], datasets: [] };
        if (!method || typeof method !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(method[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Ventas por método de pago ${selectedYear || ''}`,
                    data: dataValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)'
                }
            ]
        };
    }, [reportType, method, selectedYear]);

    const itemSalesData = useMemo(() => {
        if (reportType !== 'item') return { labels: [], datasets: [] };
        if (!item || typeof item !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(item[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Ventas por ítem ${selectedYear || ''}`,
                    data: dataValues,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)'
                }
            ]
        };
    }, [reportType, item, selectedYear]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 10
        },
        plugins: {
            legend: { position: 'top', labels: { color: '#000' } },
            title: { display: false },
            tooltip: {
                backgroundColor: '#fff', // Tooltip background white
                titleColor: '#000',
                bodyColor: '#000'
            }
        },
        scales: {
            x: {
                grid: { color: '#e0e0e0' },
                ticks: { color: '#000' },
                backgroundColor: '#fff' // No direct support, style container instead
            },
            y: {
                beginAtZero: true,
                grid: { color: '#e0e0e0' },
                ticks: { color: '#000' }
            }
        }
    };

    // Estilo de contenedor para fondo blanco en gráfico
    const containerStyle = {
        maxWidth: 1100,
        height: '600px',
        margin: '0 auto',
        padding: '1rem',
        backgroundColor: '#fff', // fondo blanco
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#000' }}>Resumen de Ventas</h2>

            {reportType === 'annual' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {monthlyTotalsByName ? (
                        <Bar data={yearlySalesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, seleccione el año para visualizar el gráfico anual.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'monthly' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {selectedYear && selectedMonth ? (
                        <Bar data={monthlySalesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, seleccione año y mes para visualizar el gráfico mensual.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'client' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {clientSales && clientSales.length > 0 ? (
                        <Line data={clientSalesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, el DNI del cliente para visualizar su gráfico.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'method' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {method ? (
                        <Bar data={methodSalesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, seleccione un método con datos para visualizar el gráfico.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'item' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {item ? (
                        <Bar data={itemSalesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, ingrese un código de ítem para visualizar el gráfico.
                        </p>
                    )}
                </section>
            )}

            {!['monthly', 'annual', 'client', 'method', 'item'].includes(reportType) && (
                <p style={{ color: '#000' }}>
                    Por favor, seleccione un tipo de reporte válido para visualizar gráficos.
                </p>
            )}
        </div>
    );
};

export default PurchasesCharts;