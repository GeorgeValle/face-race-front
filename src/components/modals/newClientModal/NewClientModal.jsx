import Style from './NewClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import axios from 'axios'
import { useState } from 'react'
import config from '../../../config/Envs'
import { useDispatch } from "react-redux";
import {  changeClient  } from "../../../redux/ClientSlice";


const NewClientModal = ({onSubmit, onCancel, onClose, }) =>{
// const [email, setEmail] = useState("");
// const [name, setName] = useState("");
// const [phone, setPhone] = useState("");
// const [address, setAddress] = useState("");
// const [dni, setDni]= useState("");
// const [surname, setSurname] =useState("");
// const [city,setCity]= useState("");
// const [province, setProvince]= useState("");
// const [postalCode, setPostalCode] = useState("");
// const [cel, setCel] = useState("");
// const [description, setDescription] = useState("");

const dispatch = useDispatch();

const [formData, setFormData] = useState({
    email:"",
    dni:"",
    name:"",
    surname:"",
    address:"",
    city:"",
    province:"",
    postalCode:"",
    phone:"",
    cel:"",
    description:"",
})


//const [error, setError] = useState(false);
//const [loading, setLoading] = useState(false);

const handleChange = (e) => { 
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value, 
    }); 
}; 


const onSubmitCreate = async () =>{
    try {
        //setLoading(true);
        //setError("")
        dispatch(changeClient(formData))
        const request = await axios.post(`${config.API_BASE}client/register`, 
            formData
            /*{
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
            } */)
            
            const response =  request.data;
            //setLoading(false);
            
            onSubmit(response.message);
} catch (err) {
    //setError(err);
    onSubmit(`Error al crear cliente`);
}
}


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <form className={Style.modal} /*onSubmit={() => onSubmitCreate("Datos de Cliente Guardados")} */ >
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Cliente"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={formData.email} nameInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} value={formData.dni} nameInput={"dni"} isLabel={true} titleLabel={"DNI:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} value={formData.name} nameInput={"name"} isLabel={true} titleLabel={"Nombre:"} nameLabel={"name"} placeholderText={"Ej: Juan"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} value={formData.surname} nameInput={"surname"} isLabel={true} titleLabel={"Apellido:"} nameLabel={"surname"} placeholderText={"Ej: Lopez"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={formData.address} nameInput={"address"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={formData.city} nameInput={"city"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={formData.province} nameInput={"province"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"number"} value={formData.postalCode} nameInput={"postalCode"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} value={formData.phone} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} onChange={handleChange} />    
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} value={formData.cel} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item11}>
                    <TextArea titleLabel={"Observaciones:"} value={formData.description} nameInput={"description"} nameLabel={"description"} onChange={handleChange} placeholderText={"* Opcional: Detalles varios"}  />
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button /*type="submit" */ className={`${Style.btn} ${Style.btn_submit}`} onClick={() => onSubmitCreate()} >Guardar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </form>
    </div>
);
};

export default NewClientModal