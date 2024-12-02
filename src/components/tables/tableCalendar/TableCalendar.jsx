
import { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
import axios from 'axios';
import styles from './TableCalendar.module.css';
// import 'react-calendar/dist/Calendar.css';
import config from "../../../config/Envs"
import TextInputStyled from "../../inputs/inputTextStyled/TextInputStyled"
import TextViewInfoStyled from "../../textViews/textViewInfoStyled/TextViewInfoStyled"
import MiniBtn from "../../btns/miniBtn/MiniBtn"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, /*faPlus, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux";
import { addClient,/* changeClient,*/ } from "../../../redux/ClientSlice";
import {addShift,/* changeShift, deleteShift*/} from "../../../redux/ShiftSlice"
import { addAppointmentsList, /* changeEvent, deleteEvent */} from "../../../redux/AppointmentsListSlice"
import { useSelector } from 'react-redux';
import MessageModal from "../../../components/modals/messageModal/MessageModal"
import Dialog from "../../../components/modals/dialog/Dialog"
import AppointmentModal from '../../modals/AppointmentModal/AppointmentModal';


const TableCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [theDate, setTheDate] = useState(new Date());
  const [theTimeSlot, setTheTimeSlot] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
//   const [selectedWeek, setSelectedWeek] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [inputDNI, setInputDNI] = useState("")
  const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("");
    //const [messageButton, setMessageButton] = useState("");
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenDialog1, setModalOpenDialog1] = useState(false);
    const [modalOpenMessage, setModalOpenMessage] = useState("");
    const [modalOpenDialog2, setModalOpenDialog2] = useState(false);
    const [modalOpenAppointment, setModalOpenAppointment] = useState(false);

//  const [isClient, setIsClient] = useState(false)

  const client = useSelector((state)=> state.client);
  const shift = useSelector((state)=> state.shift);
    
    
    const dispatch = useDispatch();

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleClose = () =>{
    
    setModalOpenDialog1(false)
    setModalOpenMessage(false)
    setMessageModal(false)
    setModalOpenDialog2(false);
    setModalOpenAppointment(false)
    setMessageDialog("")
    setMessage("")
  }

//   const handleWeekChange = (event) => {
//     setSelectedWeek(parseInt(event.target.value));
//   };
const MessageResponse = () =>{
  setModalOpenMessage(true)
        setTimeout(() => {
            setModalOpenMessage(false);
                    }, 3500);
}

const handleConfirmNewAppointment = () =>{
  sendNewAppointment(theDate,theTimeSlot);
  setModalOpenDialog1(false)
  setModalOpenDialog2(false);
}

const fetchByDNI = async (dni) =>{
  try{
    const request = await axios.get(`${config.API_BASE}appointment/dni/${dni}`)
      const response = request.data
      dispatch(addShift(response.data))
      if(response.data){
        setModalOpenAppointment(true)
        
      }
  }catch(error){
      console.log("Error shift by dni",error)
  }
}

const fetchClient = async() => {
    //setIsLIstClient(false)
    //setIsClient(true)
    
    try{
        const request = await axios.get((`${config.API_BASE}client/dni/${inputDNI}`))
        const response = request.data
        dispatch(addClient(response.data))
        if(response.data){
          
          fetchByDNI(response.data.dni);
        }
    }catch(error){
        setMessage("Cliente NO encontrado")
        MessageResponse();   
    }

  
}

  const fetchAppointments = async () => {
    try {
      //params: { month: selectedMonth + 1, year: selectedYear }
      const response =
      await axios.get(`${config.API_BASE}appointment/date/${selectedMonth + 1}/${selectedYear}`)
      // .then(response => { 
      //   const fetchedAppointments = response.data; 

      //   const formattedAppointments = fetchedAppointments.reduce((acc, appointment) => {
      //   const key = `${appointment.date.toISOString().split('T')[0]}-${appointment.timeSlot}`; 
      //     acc[key] = appointment; 
      //     return acc; }, {});
      //   setAppointments(formattedAppointments);
      // }) 
      // .catch(error => console.error('Error fetching appointments:', error)); }
    //   if(!response.data){
        setAppointments(response.data);
        
      }
    catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    const generateWeeks = () => {
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
      const weeksData = [];
      let week = [];

      for (let day = startOfMonth.getDate(); day <= endOfMonth.getDate(); day++) {
        const currentDate = new Date(selectedYear, selectedMonth, day);
        const dayOfWeek = currentDate.getDay();

        // Excluir sábados (6) y domingos (0)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          week.push(currentDate);
        }

        // Si es domingo (fin de semana) o el último día del mes, agregar la semana a las semanas
        if (dayOfWeek === 0 || day === endOfMonth.getDate()) {
          if (week.length > 0) {
            weeksData.push(week);
            week = [];
          }
        }
      }

      setWeeks(weeksData);
    };

    generateWeeks();
    fetchAppointments();
  }, [selectedMonth, selectedYear]);

  
  const sendNewAppointment = (date, timeSlot) =>{
    
    //personal data
    const person = `${client.name} ${client.surname}`;
    const phone = client.cel;
    const email = client.email;
    const dni = client.dni;

    const newAppointment = { person, phone, email, dni, date, timeSlot };
    //update local useState 
    setAppointments((prev) => ({
      ...prev,
      [`${date.toISOString().split('T')[0]}-${timeSlot}`]: newAppointment
    }));

    
    addAppointmentsList(appointments)
    // send data to server
    axios.post(`${config.API_BASE}appointment/register`, newAppointment)
      .then(response => setMessage(response.message)) //console.log( `${response.message}`))
      .catch(error => console.error('Error guardando datos:', error));
      
  }
  
  const handleSlotClick = (date, timeSlot) => {
    // const person = prompt('Nombre de la persona:');
    // const phone = prompt('Teléfono:');
    // const email = prompt('Email:');
    // const dni = prompt('DNI:');
    //setDate(date)
    setTheDate(date)
    setTheTimeSlot(timeSlot)

    setMessageModal(`¿Está seguro de agendar un turno para ${client.name} ${client.surname}?`)
    setMessageDialog('Agendar')
    setModalOpenDialog2(true);

    // if(isConfirm){
    //   sendNewAppointment(date, timeSlot);
    // }

      // setIsConfirm(false)
    
    
  };

  const renderColumns = () => {
    return weeks.map((week, index) => (
      <div key={`week-${index}`} className={styles.weekRow}>
        {week.map(date => {
          const day = date.getDate();
          const month = date.toLocaleString('es', { month: 'long' });
          const dateString = date.toISOString().split('T')[0];

          const timeSlots = ['10-12', '13-15', '16-18'];

          return (
            <div key={day} className={styles.dayColumn}>
              <div className={styles.header}>
                {day} - {month}
              </div>
              {timeSlots.map(slot => {
                const appointmentKey = `${dateString}-${slot}`;
                const appointment = appointments[appointmentKey];
                const isBooked = !!appointment;
                const slotClass = isBooked ? styles.bookedSlot : styles.availableSlot;

                return (
                  <div
                    key={slot}
                    className={slotClass}
                    onClick={() => handleSlotClick(date, slot)}
                  >
                    {slot}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
      {modalOpenDialog1&&(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDelete} onClose={handleClose}/>)}
      {modalOpenDialog2&&(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleConfirmNewAppointment} onClose={handleClose}/>)}
      {modalOpenAppointment&&(<AppointmentModal TheShift={shift} onPrint={null} onDelete={handleConfirmNewAppointment} onClose={handleClose}/>)}
    <div className={styles.center}>
      <div className={styles.separate} >
      <div className={styles.article} >
            <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI o CUIT Cliente" value={inputDNI} onChange={(e) =>setInputDNI(e.target.value)} />
            <MiniBtn onClick={fetchClient} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
      </div>
      <div className={styles.article}>
        
        <TextViewInfoStyled titleLabel= "Nombre del Cliente " size={false} value= {`${client.name==null?"":client.name} ${client.surname==null?"":client.surname}`} />        
        </div>
        <div className={styles.inputDate_group}>
            <label className={styles.label}>
            Mes:
            </label>
            <select className={styles.styledSelect} value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                    {new Date(0, i).toLocaleString('es', { month: 'long' })}
                </option>
                ))}
            </select>
          </div>
          <div className={styles.inputDate_group} >
            <label className={styles.label}>
            Año:
            </label>
            <select className={styles.styledSelect} value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={date.getFullYear() - 5 + i}>
                    {date.getFullYear() - 5 + i}
                </option>
                ))}
            </select>
          </div>
          </div>

        {/* <label>
          Semana:
          <select value={selectedWeek} onChange={handleWeekChange}>
            <option value={null}>Todas</option>
            {weeks.map((_, index) => (
              <option key={index} value={index}>
                Semana {index + 1}
              </option>
            ))}
          </select>
        </label> */}
      </div>
      {/* <Calendar  onChange={handleDateChange} value={date} /> */}
      <div className={styles.calendarContainer}>
        {renderColumns()}
      </div>
    </div>
  );
};

export default TableCalendar;