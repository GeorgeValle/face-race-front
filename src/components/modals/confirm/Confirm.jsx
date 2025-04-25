
import Style from './Confirm.module.css'

const Confirm = ({onSubmit, messageModal, messageConfirm }) => {
return (
    <div className={Style.modal_container} onClick=
    {(e)=>{if(e.target.className === Style.modal_container){onSubmit()}}}>
        <dialog open className={Style.modal}>
            <div >
                <div className={Style.modal_header}>
                    
                </div>
                <div className={Style.modal_content}>
                    <p>{messageModal}</p>
                </div>
                <div className={Style.modal_footer}>
                    <div className={Style.modal_buttons}>
                        <button /* type="submit" */ className={`${Style.btn} ${Style.btn_submit}`} onClick={ () => onSubmit()} > {messageConfirm} </button>
                        
                    </div>
                </div>
            </div>
        </dialog>
    </div>
)
}

export default Confirm