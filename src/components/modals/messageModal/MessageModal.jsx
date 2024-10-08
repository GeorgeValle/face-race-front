
import BtnClose from '../../btns/btnClose/BtnClose'
import Style from './MessageModal.module.css'

const MessageModal = ({messageModal, onClose }) => {
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
                </div>
            </div>
        </dialog>
    </div>
)
}

export default MessageModal