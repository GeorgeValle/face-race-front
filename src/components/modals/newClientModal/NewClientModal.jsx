import Style from './NewClientModal.module.css'
import MIniVavBar from '../../miniNavbar/MIniNavBar' 



const NewClientModal = (onSubmit, onCancel, onClose=null) =>{
    return (
    <div className={Style.modal_container} onClick={e => {
        if (e.target.className === Style.modal_container) { onClose(); }
    }}>
        <div className={Style.modal}>
            <div className={Style.modal_header}>
                <MIniVavBar miniTitle={"Nuevo Cliente"} btnClose={true} onClose={onClose} />
            </div>
            <div className={Style.modal_content}>
                
            </div>
            <div className={Style.modal_footer}>
                <button className={`${Style.btn} ${Style.btn_submit}`} onClick={() => onSubmit()}>Agregar </button>
                <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onCancel()}>Cancelar </button>
            </div>
        </div>
    </div>
);
};

export default NewClientModal