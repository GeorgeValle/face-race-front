import StyleBtn from './BtnClose.module.css'

const BtnClose = (onClose) => {
    return (
        <>
            <button  type="button" onClick={()=>onClose()} className={`${StyleBtn.btnClose} `}>
                <span className={StyleBtn.text}>&times;</span>                   
            </button>
        </>  
    )
}

export default BtnClose