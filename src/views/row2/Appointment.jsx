// ******* Appointment = turno o cita in spanish ************
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
// import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
// import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
// import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import { useState, /*useEffect*/} from 'react'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"

import MessageModal from "../../components/modals/messageModal/MessageModal"
import Dialog from "../../components/modals/dialog/Dialog"
import Style from './Appointment.module.css'
import TableCalendar from '../../components/tables/tableCalendar/TableCalendar'


const Appointment = () =>{


    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("");
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenDialog, setModalOpenDialog] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    
    const [openCalendar, setOpenCalendar] = useState(true);


    const handleClose = ()=>{

        setMessageModal(false);

        setMessageDialog(false);
        setModalOpenDialog(false);
        setModalOpenMessage(false);
        setMessage("")

    }




    return(
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Turnos"} btnBack={true}/>

                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                {modalOpenDialog&&(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDelete} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        
                    </div>
                    <div className={Style.item2}>
                        
                            
                            {/* <TextViewClient TheClient={client1} /> */}
                            {/* onEdit={()=>setModalOpenEditClient(true)} */}
                            {
                                // openSupplier&&<TextViewSupplier TheSupplier={supplier} onEdit={()=>setModalOpenEditSupplier(true)} onDelete={handleDialogDelete} />
                            
                            }
                            {
                                openCalendar&&<TableCalendar />
                            }
                        
                    </div>
                    <div className={Style.item3}>
                        <article>
                    
                        </article> 
                    </div>
                    <div className={Style.item4}>
                        
                    </div>
                </article>
                    
            </Container>
        </div>
    )
}

export default Appointment