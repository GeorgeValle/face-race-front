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
    purchasesData = [],
    monthlyTotalsByName,
    supplierPurchases = [],
    method,
    item,
    selectedYear,
    selectedMonth,
    reportType
}) => {
    const formatDate = (date) => date.toISOString().split('T')[0];

    const validPurchases = useMemo(() => purchasesData.filter(purchase => purchase.paid), [purchasesData]);

    const yearlyPurchasesData = useMemo(() => {
        if (reportType !== 'annual') return { labels: [], datasets: [] };
        if (!monthlyTotalsByName || typeof monthlyTotalsByName !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(monthlyTotalsByName[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Compras del Año ${selectedYear || ''}`,
                    data: dataValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        };
    }, [reportType, monthlyTotalsByName, selectedYear]);

    const monthlyPurchasesData = useMemo(() => {
        if (reportType !== 'monthly') return { labels: [], datasets: [] };
        if (!selectedYear || !selectedMonth) return { labels: [], datasets: [] };

        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const purchasesByDay = Array(daysInMonth).fill(0);

        validPurchases.forEach(purchase => {
            const purchaseDate = new Date(purchase.purchaseDate);
            if (
                purchaseDate.getFullYear() === Number(selectedYear) &&
                purchaseDate.getMonth() + 1 === Number(selectedMonth)
            ) {
                const day = purchaseDate.getDate();
                const totalPayment = purchase.payment.reduce((sum, p) => sum + Number(p.amount), 0);
                purchasesByDay[day - 1] += totalPayment;
            }
        });

        const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

        return {
            labels,
            datasets: [
                {
                    label: `Compras de ${MONTH_NAMES_ES[selectedMonth - 1]} ${selectedYear}`,
                    data: purchasesByDay,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }
            ]
        };
    }, [reportType, selectedYear, selectedMonth, validPurchases]);

    const supplierPurchasesData = useMemo(() => {
        if (reportType !== 'supplier') return { labels: [], datasets: [] };
        if (!supplierPurchases || supplierPurchases.length === 0) return { labels: [], datasets: [] };

        const supplier = supplierPurchases[0]?.supplier;
        const supplierName = supplier ? `${supplier.businessName} Alias: ${supplier.companyName}` : 'Proveedor';

        const purchasesByMonth = Array(12).fill(0);
        supplierPurchases.forEach(purchase => {
            const purchaseDate = new Date(purchase.purchaseDate);
            const month = purchaseDate.getMonth();
            const totalPayment = purchase.payment.reduce((sum, p) => sum + Number(p.amount), 0);
            purchasesByMonth[month] += totalPayment;
        });

        return {
            labels: MONTH_NAMES_ES,
            datasets: [
                {
                    label: `Compras Proveedor: ${supplierName}`,
                    data: purchasesByMonth,
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.5)',
                    tension: 0.3
                }
            ]
        };
    }, [reportType, supplierPurchases]);

    const methodPurchasesData = useMemo(() => {
        if (reportType !== 'method') return { labels: [], datasets: [] };
        if (!method || typeof method !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(method[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Compras por método de pago ${selectedYear || ''}`,
                    data: dataValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)'
                }
            ]
        };
    }, [reportType, method, selectedYear]);

    const itemPurchasesData = useMemo(() => {
        if (reportType !== 'item') return { labels: [], datasets: [] };
        if (!item || typeof item !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(month => Number(item[month]) || 0);

        return {
            labels,
            datasets: [
                {
                    label: `Compras por ítem ${selectedYear || ''}`,
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
            <h2 style={{ color: '#000' }}>Resumen de Compras</h2>

            {reportType === 'annual' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {monthlyTotalsByName ? (
                        <Bar data={yearlyPurchasesData} options={options} />
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
                        <Bar data={monthlyPurchasesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, seleccione año y mes para visualizar el gráfico mensual.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'supplier' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {supplierPurchases && supplierPurchases.length > 0 ? (
                        <Line data={supplierPurchasesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, el CUIT del Proveedor para visualizar su gráfico.
                        </p>
                    )}
                </section>
            )}

            {reportType === 'method' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {method ? (
                        <Bar data={methodPurchasesData} options={options} />
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
                        <Bar data={itemPurchasesData} options={options} />
                    ) : (
                        <p style={{ color: '#000' }}>
                            Por favor, ingrese un código de ítem para visualizar el gráfico.
                        </p>
                    )}
                </section>
            )}

            {!['monthly', 'annual', 'supplier', 'method', 'item'].includes(reportType) && (
                <p style={{ color: '#000' }}>
                    Por favor, seleccione un tipo de reporte válido para visualizar gráficos.
                </p>
            )}
        </div>
    );
};

export default PurchasesCharts;