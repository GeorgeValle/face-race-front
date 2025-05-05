import React, { useMemo } from 'react';
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

const MONTH_NAMES_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/**
 * Componente SalesCharts para mostrar gráficos de ventas.
 * Props:
 * - salesData: array de ventas (usado para monthly y annual si no se pasa monthlyTotalsByName)
 * - monthlyTotalsByName: objeto con totales por mes { enero: number, febrero: number, ... } (usado para annual)
 * - clientSales: array de ventas ya filtradas para un cliente específico y año específico (usado para gráfico cliente)
 * - method: objeto con totales por mes según método de pago { enero: number, febrero: number, ... } (usado para gráfico method)
 * - selectedYear: año seleccionado (number|null)
 * - selectedMonth: mes seleccionado (1-12|null)
 * - reportType: 'monthly' | 'annual' | 'client' | 'method'
 */
const SalesCharts = ({
    salesData = [],
    monthlyTotalsByName,
    clientSales = [],
    method,
    selectedYear,
    selectedMonth,
    reportType
}) => {
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Ventas pagadas para cálculos (monthly y client)
    const validSales = useMemo(() => salesData.filter(sale => sale.paid), [salesData]);

    // Gráfico anual usando monthlyTotalsByName
    const yearlySalesData = useMemo(() => {
        if (reportType !== 'annual') return { labels: [], datasets: [] };
        if (!monthlyTotalsByName || typeof monthlyTotalsByName !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(mes => Number(monthlyTotalsByName[mes]) || 0);

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

    // Gráfico mensual calculado via salesData
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

    // Gráfico por cliente usando clientSales
    const clientSalesData = useMemo(() => {
        if (reportType !== 'client') return { labels: [], datasets: [] };
        if (!clientSales || clientSales.length === 0) return { labels: [], datasets: [] };

        const cliente = clientSales[0]?.client;
        const clientName = cliente ? `${cliente.name} ${cliente.surname}` : 'Cliente';

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

    // Gráfico method usando prop method
    const methodSalesData = useMemo(() => {
        if (reportType !== 'method') return { labels: [], datasets: [] };
        if (!method || typeof method !== 'object') return { labels: [], datasets: [] };

        const labels = MONTH_NAMES_ES;
        const dataValues = labels.map(mes => Number(method[mes]) || 0);

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

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: false }
        },
        scales: { y: { beginAtZero: true } }
    };

    return (
        <div style={{ maxWidth: 1100, height: '600px', margin: '0 auto', padding: '1rem' }}>
            <h2>Resumen de Ventas</h2>

            {reportType === 'annual' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {monthlyTotalsByName ? (
                        <Bar data={yearlySalesData} options={options} />
                    ) : (
                        <p>Por favor, pase el objeto con los totales mensuales para visualizar el gráfico anual.</p>
                    )}
                </section>
            )}

            {reportType === 'monthly' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {selectedYear && selectedMonth ? (
                        <Bar data={monthlySalesData} options={options} />
                    ) : (
                        <p>Por favor, seleccione año y mes para visualizar el gráfico mensual.</p>
                    )}
                </section>
            )}

            {reportType === 'client' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {clientSales && clientSales.length > 0 ? (
                        <Line data={clientSalesData} options={options} />
                    ) : (
                        <p>Por favor, pase un array con las ventas del cliente para visualizar su gráfico.</p>
                    )}
                </section>
            )}

            {reportType === 'method' && (
                <section style={{ marginBottom: '2rem', height: '450px' }}>
                    {method ? (
                        <Bar data={methodSalesData} options={options} />
                    ) : (
                        <p>Por favor, pase un objeto con totales por método para visualizar el gráfico.</p>
                    )}
                </section>
            )}

            {!['monthly', 'annual', 'client', 'method'].includes(reportType) && (
                <p>Por favor, seleccione un tipo de reporte válido para visualizar gráficos.</p>
            )}
        </div>
    );
};

export default SalesCharts;