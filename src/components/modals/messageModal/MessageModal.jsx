

import Style from './MessageModal.module.css'

const MessageModal = ({children }) => {
return (
    
    <div className={Style.modal_container} >
        <div className={Style.modal}>
            <div className={Style.modal_header}>
            </div>
            <div className={Style.modal_content}>
                {children}
            </div>
            <div className={Style.modal_footer}>
            </div>
        </div>
    </div>
    
)
}

export default MessageModal