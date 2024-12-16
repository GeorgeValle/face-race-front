
import { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
import axios from 'axios';
import styles from './TableCalendar.module.css';
// import 'react-calendar/dist/Calendar.css';
import config from "../../../config/Envs"
import TextInputStyled from "../../inputs/inputTextStyled/TextInputStyled"
import TextViewInfoStyled from "../../textViews/textViewInfoStyled/TextViewInfoStyled"
import MiniBtn from "../../btns/miniBtn/MiniBtn"
import { createPortal } from 'react-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, /*faPlus, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux";
import { addClient,/* changeClient,*/ } from "../../../redux/ClientSlice";
import {addShift, deleteShift} from "../../../redux/ShiftSlice"
//import { addAppointmentsList, /* changeEvent, deleteEvent */} from "../../../redux/AppointmentsListSlice"
import { useSelector } from 'react-redux';
import MessageModal from "../../../components/modals/messageModal/MessageModal"
import Dialog from "../../../components/modals/dialog/Dialog"
import AppointmentModal from '../../modals/AppointmentModal/AppointmentModal';


const TableCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [theDate, setTheDate] = useState(new Date());
  const [theTimeSlot, setTheTimeSlot] = useState("");
  const [theId, setTheId]= useState("");
  //const[theStatus, setThe Status] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
//   const [selectedWeek, setSelectedWeek] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [inputDNI, setInputDNI] = useState("")
  const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("");
    //const [messageButton, setMessageButton] = useState("");
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenDialog1, setModalOpenDialog1] = useState(false);
    const [modalOpenMessage, setModalOpenMessage] = useState("");
    const [modalOpenDialog2, setModalOpenDialog2] = useState(false);
    const [modalOpenAppointment, setModalOpenAppointment] = useState(false);
    const [isFetchClient, setIsFetchClient] = useState(false);




    
    
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

const handleConfirmDeleteAppointment = () =>{
  setModalOpenAppointment(false);
  setModalOpenDialog1(true);
}

const handleEditDescription = async (oneDescription) =>{
  try {
    await axios.put(`${config.API_BASE}appointment/id/${shift._id}`, {
      description: oneDescription,
    });

  } catch (error) {
    //delete later
    console.error('Error al actualizar los datos:', error);
    setMessage('error al actualizar las Observaciones')
    MessageResponse();
  }

  //update local appointment.status 
  setAppointments(prevAppointments =>
    prevAppointments.map(appointment =>
      appointment._id === shift._id
      ? { ...appointment, description:oneDescription }
      : appointment ))
};

const handleEditStatus= async (oneStatus) =>{
  try {
    await axios.put(`${config.API_BASE}appointment/id/${shift._id}`, {
      status: oneStatus,
    });

  } catch (error) {
    //delete later
    console.error('Error al actualizar los datos:', error);
    setMessage('error al actualizar el estado')
    MessageResponse();
  }
  //update local appointment.status 
  setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment._id === shift._id
        ? { ...appointment, status: oneStatus }
        : appointment ))
};

const handleDelete = async ()=>{
  
  // setAppointments(prevAppointments => {
  //   const updatedAppointments = prevAppointments.filter(appointment => {
  //     const appointmentKey = `${new Date(appointment.shiftDate).toISOString().split('T')[0]}-${appointment.timeSlot}`;
  //     return appointmentKey !== key; 
  //   });
  //     return updatedAppointments; 
  // });
  
  
  // const appointmentKey = `${theDate.split('T')[0]}-${theTimeSlot}`;

  // setAppointments(prevAppointments => {
  //   const newAppointments = { ...prevAppointments };
  //       delete newAppointments[appointmentKey];
  //       return newAppointments; });

  // //delete local state
  // setAppointments((prev)=>{
  //   const newAppointments = {...prev};
  //   delete newAppointments[key];
  //   return newAppointments;
  // });

  // setAppointments((prev) => {
  //   return prev.filter((appointment) => {
  //     const appointmentKey = `${appointment.shiftDate}-${appointment.slotTime}`;
  //     return appointmentKey !== key;
  //   });
  // });
  setModalOpenDialog1(false);

  try{
    //delete in DB
  const request = await axios.delete(`${config.API_BASE}appointment/delete/${theId}`)
  const response =request.data;
  
  if(response.deleted===true){
    setMessage(response.message)
    MessageResponse();
    deleteShift();
    
    setAppointments(prevAppointments => 
      prevAppointments.filter(appointment => appointment._id !== theId) 
    );
  }else{
    setMessage(response.message||"NO se eliminó ningún turno")
    MessageResponse();
  }

  }catch(error){
    setMessage('Error al eliminar el turno')
    MessageResponse();
  }
  

}

const fetchByDNI = async (dni) =>{
  try{
    const request = await axios.get(`${config.API_BASE}appointment/dni/${dni}`)
      const response = request.data
      
      if(response.data){
        dispatch(addShift(response.data))
        setModalOpenAppointment(true)
        setTheDate(response.data.shiftDate)
        
        setTheTimeSlot(response.data.timeSlot)
        setTheId(response.data._id)
        

        
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
          setIsFetchClient(true);
          fetchByDNI(response.data.dni);
        }
    }catch(error){
        setMessage("Cliente NO encontrado")
        MessageResponse();   
    }

  
}


  useEffect(() => {
    
    const fetchAppointments = async () => {
        //params: { month: selectedMonth + 1, year: selectedYear }
        try{
        const response =
        await axios.get(`${config.API_BASE}appointment/date/${selectedMonth + 1}/${selectedYear}`)
        
          // Extraer los datos relevantes de la respuesta
          // const fetchedAppointments = response.data || [];
          // const formattedAppointments = fetchedAppointments.reduce((acc, appointment) => {
          //   const key = `${new Date(appointment.shiftDate).toISOString().split('T')[0]}-${appointment.timeSlot}`;
          //   acc[key] = {
          //     _id: appointment._id,
          //     person: appointment.person,
          //     dni: appointment.dni,
          //     email: appointment.email,
          //     phone: appointment.phone,
          //     shiftDate: appointment.shiftDate,
          //     timeSlot: appointment.timeSlot
          //   };
          //   return acc;
          // }, {});
          // const newAppointments = Object.values(response.data);
          setAppointments(response.data.data);
}catch(error){
setMessage("sin info")
MessageResponse();
}
      
          
        // const appointmentsReceived = response.data.data.data
        // if (Array.isArray(appointmentsReceived)) {
        //   const formattedAppointments = appointmentsReceived.reduce((acc, appointmentsReceived) => {
        //       const key = `${new Date(appointmentsReceived.shiftDate).toISOString().split('T')[0]}-${appointmentsReceived.timeSlot}`;
        //       acc[key] = {
        //           _id: appointmentsReceived._id, 
        //           person: appointmentsReceived.person, 
        //           dni: appointmentsReceived.dni, 
        //           email: appointmentsReceived.email, 
        //           phone: appointmentsReceived.phone, 
        //           shiftDate: appointmentsReceived.shiftDate, 
        //           timeSlot: appointmentsReceived.timeSlot 
        //       };
        //       return acc;
        //   }, {});


        // setAppointments(formattedAppointments);
        // }
          
        
      
    };

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

  
  const sendNewAppointment = async (oneDate, timeSlot) =>{
    
    //personal data
    const person = `${client.name} ${client.surname}`;
    const phone = client.cel;
    const email = client.email;
    const dni = client.dni;

    const shiftDate = new Date (oneDate);
    shiftDate.setUTCHours(3,0,0,0);
    //const newAppointment = { person, phone, email, dni, date, timeSlot };
    const newAppointment = {person, dni, email, phone, shiftDate, timeSlot}
    //update local useState 
    // setAppointments((prev) => ({
    //   ...prev,
    //   [`${date.toISOString().split('T')[0]}-${timeSlot}`]: newAppointment
    // }));
    
    //setAppointments((prev) => [ ...prev, { ...newAppointment, shiftDate: new Date(newAppointment.shiftDate) } ]);
    
    try{
      const request = await axios.post(`${config.API_BASE}appointment/register`, newAppointment);
      const response = request.data;
      if(response.registered===true){
        
        setAppointments((prev) => [ ...prev, response.data ]);
        setMessage(response.message);
        MessageResponse();

      }else{
        setMessage(response.message, "-",response.status);
        MessageResponse();
      }
      // .then(response => setMessage(response.message)) //console.log( `${response.message}`))
      // .catch(error => console.error('Error guardando datos:', error));
    }catch(error){
      setMessage("Error al registrar el turno ",);
      MessageResponse();
      
      // console.error('Error guardando datos:', error);
    }
    //addAppointmentsList(appointments)
    // send data to server
    
      
  }
  
  const handleSlotClick = async (theAppointment, isBooked, date, slot) => {
    // const person = prompt('Nombre de la persona:');
    // const phone = prompt('Teléfono:');
    // const email = prompt('Email:');
    // const dni = prompt('DNI:');
    //setDate(date)
    // setTheDate(theAppointment.shiftDate)
    // setTheTimeSlot(theAppointment.timeSlot)
    // setTheStatus(isBooked)
  
    // const appointmentKey = `${new Date(theAppointment.shiftDate).toISOString().split('T')[0]}-${theAppointment.timeSlot}`;
    //   const appointment = appointments[appointmentKey];

    if(isBooked){
      
      const dni = theAppointment.dni
      await fetchByDNI(dni);
    }else if(isFetchClient){
      setDate(date)
      setTheDate(date)
      setTheTimeSlot(slot)
      setMessageModal(`¿Está seguro de agendar un turno para ${client.name} ${client.surname}?`)

      setMessageDialog('Agendar')
      setModalOpenDialog2(true);
      setIsFetchClient(false);
    }else{
      setMessage("NO se seleccionó un cliente para agendar");
      MessageResponse();
    }
    
  };

  const renderColumns = () => {
    // return weeks.map((week, index) => (
    //   <div key={`week-${index}`} className={styles.weekRow}>
    //     {week.map(date => {
    //       const day = date.getDate();
    //       const month = date.toLocaleString('es', { month: 'long' });
    //       const dateString = date.toISOString().split('T')[0];

    //       const timeSlots = ['10-12', '13-15', '16-18'];

    //       return (
    //         <div key={day} className={styles.dayColumn}>
    //           <div className={styles.header}>
    //             {day} - {month}
    //           </div>
    //           {timeSlots.map(slot => {
    //             const appointmentKey = `${dateString}-${slot}`;
    //             const appointment = appointments[appointmentKey];
    //             const isBooked = !!appointment;
    //             const slotClass = isBooked ? styles.bookedSlot : styles.availableSlot;
                

    //             return (
    //               <div
    //                 key={slot}
    //                 className={slotClass}
    //                 onClick={() => handleSlotClick(date, slot, isBooked)}
    //               >
    //                 {slot}
    //               </div>
    //             );
    //           })}
    //         </div>
    //       );
    //     })}
    //   </div>
    // ));
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const groupedAppointments = appointments.reduce((acc, appointment) => {
      const dateKey = new Date(appointment.shiftDate).toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(appointment);
      return acc;
    }, {});

    return weeks.map((week, index) => (
      <div key={`week-${index}`} className={styles.weekRow}>
        {week.map(date => {
          const dateString = date.toISOString().split('T')[0];
          const day = date.getDate();
          const month = date.toLocaleString('es', { month: 'long' });
          const isPastDate = date < yesterday;

          const timeSlots = ['10-12', '13-15', '16-18'];

          return (
            <div key={day} className={styles.dayColumn}>
              <div className={styles.header}>
                {day} - {month}
              </div>
              {timeSlots.map(slot => {
                const appointment = groupedAppointments[dateString]?.find(appt => appt.timeSlot === slot);
                //if(!appointment){setTheDate(date),setTheTimeSlot(slot)}
                const isBooked = !!appointment;
                let slotClass = styles.availableSlot;
                
                //slotClass = isBooked ? styles.bookedSlot : styles.availableSlot;
                  if (appointment){
                    switch(appointment.status){
                        case 'attended':
                        slotClass=styles.attendedSlot;
                        break;
                        case 'canceled':
                          slotClass=styles.canceledSlot;
                          break;
                        case 'missing':
                          slotClass=styles.missingSlot;
                          break;
                        case 'pending':
                          slotClass=styles.pendingSlot;
                          break;
                        default:
                          slotClass=styles.bookedSlot;
                    }
                  }

                if (isPastDate&&!isBooked) { 
                  slotClass = styles.pastSlot;
                }
                return (
                  <div
                    key={slot}
                    className={slotClass}
                    onClick={() => isPastDate && !isBooked || handleSlotClick(appointment, isBooked, date, slot) }
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
      {modalOpenMessage&&createPortal(<MessageModal messageModal={message} onClose={handleClose}/>,document.body)}
      {modalOpenDialog1&&createPortal(<Dialog messageModal={`¿Está seguro de ELIMINAR el turno para ${shift.person}?`} messageConfirm={"ELIMINAR"} onSubmit={handleDelete} onClose={handleClose}/>,document.body)}
      {modalOpenDialog2&&createPortal(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleConfirmNewAppointment} onClose={handleClose}/>,document.body)}
      {modalOpenAppointment&&createPortal(<AppointmentModal TheShift={shift} onEditStatus={handleEditStatus} onEditDescription={handleEditDescription} onPrint={null} onDelete={handleConfirmDeleteAppointment} onClose={handleClose}/>,document.body)}
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