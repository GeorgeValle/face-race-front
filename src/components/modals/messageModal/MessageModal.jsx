
import BtnClose from '../../btns/btnClose/BtnClose'
import Style from './MessageModal.module.css'

const MessageModal = ({children, onClose }) => {
return (
    <div className={Style.modal_container} onClick=
    {(e)=>{if(e.target.className === Style.modal_container){onClose()}}}>
        <dialog open className={Style.modal}>
            <div >
                <div className={Style.modal_header}>
                    <BtnClose close={onClose}/>
                </div>
                <div className={Style.modal_content}>
                    {children}
                </div>
                <div className={Style.modal_footer}>
                </div>
            </div>
        </dialog>
    </div>
)
}

export default MessageModal