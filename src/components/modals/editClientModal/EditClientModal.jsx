import Style from './EditClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import {  changeClient, deleteClient  } from "../../../redux/ClientSlice";
import { useSelector } from 'react-redux';
import axios from 'axios'
import MessageModal from '../messageModal/MessageModal'


const EditClientModal = ({onSubmit, onCancel, onClose}) => {

    const client = useSelector((state)=> state.client);

    // const [formData, setFormData]= useState({
    //     email:client.email,name:client.name,phone:client.phone,address:client.address,description:client.description,dni:client.dni,surname:client.surname,city:client.city,cel:client.cel,province:client.province,postalCode:client.postalCode
    // })

    // const handleChange = (e) => { 
    //     const { name, value } = e.target; 
    //     setFormData({ 
    //     ...formData, 
    //     [name]: value, 
    //     }); 
    //     }; 
 const [modalOpenMessage, setModalOpenMessage] = useState(false);
 const [message, setMessage] = useState('');

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [dni, setDni]= useState("");
    const [surname, setSurname] =useState("");
    const [city,setCity]= useState("");
    const [cel, setCel] = useState("");
    const [province, setProvince]= useState("");
    const [postalCode, setPostalCode] = useState("");

    const dispatch = useDispatch();
    
    // const handlesubmit = async (e) =>{
    //     e.preventDefault();
    //     const formDataObject = new FormData(); 

    //     formDataObject.append('email', formData.email);
    //     formDataObject.append('dni', formData.dni);
    //     formDataObject.append('name', formData.name);
    //     formDataObject.append('surname', formData.surname);
    //     formDataObject.append('address', formData.address);
    //     formDataObject.append('city', formData.city);
    //     formDataObject.append('province', formData.province);
    //     formDataObject.append('postalCode', formData.postalCode);
    //     formDataObject.append('phone', formData.phone);
    //     formDataObject.append('cel', formData.cel);
    //     formDataObject.append('description', formData.description);
        
    //     try{
            
    //         const request = await axios.put(`http://localhost:8080/api/client/dni/${client.dni}`,formDataObject)
    //         const response =  request.data;
    //         dispatch(changeClient({client:formDataObject}))
    //     }catch(error){
    //         console.log(error)
    //     }
        
    // }

    const handleClose=()=>{
        setModalOpenMessage(false);
    }

    const onSubmitEdit = async () =>{
        try {
            
            const request = await axios.put(`http://localhost:8080/api/client/dni/${client.dni}`, {
                email:email,
                name:name,
                surname:surname,
                phone:phone,
                address:address,
                description:description,
                dni:dni,
                city:city,
                province:province,
                postalCode:postalCode,
                cel:cel
                })
                const response =  request.data;
                console.log(response)
                setMessage("Cliente Actualizado")
                setModalOpenMessage(true)
                const timer = setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);
                onSubmit();
    } catch (err) {
        console.log(err);
    }
    }

    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }> 
        {modalOpenMessage&&(<MessageModal messageModal={message} onClose={handleClose}/>)}
        <form className={Style.modal} onSubmit={onSubmitEdit} >
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Editar Cliente"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={email} nameInput={"email"}  isLabel={true} titleLabel={`Email:`} onChange={(e)=>setEmail(e.target.value)}  nameLabel={"email"} placeholderText={""} sideLabel={true} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} nameInput={"dni"} isLabel={true} value={dni} titleLabel={"DNI:"} onChange={(e)=>setDni(e.target.value)} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} nameInput={"name"} isLabel={true} value={name} titleLabel={"Nombre:"} onChange={(e)=>setName(e.target.value)} nameLabel={"name"} placeholderText={"Ej: Juan"} sideLabel={true} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} nameInput={"surname"} isLabel={true} value={surname} titleLabel={"Apellido:"} onChange={(e)=>setSurname(e.target.value)} nameLabel={"surname"} placeholderText={"Ej: Lopez"} sideLabel={true} />               
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} nameInput={"address"} isLabel={true} value={address} titleLabel={"Dirección:"} onChange={(e)=>setAddress(e.target.value)} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} nameInput={"city"} isLabel={true} value={city} titleLabel={"Ciudad:"} nameLabel={"city"} onChange={(e)=>setCity(e.target.value)} placeholderText={"Ej: Rosario"} sideLabel={true} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} nameInput={"province"} isLabel={true} value={province} titleLabel={"Provincia:"} onChange={(e)=>setProvince(e.target.value)} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"number"} nameInput={"postalCode"} isLabel={true} value={postalCode} titleLabel={"Código Postal:"} nameLabel={"postalCode"} onChange={(e)=>setPostalCode(e.target.value)} placeholderText={"Ej: 1251"} sideLabel={true} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} value={phone} nameLabel={"phone"} placeholderText={"Ej: 4568569"} onChange={(e)=>setPhone(e.target.value)} sideLabel={true} />   
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} value={cel} placeholderText={"Ej: 3426859647"} onChange={(e)=>setCel(e.target.value)} sideLabel={true} />
                </div>
                <div className={Style.item11}>
                    <TextArea titleLabel={"Observaciones:"} nameInput={"description"} nameLabel={"description"} value={description} onChange={(e)=>setDescription(e.target.value)} placeholderText={"* Opcional: Detalles varios"} />
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button  className={`${Style.btn} ${Style.btn_submit}`} onClick={() => handlesubmit()}>Editar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </form>
    </div>
);
};

export default EditClientModal