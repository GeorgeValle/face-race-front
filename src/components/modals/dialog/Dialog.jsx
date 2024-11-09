import BtnClose from '../../btns/btnClose/BtnClose'
import Style from './Dialog.module.css'

const Dialog = ({onSubmit, messageModal, messageConfirm, onClose }) => {
return (
    <div className={Style.modal_container} onClick=
    {(e)=>{if(e.target.className === Style.modal_container){onClose()}}}>
        <dialog open className={Style.modal}>
            <div >
                <div className={Style.modal_header}>
                    <BtnClose close={onClose}/>
                </div>
                <div className={Style.modal_content}>
                    <p>{messageModal}</p>
                </div>
                <div className={Style.modal_footer}>
                    <div className={Style.modal_buttons}>
                        <button /* type="submit" */ className={`${Style.btn} ${Style.btn_submit}`} onClick={ () => onSubmit()} > {messageConfirm} </button>
                        <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onClose()}>Cancelar </button>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
)
}

export default Dialog