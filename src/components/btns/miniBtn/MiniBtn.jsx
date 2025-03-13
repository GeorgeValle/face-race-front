import StyleBtn from './MiniBtn.module.css';





// eslint-disable-next-line react/prop-types
const MiniBtn = ({children, tooltip="", onClick=null, btnType="button",isRed=false, isWhite=false, bgDisable=false, disabled=false, bgViolet=true, bgRed=false,}) => {

    return(
        <>
            <button title={tooltip} type={btnType} disabled={disabled} onClick={onClick} className={`${StyleBtn.miniBtn} ${bgViolet&&StyleBtn.bgViolet} ${bgRed&&StyleBtn.bgRed} ${bgDisable&&StyleBtn.bgDisable}`}>
                <span className={`${StyleBtn.icon} ${isRed&&StyleBtn.red_icon} ${isWhite&&StyleBtn.white_icon}`}>{children}</span>                   
            </button>
        </>  
    );
}

export default MiniBtn;