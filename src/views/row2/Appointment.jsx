// ******* Appointment = turno o cita in spanish ************
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import { useState, /*useEffect*/} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, faPlus/*, faPencil*/} from "@fortawesome/free-solid-svg-icons"
import { createPortal } from 'react-dom'
import MessageModal from "../../components/modals/messageModal/MessageModal"
import Dialog from "../../components/modals/dialog/Dialog"
import Style from './Appointment.module.css'
import EditAppointmentModal from "../../components/modals/editAppointmentModal/EditAppointmentModal"
import NewAppointmentModal from "../../components/modals/newAppointmentModal/NewAppointmentModal"

const Appointment = () =>{

    const [modalOpenNew, setModalOpenNew] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState("");
    //const [messageButton, setMessageButton] = useState("");
    const [messageDialog, setMessageDialog] = useState("");
    const [modalOpenDialog, setModalOpenDialog] = useState("");
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [inputDNI, setInputDNI] = useState("");
    const [inputList, setInputList] = useState("");

    const fetchAppointment = async() =>{

    }

    const fetchListAppointments = async() =>{

    }

    const handleClose = ()=>{

        setMessageModal(false);
        setModalOpenEdit(false);
        setModalOpenNew(false);
        setMessageDialog(false);
        setModalOpenDialog(false);
        setModalOpenMessage(false);
        setMessage("")

    }

    const handleSubmitEdit = () =>{

    }

    const handleSubmitNew = () =>{

    }

    const handleDelete = () =>{

    }


    return(
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Turnos"} btnBack={true}/>
                {modalOpenEdit&&createPortal(<EditAppointmentModal onSubmit={handleSubmitEdit} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenNew&&createPortal(<NewAppointmentModal onSubmit={handleSubmitNew} onCancel={handleClose} onClose={handleClose}  />,document.body)}
                {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
                {modalOpenDialog&&(<Dialog messageModal={messageModal} messageConfirm={messageDialog} onSubmit={handleDelete} onClose={handleClose}/>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                
                                <article className={Style.separate}>
                                    
                                    <BtnCommon title={"Registrar"} onClick={()=>setModalOpenNew(true)} colorViolet={true}> <FontAwesomeIcon icon={faPlus}/></BtnCommon>
                                    <div className={Style.article} >
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI o CUIT Proveedor" value={inputDNI} onChange={(e) =>setInputDNI(e.target.value)} />
                                        <MiniBtn onClick={fetchAppointment} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre Proveedor" size={false} />
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: aba or moto "} typeInput={"text"} titleLabel="Listado" value={inputList} onChange={(e) =>setInputList(e.target.value)} size={true} />
                                        <MiniBtn  onClick={fetchListAppointments} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                </article> 
                                
                            </div>
                            <div className={Style.article}>
                                
                            </div>
                            <div className={Style.article}>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        
                            
                            {/* <TextViewClient TheClient={client1} /> */}
                            {/* onEdit={()=>setModalOpenEditClient(true)} */}
                            {
                                // openSupplier&&<TextViewSupplier TheSupplier={supplier} onEdit={()=>setModalOpenEditSupplier(true)} onDelete={handleDialogDelete} />
                            
                            }
                            {
                                // openSupplierList&&<TableSupplierList rows={list || []}/>
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