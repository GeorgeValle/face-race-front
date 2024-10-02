import Style from './EditClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import TextInput from '../../inputs/textInput/TextInput'
import TextArea from '../../inputs/textArea/TextArea'


const EditClientModal = ({onSubmit, onCancel, onClose, client}) => {


    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <div className={Style.modal}>
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Editar Cliente"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                
                <div className={Style.item1}>
                    <TextInput  typeInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={""} sideLabel={true} data={client.email}/>
                </div>
                <div className={Style.item2}>
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"DNI:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} data={client.dni}/>
                </div>
                <div className={Style.item3}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Nombre:"} nameLabel={"name"} placeholderText={"Ej: Juan"} sideLabel={true} data={client.name}/>
                </div>
                <div className={Style.item4}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Apellido:"} nameLabel={"surname"} placeholderText={"Ej: Lopez"} sideLabel={true} data={client.surname}/>               
                </div>
                <div className={Style.item5}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} data={client.address}/>
                </div>
                <div className={Style.item6}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} data={client.city}/>
                </div>
                <div className={Style.item7}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} data={client.province}/>
                </div>
                <div className={Style.item8}>
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"postalCode"} placeholderText={"Ej: 1251"} sideLabel={true} data={client.postalCode}/>
                </div>
                <div className={Style.item9}>
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} data={client.phone}/>   
                </div>
                <div className={Style.item10}>
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} data={client.cel}/>
                </div>
                <div className={Style.item11}>
                    <TextArea titleLabel={"Observaciones:"} nameLabel={"description"} placeholderText={"* Opcional: Detalles varios"} data={client.description}/>
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button className={`${Style.btn} ${Style.btn_submit}`} onClick={() => onSubmit("Datos de Cliente Actualizados")}>Editar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </div>
    </div>
);
};

export default EditClientModal