//import { useDispatch } from "react-redux";
//import {  changeClient, deleteClient  } from "../../../redux/ClientSlice";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeItem } from '../../../redux/ItemSlice';
import axios from 'axios';
import MessageModal from '../messageModal/MessageModal';
import Style from './EditItemModal.module.css';
import TextInput from "../../inputs/textInput/TextInput";
import MIniNavBar from '../../miniNavbar/MIniNavBar';
import TextArea from '../../inputs/textArea/TextArea'
import config from '../../../config/Envs'



const EditItemModal = ({ onSubmit, onCancel, onClose }) => {

    const item = useSelector((state) => state.item);
    const dispatch = useDispatch();

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
const [code, setCode] = useState(item.code);
const [name, setName]= useState(item.name);
const [stockQuantity, setStockQuantity] = useState(item.stockQuantity);
const [price, setPrice] =useState(item.price);
const [category, setCategory] = useState(item.category);
const [brand, setBrand] = useState(item.brand);
const [model,setModel]= useState(item.model);
const [origin, setOrigin]= useState(item.origin);
const [warehouseLocation, setWarehouseLocation] = useState(item.warehouseLocation);
const [description, setDescription] = useState(item.description);



    //const dispatch = useDispatch();

    // const handleSubmit = async (e) =>{
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

    const handleClose = () => {
        setModalOpenMessage(false);
    }

    const onSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const updatedItem = {
                code: parseInt(code),
                name: name,
                stockQuantity: parseInt(stockQuantity),
                price: parseFloat(price),
                category: category,
                brand: brand,
                model: model,
                origin: origin,
                warehouseLocation: warehouseLocation,
                description: description,
            };

            
            const request = await axios.put(`${config.API_BASE}item/code/${item.code}`, updatedItem)
            const response = request.data;
        
            // Update Redux state with the edited item
            dispatch(changeItem(updatedItem));

            setMessage(response.message)
            setModalOpenMessage(true)
            
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500);
            onSubmit();
        } catch (err) {
            
            setMessage(`Error al actualizar el artículo`)
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage(false);
            }, 3500);
            onSubmit();
        }
    }

    return (
        <div className={Style.modal_container} onClick={(e) => {
            if (e.target.className === Style.modal_container) { onClose() }
        }
        }>
            {modalOpenMessage && (<MessageModal messageModal={message} onClose={handleClose} />)}
            <form className={Style.modal} onSubmit={onSubmitEdit} >
                <div className={Style.modal_header}>
                    <MIniNavBar miniTitle={"Editar Artículo"} btnClose={true} close={onClose} />
                </div>
                <div className={Style.modal_content}>

                <div className={Style.item1}>
                    <TextInput  typeInput={"number"} value={code} nameInput={"code"} isLabel={true} titleLabel={`Código:`} nameLabel={"code"} placeholderText={"119228"} sideLabel={true} onChange={(e)=>setCode(e.target.value)} />
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"text"} value={name} nameInput={"name"} isLabel={true} titleLabel={"Nombre:"} nameLabel={"name"} placeholderText={"Ej: Casco Italy"} sideLabel={true} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"number"} value={stockQuantity} nameInput={"stockQuantity"} isLabel={true} titleLabel={"Cantidad:"} nameLabel={"stockQuantity"} placeholderText={"Ej: 52"} sideLabel={true} onChange={(e)=>setStockQuantity(e.target.value)} />
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"number"} value={price} nameInput={"price"} isLabel={true} titleLabel={"Precio:"} nameLabel={"price"} placeholderText={"Ej: 50.00"} sideLabel={true} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} value={category} nameInput={"category"} isLabel={true} titleLabel={"Categoría:"} nameLabel={"categoria"} placeholderText={"Ej: Indumentaria"} sideLabel={true} onChange={(e)=>setCategory(e.target.value)} />
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} value={brand} nameInput={"brand"} isLabel={true} titleLabel={"Marca:"} nameLabel={"brand"} placeholderText={"Ej:Zx"} sideLabel={true} onChange={(e)=>setBrand(e.target.value)} />
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} value={model} nameInput={"model"} isLabel={true} titleLabel={"Modelo:"} nameLabel={"model"} placeholderText={"Ej: Vintage"} sideLabel={true} onChange={(e)=>setModel(e.target.value)} />
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"text"} value={origin} nameInput={"origin"} isLabel={true} titleLabel={"Origen:"} nameLabel={"origin"} placeholderText={"Ej: Austria"} sideLabel={true} onChange={(e)=>setOrigin(e.target.value)} />
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"text"} value={warehouseLocation} nameInput={"warehouseLocation"} isLabel={true} titleLabel={"Ubicación:"} nameLabel={"warehouseLocation"} placeholderText={"Ej: AB 12"} sideLabel={true} onChange={(e)=>setWarehouseLocation(e.target.value)} />
                </div>
                <div className={Style.item10}>
                    <TextArea titleLabel={"Observaciones:"} value={description} nameInput={"description"} nameLabel={"description"} onChange={(e)=>setDescription(e.target.value)} placeholderText={"* Opcional: Detalles varios"}  />
                </div>

                </div>
                <div className={Style.modal_buttons}>
                    <button type="submit" className={`${Style.btn} ${Style.btn_submit}`} >Editar </button>
                    <button  className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
                </div>
            </form>
        </div>
    );
};

export default EditItemModal