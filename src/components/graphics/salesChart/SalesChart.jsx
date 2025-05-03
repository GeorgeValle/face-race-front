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
 * - salesData: array de ventas (usado solo para reportType monthly y client)
 * - monthlyTotalsByName: objeto con totales por mes { enero: number, febrero: number, ... } (usado para annual)
 * - selectedYear: año seleccionado (number|null)
 * - selectedMonth: mes seleccionado (1-12|null)
 * - selectedClientDni: DNI del cliente para filtro (string|null)
 * - reportType: 'monthly' | 'annual' | 'client'
 */
const SalesCharts = ({
    salesData = [],
    monthlyTotalsByName,
    selectedYear,
    selectedMonth,
    selectedClientDni,
    reportType
}) => {
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Ventas filtradas (pagadas) para monthly y client
    const validSales = useMemo(() => salesData.filter(sale => sale.paid), [salesData]);

    // Datos para gráfico anual: SOLO usar monthlyTotalsByName, SIN cálculo con salesData
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

    // Gráfico por cliente calculado via salesData
    const clientSalesData = useMemo(() => {
        if (reportType !== 'client') return { labels: [], datasets: [] };
        if (!selectedClientDni) return { labels: [], datasets: [] };

        const clientSales = validSales.filter(sale => {
            const saleDate = new Date(sale.saleDate);
            const matchesClient = sale.client?.dni === selectedClientDni;
            const matchesYear = selectedYear ? saleDate.getFullYear() === Number(selectedYear) : true;
            const matchesMonth = selectedMonth ? saleDate.getMonth() + 1 === Number(selectedMonth) : true;
            return matchesClient && matchesYear && matchesMonth;
        });

        const salesMap = new Map();
        clientSales.forEach(sale => {
            const dateStr = formatDate(new Date(sale.saleDate));
            const totalPayment = sale.payment.reduce((sum, p) => sum + Number(p.amount), 0);
            salesMap.set(dateStr, (salesMap.get(dateStr) || 0) + totalPayment);
        });

        const labels = Array.from(salesMap.keys()).sort();
        const dataValues = labels.map(label => salesMap.get(label));

        return {
            labels,
            datasets: [
                {
                    label: `Ventas cliente DNI: ${selectedClientDni}`,
                    data: dataValues,
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.5)',
                    tension: 0.3
                }
            ]
        };
    }, [reportType, selectedClientDni, selectedYear, selectedMonth, validSales]);

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
        <div style={{ maxWidth: 1200, height: '650px', margin: '0 auto', padding: '1rem' }}>
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
                    {selectedClientDni ? (
                        <>
                            <h3>Ventas del Cliente DNI: {selectedClientDni}</h3>
                            <Line data={clientSalesData} options={options} />
                        </>
                    ) : (
                        <p>Por favor, seleccione un cliente (DNI) para visualizar el gráfico por cliente.</p>
                    )}
                </section>
            )}

            {!['monthly', 'annual', 'client'].includes(reportType) && (
                <p>Por favor, seleccione un tipo de reporte válido para visualizar gráficos.</p>
            )}
        </div>
    );
};

export default SalesCharts;