import Style from './NewClientModal.module.css'
import MIniNavBar from '../../miniNavbar/MIniNavBar'
import  TextInput from '../../inputs/textInput/TextInput'



const NewClientModal = ({onSubmit, onCancel, onClose }) =>{
    return (
    <div className={Style.modal_container}  onClick={(e)=>{
        if(e.target.className === Style.modal_container){onClose()}}
    }>  
        <div className={Style.modal}>
            <div className={Style.modal_header}>
                <MIniNavBar miniTitle={"Nuevo Cliente"} btnClose={true} close={onClose} />
            </div>
            <div className={Style.modal_content}>
                <div className={Style.labels}>
                <TextInput  typeInput={"email"} isLabel={true} titleLabel={`Email:`} nameLabel={"email"} placeholderText={"Ej: cliente@gmail.com"} sideLabel={true} />
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"DNI:"} nameLabel={"dni"} placeholderText={"Ej: 40112233"} sideLabel={true} />
                </div>
                <div className={Style.labels}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Nombre:"} nameLabel={"name"} placeholderText={"Ej: Juan"} sideLabel={true} />
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Apellido:"} nameLabel={"surname"} placeholderText={"Ej: Lopez"} sideLabel={true} />
                </div>
                
                <div className={Style.labels}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Dirección:"} nameLabel={"address"} placeholderText={"Ej: Paso 1526"} sideLabel={true} />
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Ciudad:"} nameLabel={"city"} placeholderText={"Ej: Rosario"} sideLabel={true} />
                </div>
                <div className={Style.labels}>
                    <TextInput  typeInput={"text"} isLabel={true} titleLabel={"Provincia:"} nameLabel={"province"} placeholderText={"Ej: Santa Fe"} sideLabel={true} />
                    <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Código Postal:"} nameLabel={"cp"} placeholderText={"Ej: 1251"} sideLabel={true} />
                </div>
                <div className={Style.labels}>
                <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Teléfono:"} nameLabel={"phone"} placeholderText={"Ej: 4568569"} sideLabel={true} />
                <TextInput  typeInput={"number"} isLabel={true} titleLabel={"Celular:"} nameLabel={"cel"} placeholderText={"Ej: 3426859647"} sideLabel={true} />
                </div>
                <div className={Style.labels}>
                
                </div>
                
            </div>
            <div className={Style.modal_buttons}>
                <button className={`${Style.btn} ${Style.btn_submit}`} onClick={() => onSubmit()}>Guardar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </div>
    </div>
);
};

export default NewClientModal