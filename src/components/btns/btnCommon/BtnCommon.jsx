import StyleBtn from './BtnCommon.module.css';




const BtnCommon = ({title="",children, onClick, colorRed=false, colorViolet=false, colorGray=false}) => {

    return(
        <>
            <button  type="button" onClick={()=>onClick()} className={`${StyleBtn.btn} ${colorRed&&StyleBtn.btnRed} ${colorViolet&&StyleBtn.btnViolet} ${colorGray&&StyleBtn.btnGray} `}>
                <span className={StyleBtn.texts}>{title}</span>
                <span className={StyleBtn.icon}>{children}</span>                   
            </button>
        </>  
    );
}

export default BtnCommon;