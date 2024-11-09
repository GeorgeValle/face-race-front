import Style from './NewSupplierModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import axios from 'axios'
import { useState } from 'react'
import config from '../../../config/Envs'
import { useDispatch } from "react-redux";
import {  changeSupplier  } from "../../../redux/SupplierSlice";


const NewSupplierModal = ({onSubmit, onCancel, onClose, }) =>{

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:"",
        cuit:"",
        businessName: "",
        companyName:"",
        coreBusiness:"",
        address: "",
        city:"",
        province:"",
        postalCode:"",
        phone:"",
        cel:"",
        description:""
    });

    const handleChange = (e) => { 
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value, 
        }); 
    }; 

// const [email, setEmail] = useState("");
// const [cuit, setCuit]= useState("");
// const [businessName, setBusinessName] = useState("");
// const [companyName, setCompanyName] =useState("");
// const [coreBusiness, setCoreBusiness] = useState("");
// const [address, setAddress] = useState("");
// const [city,setCity]= useState("");
// const [province, setProvince]= useState("");
// const [postalCode, setPostalCode] = useState("");
// const [phone, setPhone] = useState("");
// const [cel, setCel] = useState("");
// const [description, setDescription] = useState("");

//const [error, setError] = useState(false);
//const [loading, setLoading] = useState(false);

const onSubmitCreate = async () =>{
   
    try {
        //setLoading(true);
        //setError("")
        console.log(formData)
        dispatch(changeSupplier(formData))
        const request = await axios.post(`${config.API_BASE}supplier/register`,formData 
            
            // {
            // email:email,
            // cuit:cuit,
            // businessName:businessName,
            // companyName:companyName,
            // coreBusiness:coreBusiness,
            // address:address,
            // city:city,
            // province:province,
            // postalCode:postalCode,
            // phone:phone,
            // cel:cel,
            // description:description,
            // }
        )
            const response =  request.data;
            console.log(response);
            //setLoading(false);
            onSubmit(response.message);
} catch (err) {
    //setError(err);
    onSubmit(`Error al crear Proveedor`);
}
}


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <div className={Style.modal} /* onSubmit={ () => onSubmitCreate()} */ >
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Proveedor"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={formData.email} nameInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} value={formData.cuit} nameInput={"cuit"} isLabel={true} titleLabel={"CUIT:"} nameLabel={"cuit"} placeholderText={"Ej: 40112233"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} value={formData.businessName} nameInput={"businessName"} isLabel={true} titleLabel={"Nombre Comercial:"} nameLabel={"businessName"} placeholderText={"Ej: Cascos Rodas"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} value={formData.companyName} nameInput={"companyName"} isLabel={true} titleLabel={"Razón Social:"} nameLabel={"companyName"} placeholderText={"Ej: Grupo Rodas"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={formData.coreBusiness} nameInput={"coreBusiness"} isLabel={true} titleLabel={"Ramo:"} nameLabel={"coreBusiness"} placeholderText={"Ej: Venta cascos"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={formData.address} nameInput={"address"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={formData.city} nameInput={"city"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"text"} value={formData.province} nameInput={"province"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} value={formData.postalCode} nameInput={"postalCode"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} value={formData.phone} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} onChange={handleChange} />    
                </div>
                <div className={Style.item11}>
                    <TextInput  typeInput={"number"} value={formData.cel} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item12}>
                    <TextArea titleLabel={"Observaciones:"} value={formData.description} nameInput={"description"} nameLabel={"description"} onChange={handleChange} placeholderText={"* Opcional: Detalles varios"}  />
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button /* type="submit" */ className={`${Style.btn} ${Style.btn_submit}`} onClick={ () => onSubmitCreate()} >Guardar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </div>
    </div>
);
};

export default NewSupplierModal;