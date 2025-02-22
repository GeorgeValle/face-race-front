import Style from './AppointmentPieChartModal.module.css'
import BtnClose from '../../btns/btnClose/BtnClose'
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'


const AppointmentPieChartModal = ({ appointments, onClose }) => {

    const [data, setData] = useState({
        labels: ['Pendiente', 'Cancelado', 'Ausente', 'Atendido'],
        datasets: [{
            label: 'Estado de turnos',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    });


    useEffect(() => {
        const pendiente = appointments.filter(appointment => appointment.status === 'pending').length;
        const cancelado = appointments.filter(appointment => appointment.status === 'canceled').length;
        const ausente = appointments.filter(appointment => appointment.status === 'missing').length;
        const atendido = appointments.filter(appointment => appointment.status === 'attended').length;

        setData({
            labels: ['Pendiente', 'Cancelado', 'Ausente', 'Atendido'],
            datasets: [{
                label: 'Estado de turnos',
                data: [pendiente, cancelado, ausente, atendido],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        });
    }, [appointments]);

    return (
        <div className={Style.modal_container} onClick={(e) => {
            if (e.target.className === Style.modal_container) { onClose() }
        }}>
            <div className={Style.modal} >
                <div className={Style.item}>
                    {/* <MIniNavBar miniTitle={""} btnClose={true} close={onClose} /> */}
                    <div className={Style.close} ><BtnClose close={onClose} /></div>
                    <div>
                        <Bar data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentPieChartModal