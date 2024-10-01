import StyleBtn from './MiniBtn.module.css';




const MiniBtn = ({children, onClick=null, btnType="button"}) => {

    return(
        <>
            <button  type={btnType} onClick={onClick} className={StyleBtn.miniBtn}>
                <span className={StyleBtn.icon}>{children}</span>                   
            </button>
        </>  
    );
}

export default MiniBtn;