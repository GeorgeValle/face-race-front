import Style from './NewItemModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'
import InputSelectStyled from '../../inputs/inputSelectStyled/InputSelectStyled'
import axios from 'axios'
import { useState } from 'react'
import config from '../../../config/Envs'


const NewItemModal = ({onSubmit, onCancel, onClose, }) =>{
const [code, setCode] = useState("");
const [name, setName]= useState("");
const [stockQuantity, setStockQuantity] = useState("");
const [price, setPrice] =useState("");
const [category, setCategory] = useState("");
const [brand, setBrand] = useState("");
const [model,setModel]= useState("");
const [origin, setOrigin]= useState("");
const [warehouseLocation, setWarehouseLocation] = useState("");
const [description, setDescription] = useState("");

//const [error, setError] = useState(false);
//const [loading, setLoading] = useState(false);

const allCategory = [{label:'Seleccione una categoría',value:""},{label:'Indumentaria',value:'Indumentaria'}, {label:'Protección Personal', value:'Protección Personal'}, {label:'Equipaje',value:'Equipaje'}, {label:'Lingas y Trabas',value:'Lingas y Trabas'}, {label:'Luces',value:'Luces'}, {label:'Cobertores',value:'Cobertores'},{label:'Redes y sujetadores',value:'Redes y sujetadores'},{label:'Parlantes',value:'Parlantes'},{label:'Parabrisas', value:'Parabrisas'},{label:'Herramientas',value:'Herramientas'},{label:'Emblemas',value:'Emblemas'},{label:'Tableros y Velocimetros',value:'Tableros y Velocimetros'},{label:'Pisadores',Value:'Pisadores'},{label:'Escapes',value:'Escapes'},{label:'Frenos',value:'Frenos'},{label:'Repuestos',value:'Repuestos'},{label:'Servicios', value:'Servicios'},{label:'Mantenimiento',value:'Mantenimiento'},{label:'Otros',value:'Otros'}]

const onSubmitCreate = async ( message) =>{
    try {
        //setLoading(true);
        //setError("")
        /*const request = */await axios.post(`${config.API_BASE}item/register`, {
            code:code,
            name:name,
            stockQuantity:stockQuantity,
            price:price,
            category:category,
            brand:brand,
            model:model,
            origin:origin,
            warehouseLocation:warehouseLocation,
            description:description,
            })
            //const response =  request.data;
            //setLoading(false);
            onSubmit(message);
} catch (err) {
    //setError(err);
    onSubmit(`Error al crear Item`);
}
}

const handleCategory = ( category) =>{
    
    if(!category==""){
    setCategory(category)
    }
}


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <form className={Style.modal} onSubmit={() => onSubmitCreate("Datos de Artículo Guardados")}>
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Artículo"} btnClose={true} close={onClose} />
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
                    <TextInput  typeInput={"number"} value={price} nameInput={"price"} sideLabel={true} isLabel={true} titleLabel={"Precio:"} nameLabel={"price"} placeholderText={"Ej: 50.00"} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div className={Style.item5}>
                    <InputSelectStyled  defaultValue={category} onLabel={" "} sideLabel={true} isLabel={true} isGroup={false} titleLabel={"Categoría:"} onSetValue={handleCategory} options={allCategory} />
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
                <button type="submit" className={`${Style.btn} ${Style.btn_submit}`} >Guardar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </form>
    </div>
);
};

export default NewItemModal;