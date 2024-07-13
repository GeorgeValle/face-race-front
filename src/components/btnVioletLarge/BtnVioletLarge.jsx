import StyleBtn from './BtnVioletLarge.module.css';




const BtnVioletLarge = ({children, onClick, btnType="button"}) => {

    return(
        <>
        <div className={StyleBtn.divButton}>
            <button  onClick={onClick} type={btnType} className={StyleBtn.buttonLarge}>
                <span className={StyleBtn.texts}>{children}</span>                   
            </button>
        </div> 
        </>  
    );
}

export default BtnVioletLarge;