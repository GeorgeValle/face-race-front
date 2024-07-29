import StyleBtn from './MiniBtn.module.css';




const MiniBtn = ({children, onClick}) => {

    return(
        <>
            <button  type="button" onClick={onClick} className={StyleBtn.miniBtn}>
                <span className={StyleBtn.icon}>{children}</span>                   
            </button>
        </>  
    );
}

export default MiniBtn;