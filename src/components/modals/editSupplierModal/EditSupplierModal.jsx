import { useDispatch } from "react-redux";
import {  changeSupplier  } from "../../../redux/SupplierSlice";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Style from './EditSupplierModal.module.css';
import TextInput from "../../inputs/textInput/TextInput";
import MIniNavBar from '../../miniNavbar/MIniNavBar';
import TextArea from '../../inputs/textArea/TextArea'
import config from '../../../config/Envs'


const EditSupplierModal = ({ onSubmit, onCancel, onClose }) => {

    const supplier = useSelector((state) => state.supplier);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:supplier.email,
        cuit:supplier.cuit,
        businessName: supplier.businessName,
        companyName:supplier.companyName,
        coreBusiness:supplier.coreBusiness,
        address: supplier.address,
        city:supplier.city,
        province:supplier.province,
        postalCode:supplier.postalCode,
        phone:supplier.phone,
        cel:supplier.cel,
        description:supplier.description
    });

    const handleChange = (e) => { 
            setFormData({ 
                ...formData, 
                [e.target.name]: e.target.value, 
            }); 
        }; 


    const onSubmitEdit = async () => {
        
        try {
            //edit the supplier saved in redux
            dispatch(changeSupplier(formData))
            const request = await axios.put(`${config.API_BASE}supplier/cuit/${supplier.cuit}`, 
            formData
            )

            const response = request.data;

            onSubmit(response.message);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={Style.modal_container} onClick={(e) => {
            if (e.target.className === Style.modal_container) { onClose() }
        }
        }>
            
            <div className={Style.modal} /*onSubmit={onSubmitEdit}*/ >
                <div className={Style.modal_header}>
                    <MIniNavBar miniTitle={"Editar Proveedor"} btnClose={true} close={onClose} />
                </div>
                <div className={Style.modal_content}>

                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} value={formData.email} nameInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} value={formData.cuit} nameInput={"cuit"} isLabel={true} titleLabel={"CUIT:"} nameLabel={"cuit"} placeholderText={"Ej: 40112233"} sideLabel={true} onChange={handleChange} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} value={formData.businessName} nameInput={"businessName"} isLabel={true} titleLabel={"Nombre Comercial:"} nameLabel={"businessName"} placeholderText={"Ej: Cascos Rodas"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} value={formData.companyName} nameInput={"companyName"} isLabel={true} titleLabel={"Razón Social:"} nameLabel={"companyName"} placeholderText={"Ej: Grupo Rodas"} sideLabel={true} onChange= {handleChange}  />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={formData.coreBusiness} nameInput={"coreBusiness"} isLabel={true} titleLabel={"Ramo:"} nameLabel={"coreBusiness"} placeholderText={"Ej: Venta cascos"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={formData.address} nameInput={"address"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={formData.city} nameInput={"city"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"text"} value={formData.province} nameInput={"province"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} value={formData.postalCode} nameInput={"postalCode"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} value={formData.phone} nameInput={"phone"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} onChange={handleChange}  />    
                </div>
                <div className={Style.item11}>
                    <TextInput  typeInput={"number"} value={formData.cel} nameInput={"cel"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} onChange={handleChange}  />
                </div>
                <div className={Style.item12}>
                    <TextArea titleLabel={"Observaciones:"} value={formData.description} nameInput={"description"} nameLabel={"description"} onChange={handleChange}  placeholderText={"* Opcional: Detalles varios"}  />
                </div>

                </div>
                <div className={Style.modal_buttons}>
                    <button /*type="submit"*/ className={`${Style.btn} ${Style.btn_submit}`} onClick={() => onSubmitEdit()} >Editar </button>
                    <button  className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
                </div>
            </div>
        </div>
    );
};

export default EditSupplierModal