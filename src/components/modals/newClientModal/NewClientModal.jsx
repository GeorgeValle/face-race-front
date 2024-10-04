import Style from './NewClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import axios from 'axios'
import { useState } from 'react'


const NewClientModal = ({onSubmit, onCancel, onClose, }) =>{
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

const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);

const onSubmitCreate = async ( message) =>{
    try {
        setLoading(true);
        setError("")
        const request = await axios.post('http://localhost:8080/api/client/register', {
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
            setLoading(false);
            onSubmit(message);
} catch (err) {
    setError(err);
}
}


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <form className={Style.modal} onSubmit={() => onSubmitCreate("Datos de Cliente Guardados")}>
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Cliente"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={email} nameInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} value={dni} nameInput={"dni"} isLabel={true} titleLabel={"DNI:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} onChange={(e)=>setDni(e.target.value)} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} value={name} nameInput={"name"} isLabel={true} titleLabel={"Nombre:"} nameLabel={"name"} placeholderText={"Ej: Juan"} sideLabel={true} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} value={surname} nameInput={"surname"} isLabel={true} titleLabel={"Apellido:"} nameLabel={"surname"} placeholderText={"Ej: Lopez"} sideLabel={true} onChange={(e)=>setSurname(e.target.value)} />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={address} nameInput={"address"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={city} nameInput={"city"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} onChange={(e)=>setCity(e.target.value)} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={province} nameInput={"province"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} onChange={(e)=>setProvince(e.target.value)} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"number"} value={postalCode} nameInput={"postalCode"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} onChange={(e)=>setPostalCode(e.target.value)} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} value={phone} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} onChange={(e)=>setPhone(e.target.value)} />    
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} value={cel} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} onChange={(e)=>setCel(e.target.value)} />
                </div>
                <div className={Style.item11}>
                    <TextArea titleLabel={"Observaciones:"} value={description} nameInput={"description"} nameLabel={"description"} onChange={(e)=>setDescription(e.target.value)} placeholderText={"* Opcional: Detalles varios"}  />
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button type="submit" className={`${Style.btn} ${Style.btn_submit}`} >Guardar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </form>
    </div>
);
};

export default NewClientModal