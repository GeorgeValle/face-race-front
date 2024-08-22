import StyleBtn from './BtnClose.module.css'

const BtnClose = ({close}) => {
    return (
        <>
            <button  type="button" onClick={()=>close()} className={`${StyleBtn.btnClose} `}>
                <span className={StyleBtn.text}>&times;</span>                   
            </button>
        </>  
    )
}

export default BtnClose