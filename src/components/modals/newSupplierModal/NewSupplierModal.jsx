import Style from './NewSupplierModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import axios from 'axios'
import { useState } from 'react'
import config from '../../../config/Envs'


const NewSupplierModal = ({onSubmit, onCancel, onClose, }) =>{
const [email, setEmail] = useState("");
const [cuit, setCuit]= useState("");
const [businessName, setBusinessName] = useState("");
const [companyName, setCompanyName] =useState("");
const [coreBusiness, setCoreBusiness] = useState("");
const [address, setAddress] = useState("");
const [city,setCity]= useState("");
const [province, setProvince]= useState("");
const [postalCode, setPostalCode] = useState("");
const [phone, setPhone] = useState("");
const [cel, setCel] = useState("");
const [description, setDescription] = useState("");

//const [error, setError] = useState(false);
//const [loading, setLoading] = useState(false);

const onSubmitCreate = async ( message) =>{
    try {
        //setLoading(true);
        //setError("")
        /*const request = */await axios.post(`${config.API_BASE}supplier/register`, {
            email:email,
            cuit:cuit,
            businessName:businessName,
            companyName:companyName,
            coreBusiness:coreBusiness,
            address:address,
            city:city,
            province:province,
            postalCode:postalCode,
            phone:phone,
            cel:cel,
            description:description,
            })
            //const response =  request.data;
            //setLoading(false);
            onSubmit(message);
} catch (err) {
    //setError(err);
    onSubmit(`Error al crear Proveedor`);
}
}


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <form className={Style.modal} onSubmit={() => onSubmitCreate("Datos de Proveedor Guardados")}>
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Proveedor"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={email} nameInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} value={cuit} nameInput={"cuit"} isLabel={true} titleLabel={"CUIT:"} nameLabel={"cuit"} placeholderText={"Ej: 40112233"} sideLabel={true} onChange={(e)=>setCuit(e.target.value)} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} value={"businessName"} nameInput={"businessName"} isLabel={true} titleLabel={"Nombre Comercial:"} nameLabel={"businessName"} placeholderText={"Ej: Cascos Rodas"} sideLabel={true} onChange={(e)=>setBusinessName(e.target.value)} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} value={companyName} nameInput={"companyName"} isLabel={true} titleLabel={"Razón Social:"} nameLabel={"companyName"} placeholderText={"Ej: Grupo Rodas"} sideLabel={true} onChange={(e)=>setCompanyName(e.target.value)} />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={coreBusiness} nameInput={"coreBusiness"} isLabel={true} titleLabel={"Actividad Principal:"} nameLabel={"coreBusiness"} placeholderText={"Ej: Venta cascos"} sideLabel={true} onChange={(e)=>setCoreBusiness(e.target.value)} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={address} nameInput={"address"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={city} nameInput={"city"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} onChange={(e)=>setCity(e.target.value)} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"text"} value={province} nameInput={"province"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} onChange={(e)=>setProvince(e.target.value)} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} value={postalCode} nameInput={"postalCode"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} onChange={(e)=>setPostalCode(e.target.value)} />
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} value={phone} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} onChange={(e)=>setPhone(e.target.value)} />    
                </div>
                <div className={Style.item11}>
                    <TextInput  typeInput={"number"} value={cel} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} onChange={(e)=>setCel(e.target.value)} />
                </div>
                <div className={Style.item12}>
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

export default NewSupplierModal;