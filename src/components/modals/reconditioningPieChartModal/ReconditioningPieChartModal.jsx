import Style from './AppointmentPieChartModal.module.css';
//import BtnClose from '../../btns/btnClose/BtnClose';
import MiniNavBar from '../../miniNavbar/MIniNavBar';
import {Chart as ChartJS,
        ArcElement,
        Tooltip,
        Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend)

const AppointmentPieChartModal = ({ reconditionings, onClose }) => {

    // const chartRef = useRef(null);
    
    // useEffect(() => {
    //     if (chartRef.current) {
    //         chartRef.current.destroy();
    //     }
    // }, []);

    const data = {
        labels: ['Pendientes', 'Cancelados', 'Ausentes', 'Atendidos'],
        datasets: [{
            label: 'Estados de turnos',
            data: [
                reconditionings.filter(reconditioning => reconditioning.status === 'pending').length,
                reconditionings.filter(reconditioning => reconditioning.status === 'canceled').length,
                reconditionings.filter(reconditioning => reconditioning.status === 'missing').length,
                reconditionings.filter(reconditioning => reconditioning.status === 'attended').length,
            ],
            backgroundColor: [
                //'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                // 
                'rgba(255, 165, 0, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    };

    const options = {
        title: {
            display: true,
            text: 'Estados de turnos',
        },
        
    };

    // useEffect(() => {
    //     setChartId(chartId + 1);
    // }, [appointments]);






    return (
        <div className={Style.modal_container} onClick={(e) => {
            if (e.target.className === Style.modal_container) { onClose() }
        }}>
            <div className={Style.modal} >
                <MiniNavBar miniTitle={"Estado de las Entregas"} btnClose={true} close={onClose} /> 
                <div className={Style.item}>
                    
                    {/* <div className={Style.close} ><BtnClose close={onClose} /></div> */}
                    <div className={Style.pieChart}>
                        <Pie
                            // ref={chartRef}
                            
                            type="pie"
                            data={data}
                            options={options}
                        >
                        </Pie>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentPieChartModal