import StyleBtn from './MiniBtn.module.css';





const MiniBtn = ({children, onClick=null, btnType="button",isRed=false, isWhite=false}) => {

    return(
        <>
            <button  type={btnType} onClick={onClick} className={StyleBtn.miniBtn}>
                <span className={`${StyleBtn.icon} ${isRed&&StyleBtn.red_icon} ${isWhite&&StyleBtn.white_icon}`}>{children}</span>                   
            </button>
        </>  
    );
}

export default MiniBtn;