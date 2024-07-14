import StyleBtn from './BtnCommon.module.css';




const BtnCommon = ({title="",children, onClick, colorRed=false, colorViolet=false}) => {

    return(
        <>
            <button  type="button" onClick={onClick} className={`${StyleBtn.btn} ${colorRed&&StyleBtn.btnRed} ${colorViolet&&StyleBtn.btnViolet} `}>
                <span className={StyleBtn.texts}>{title}</span>
                <span className={StyleBtn.icon}>{children}</span>                   
            </button>
        </>  
    );
}

export default BtnCommon;